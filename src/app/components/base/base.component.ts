import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { FormBuilder } from '@angular/forms';

import { Planet, Vehicle, Journey } from 'src/app/model/app-model';
import { MatRadioChange } from '@angular/material/radio';
import { MatSelectChange } from '@angular/material/select';
import { Router } from '@angular/router';

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


  constructor(
    private _formBuilder: FormBuilder,
    private _router: Router
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
    this.getPlanetList();
    this.getVehicleList();
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

    this.planetList = [
      {
        value : 'DonLon',
        name : 'DonLon',
        distance : 100
      },
      {
        value : 'Enchai',
        name : 'Enchai',
        distance : 200
      },
      {
        value : 'Jebing',
        name : 'Jebing',
        distance : 300
      },
      {
        value : 'Sapir',
        name : 'Sapir',
        distance : 400
      },
      {
        value : 'Lerbin',
        name : 'Lerbin',
        distance : 500
      },
      {
        value : 'Pingosor',
        name : 'Pingosor',
        distance : 600
      },
    ];
  };

  public getVehicleList() : void {

    this.vehicleList = [
      {
        value : 'Space Pod',
        name : 'Space Pod',
        currentAvailablity : 2,
        maxDistance : 200,
        speed : 2
      },
      {
        value : 'Space Rocket',
        name : 'Space Rocket',
        currentAvailablity : 1,
        maxDistance : 300,
        speed : 3
      },
      {
        value : 'Space Shuttle',
        name : 'Space Shuttle',
        currentAvailablity : 1,
        maxDistance :400,
        speed : 5
      },
      {
        value : 'Space Ship',
        name : 'Space Ship',
        currentAvailablity : 2,
        maxDistance : 600,
        speed : 10
      }
    ];
  }

  public vehicleUpdate(event : MatRadioChange , fromPort : number) : void {

    this.vehicleList.forEach((vehicle) => {

      if (this.journeyForm.controls.journey['controls'][ fromPort].controls.vehicle.value) {

        if (vehicle.value === this.journeyForm.controls.journey['controls'][ fromPort].controls.vehicle.value ) {
            vehicle.currentAvailablity += 1;
        }
      }

      if (vehicle.value === event.value ) {

        this.selectedJourney[fromPort].selectedVehicle = vehicle;

        if (vehicle.currentAvailablity) {
          vehicle.currentAvailablity -= 1;
          this.getJourneyDetails();
        }
      }

    });



    
    
  }
  

  public planetSelection(event : MatSelectChange , fromPort : number) : void {

    console.log('Planet update' , event , fromPort);

    
    if (this.selectedJourney[fromPort].selectedPlanet && this.selectedJourney[fromPort].selectedPlanet.value) {
        
      if (this.selectedJourney[fromPort].selectedPlanet.value){
        this.selectedJourney[fromPort].selectedPlanet.selected = false;
      }
    }

    this.planetList.forEach((planet , index) => {

      if (planet.value === event.value ) {

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
    this._router.navigateByUrl('result');
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


}
