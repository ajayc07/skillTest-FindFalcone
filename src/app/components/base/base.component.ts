import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { FormBuilder } from '@angular/forms';

import { Planet, Vehicle, Journey } from 'src/app/model/app-model';
import { MatRadioChange } from '@angular/material/radio';
import { MatSelectChange } from '@angular/material/select';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/services/shared-service';

import { MOCK_PLANETS, MOCK_VECHILES } from 'src/app/mocks/mocks';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.scss']
})
export class BaseComponent implements OnInit {
  
  public journeyForm : FormGroup;
  
  public planetList : Array<Planet> = [];

  public vehicleList : Array<Vehicle> = [];

  public journeyArray : FormArray;

  public selectedJourney : Array<Journey> = [];

  public totalTimeTaken : number = 0;

  public planetColor = [ '#A49B72','#F1F5F4','#65868B','#106F9F','#C88B3A','#D14009'];

  public loadCompleted = 0;

  public isLoading : boolean = false;

  public loaderMessage : string = '';

  constructor(
    private _formBuilder : FormBuilder,
    private _router : Router,
    private _store : SharedService
  ) { 
    for (let index = 0; index < 4; index++) {
      this.selectedJourney.push({
        selectedPlanet : null,
        selectedVehicle : null,
      });
    }
  }

  ngOnInit() {

    this.createForm();

    this._store.getReset().subscribe((value) => {

      if(value.isReset) {
        this.reset();
      }
    })

    this.getPlanetList();
  }


  public createForm() : void {

    this.journeyForm = this._formBuilder.group({

      journey: this._formBuilder.array([this.createJourney()])
    });

    this.journeyArray = this.journeyForm.get('journey') as FormArray;
    
    for (let index = 0; index < 3; index++) {
      this.journeyArray.push(this.createJourney());
    }

  }

  public createJourney(): FormGroup {
    return this._formBuilder.group({
      planet: '',
      vehicle: '',
    });
  }

  public getPlanetList() : void {

    this.isLoading = true;
    this.loaderMessage = 'Searching for near by planets...';

    // this.mockGetPlanetList().subscribe((response) => {
    this._store.getPlanetList().subscribe((response) => {

      this.planetList = response;
      this.isLoading = false;
      this.getVehicleList();
    })
  };

  public getVehicleList() : void {

    this.isLoading = true;
    this.loaderMessage = 'Checking availablity of vehicles...';

    // this.mockGetVechileList().subscribe((response) => {
      this._store.getVechileList().subscribe((response) => {

      this.vehicleList = response;
      this.isLoading = false;
    })
  }

  public vehicleUpdate(event : MatRadioChange , fromPort : number) : void {

    this.vehicleList.forEach((vehicle) => {

      if (this.journeyForm.controls.journey['controls'][ fromPort].controls.vehicle.value) {

        if (vehicle.name === this.journeyForm.controls.journey['controls'][ fromPort].controls.vehicle.value ) {
            vehicle.total_no += 1;
        }
      }

      if (vehicle.name === event.value ) {

        this.selectedJourney[fromPort].selectedVehicle = vehicle;

        if (vehicle.total_no) {
          vehicle.total_no -= 1;
          this.getJourneyDetails();
        }
      }

    });



    
    
  }
  

  public planetSelection(event : MatSelectChange , fromPort : number) : void {

    console.log('Planet update' , event , fromPort);

    
    if (this.selectedJourney[fromPort].selectedPlanet && this.selectedJourney[fromPort].selectedPlanet.name) {
        
      if (this.selectedJourney[fromPort].selectedPlanet.name){
        this.selectedJourney[fromPort].selectedPlanet.selected = false;
      }
    }

    this.planetList.forEach((planet , index) => {

      if (planet.name === event.value ) {

        this.selectedJourney[fromPort].selectedPlanet = planet;
        planet.selected = true;
        planet.color = this.planetColor[index];
        this.getJourneyDetails();
      }

    });

    // this.getJourneyDetails();
    
  }

  public launch() : void {

    console.log('Launch' , this.selectedJourney);

    this.isLoading = true;
    this.loaderMessage = 'Searching for Falcone....';

    this._store.getToken().subscribe((response) => {
      console.log('token' , response);
    });

    this._store.commonStorage = {
      status : Math.floor(Math.random() * Math.floor(6) / 2)  ? 'Success' : 'Fail',
      planetName : 'Pingosor',
      planetdistance : 600,
      vehicleName : 'Space Shuttle',
      timeTaken : '30'
    }

    setTimeout(() => {
      this.isLoading = false;
      this._router.navigateByUrl('result');
    },4000)
  }

  public getJourneyDetails() : void {

    let timeTaken = 0;
    let completed = 0;
      this.selectedJourney.map((journey , index) => {

        if ( journey.selectedPlanet && journey.selectedVehicle && journey.selectedPlanet.distance  && journey.selectedVehicle.speed) {

          timeTaken += journey.selectedPlanet.distance / journey.selectedVehicle.speed;
          completed += 25;
        }
      });    

      console.log('Completed = ' , completed);
      this.loadCompleted = completed;
      this.totalTimeTaken = Math.round(timeTaken);
  }

  public reset() : void {

    this.journeyArray.reset();
    this.getPlanetList();
    this.getVehicleList();

    for (let index = 0; index < 4; index++) {
      this.selectedJourney[index].selectedPlanet = null;
      this.selectedJourney[index].selectedVehicle = null;
    };

    this.loadCompleted = 0;
    this.totalTimeTaken = 0;
  }


  public mockGetPlanetList() : any {
        
    let observable = Observable.create((obs) => {
      setTimeout(() => {
        obs.next(MOCK_PLANETS);
        obs.complete();
      },3000)
    })

    return observable;

  }

  public mockGetVechileList() : any {
        
    let observable = Observable.create((obs) => {

      obs.next(MOCK_VECHILES);
        obs.complete();
      // setTimeout(() => {
      //   obs.next(MOCK_VECHILES);
      //   obs.complete();
      // },2000)
 
    })

    return observable;

  }


}
