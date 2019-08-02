import { Component, OnInit } from '@angular/core';
import { SharedService } from './services/shared-service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {

  public title = 'Finding Falcone';
  
  public constructor(
    private _store : SharedService
  ) {
  }

  public reset() : void {
    this._store.setReset(true);
  }

  public gtHome() : void {
 //
  }
}
