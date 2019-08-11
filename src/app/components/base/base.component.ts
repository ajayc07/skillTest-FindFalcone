import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { FormBuilder } from '@angular/forms';

import { Planet, Vehicle, Journey, Result } from 'src/app/model/app-model';
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
  

  /**
   * Reactive formgroup for journey details
   * @type {FormGroup}
   * @memberof BaseComponent
   */
  public journeyForm : FormGroup;
  

  /**
   * List of neary planet details
   * @type {Array<Planet>}
   * @memberof BaseComponent
   */
  public planetList : Array<Planet> = [];


  /**
   * List of available vechile details
   * @type {Array<Vehicle>}
   * @memberof BaseComponent
   */
  public vehicleList : Array<Vehicle> = [];


  /**
   * Form array for journey details
   * @type {FormArray}
   * @memberof BaseComponent
   */
  public journeyArray : FormArray;


  /**
   * Currently selected journeys
   * @type {Array<Journey>}
   * @memberof BaseComponent
   */
  public selectedJourney : Array<Journey> = [];


  /**
   * Total time taken for the whole journey
   * @type {number}
   * @memberof BaseComponent
   */
  public totalTimeTaken : number = 0;


  /**
   * Assigning colour for each planet when selected
   * @memberof BaseComponent
   */
  public planetColor = [ '#A49B72','#F1F5F4','#65868B','#106F9F','#C88B3A','#D14009'];


  /**
   * Journey load percentage => 0, 25, 50, 75,100
   * @memberof BaseComponent
   */
  public loadCompleted = 0;


  /**
   * Flag to check if api is loading
   * @type {boolean}
   * @memberof BaseComponent
   */
  public isLoading : boolean = false;


  /**
   * Flag to detect presence of error
   * @type {boolean}
   * @memberof BaseComponent
   */
  public isError : boolean = false;


  /**
   * Loader message
   * @type {string}
   * @memberof BaseComponent
   */
  public loaderMessage : string = '';


  /**
   * To display error message
   * @type {string}
   * @memberof BaseComponent
   */
  public errorMessage : string = '';



  /**
   * Creates an instance of BaseComponent.
   * @param {FormBuilder} _formBuilder
   * @param {Router} _router
   * @param {SharedService} _store
   * @memberof BaseComponent
   */
  constructor(
    private _formBuilder : FormBuilder,
    private _router : Router,
    private _store : SharedService
  ) { 
    for (let index = 0; index < 4; index++) { // creating form array
      this.selectedJourney.push({
        selectedPlanet : null,
        selectedVehicle : null,
      });
    }
  }


  /**
   * Angular life cycle
   * @memberof BaseComponent
   */
  ngOnInit() {

    this.createForm(); //Creates reactive form

    this._store.getReset().subscribe((value) => { //Detects change in behaviour subject to reset or not

      if(value.isReset) {
        this.reset();
      }
    })

    this.getPlanetList(); //To get Planet details on load
  }


  /**
   * Creates form array
   * @memberof BaseComponent
   */
  public createForm() : void {

    this.journeyForm = this._formBuilder.group({

      journey: this._formBuilder.array([this.createJourney()])
    });

    this.journeyArray = this.journeyForm.get('journey') as FormArray;
    
    for (let index = 0; index < 3; index++) {
      this.journeyArray.push(this.createJourney());
    }

  }


  /**
   * Form array create
   * @returns {FormGroup}
   * @memberof BaseComponent
   */
  public createJourney(): FormGroup {
    return this._formBuilder.group({
      planet: '',
      vehicle: '',
    });
  }


  /**
   * Get planet list from API
   * @memberof BaseComponent
   */
  public getPlanetList() : void {

    this.isLoading = true; // Intializing loader
    this.loaderMessage = 'Searching for near by planets...'; //Setting loader message
    
    // this.mockGetPlanetList().subscribe((response) => {
      this._store.getPlanetList().subscribe((response) => {
        
        this.planetList = response;
        this.isError = false;
        this.isLoading = false;
        this.getVehicleList(); //Calling vehicle API

    },() => { //Error handling
      this.isLoading = false; //Hides loader
      this.isError = true;
    });
  };


  /**
   * Get vehicle list from API
   * @memberof BaseComponent
   */
  public getVehicleList() : void {

    this.isLoading = true;
    
    this.loaderMessage = 'Checking availablity of vehicles...';

      this._store.getVechileList().subscribe((response) => {
        
        this.vehicleList = response;
        this.isError = false;
        this.isLoading = false;

    },() => {
      this.isLoading = false;
      this.isError = true;
    });
  }


  /**
   * Handles changes from selection. 
   * @param {MatRadioChange} event
   * @param {number} fromPort
   * @memberof BaseComponent
   */
  public vehicleUpdate(event : MatRadioChange , fromPort : number) : void {

    this.vehicleList.forEach((vehicle) => {

      if (this.journeyForm.controls.journey['controls'][ fromPort].controls.vehicle.value) { //If the port already has the vechile selected, Then the previously selected vehicle's count should be incremented

        if (vehicle.name === this.journeyForm.controls.journey['controls'][ fromPort].controls.vehicle.value ) {
            vehicle.total_no += 1; //Incrementing previously selected vechile's count
        }
      }

      if (vehicle.name === event.value ) {

        this.selectedJourney[fromPort].selectedVehicle = vehicle;

        if (vehicle.total_no) {
          vehicle.total_no -= 1; //Decresing vechile's count
          this.getJourneyDetails(); //Gets Journey details
        }
      }

    });



    
    
  }
  


  /**
   * Handles planet selection changes
   * @param {MatSelectChange} event
   * @param {number} fromPort
   * @memberof BaseComponent
   */
  public planetSelection(event : MatSelectChange , fromPort : number) : void {

    if (this.selectedJourney[fromPort].selectedPlanet && this.selectedJourney[fromPort].selectedPlanet.name) { //Checks if the port has planet selected
        
      if (this.selectedJourney[fromPort].selectedPlanet.name){
        this.selectedJourney[fromPort].selectedPlanet.selected = false;   //If the planet has been selected already then it should be enabled for other port's
      }
    }

    this.planetList.forEach((planet , index) => {

      if (planet.name === event.value ) {

        this.selectedJourney[fromPort].selectedPlanet = planet;
        planet.selected = true; //Disables planet for othe port
        planet.color = this.planetColor[index]; //Applies color for planet
        this.getJourneyDetails();
      }

    });
    
  }


  /**
   * Submit funtion to Find Falcone
   * @memberof BaseComponent
   */
  public launch() : void {


    let selectedPlanets = [];
    let selectedVechiles = [];

    if (this.loadCompleted === 100) { //Fired only when all the journey is selected

      this.isLoading = true;
      this.loaderMessage = 'Searching for Falcone....';


      this.selectedJourney.map((journey) => {

        selectedPlanets.push(journey.selectedPlanet.name);
        selectedVechiles.push(journey.selectedVehicle.name);
      });


      this._store.getToken().subscribe((token) => { //Getting token

        if (token) {
          
          console.log('token' , token);
  
          this._store.find(token.token, selectedPlanets, selectedVechiles).subscribe((response : Result) => { //Firing API to find falcone
  
            if (response) {
              
              console.log('Result',response);
  
              this._store.commonStorage = {
                status : response .status,
                planetName : response.planet_name,
                journeyTime : this.totalTimeTaken
              }

              if (response.status === 'success') { //If success storing planet details 

                this.planetList.map((planet) => {
                  if (planet.name === response.planet_name) {
                    this._store.commonStorage.planetdistance = planet.distance;
                  }
                });
                
                this._store.commonStorage.vehicleName = selectedVechiles[selectedPlanets.indexOf(response.planet_name)];

              } else if (response.error) { //Handling error

                this.isLoading = false;
                this.isError = true;
                this.errorMessage = response.error;
              }

              this.isLoading = false;
              this._router.navigateByUrl('result'); //Navigating to mission status page
              
            }
          },(error) => { //Error handlig
            this.isLoading = false;
            this.isError = true;
            this.errorMessage = 'Something went wrong, Please try launching again';
          });
        }
      },(error) => { //Token error handling
        this.isLoading = false;
        this.isError = true;
        this.errorMessage = 'Invalid token,  Please Try again';
      });
    }

  }


  /**
   * To get the journey detailsfor calculating total timme taken
   * @memberof BaseComponent
   */
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


  /**
   * To reset the form
   * @memberof BaseComponent
   */
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
