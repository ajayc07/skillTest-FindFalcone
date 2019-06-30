import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { FormBuilder } from '@angular/forms';

import { Planet, Vehicle } from 'src/app/model/app-model';
import { MatRadioChange } from '@angular/material/radio';
import { MatSelectChange } from '@angular/material/select';

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.scss']
})
export class BaseComponent implements OnInit {
  
  public journeyForm : FormGroup;
  
  public planetList : Array<Planet> = [];

  public vehicleList : Array<Vehicle> = [];

  constructor(
    private _formBuilder: FormBuilder
  ) { }

  ngOnInit() {

    this.createForm();
    this.getPlanetList();
    this.getVehicleList();
  }

  public createForm() : void {

    this.journeyForm = this._formBuilder.group({

      planet_1 : new FormControl(''),
      vehicle_1 : new FormControl(),

      planet_2 : new FormControl(),
      vehicle_2 : new FormControl(),

      planet_3 : new FormControl(),
      vehicle_3 : new FormControl(),

      planet_4 : new FormControl(),
      vehicle_4 : new FormControl(),
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

  public vehicleUpdate(event : MatRadioChange , fromPort : string) : void {

    console.log('Vechile update' , event , fromPort);
    
  }

  public planetSelection(event : MatSelectChange , fromPort : string) : void {

    console.log('Planet update' , event , fromPort);
    
  }

  public launch() : void {

    console.log('Launch' , this.journeyForm);
    
  }


}
