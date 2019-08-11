import { Component, OnInit } from '@angular/core';
import { SharedService } from './services/shared-service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {

  /**
   * Title to be showed in tab
   * @type {*}
   * @memberof AppComponent
   */
  public title = 'Finding Falcone';
  
  public constructor(
    private _store : SharedService
  ) {
  }

  /**
   * Setting the is reset to true
   * @type {*}
   * @memberof AppComponent
   */
  public reset() : void {
    this._store.setReset(true);
  }
}
