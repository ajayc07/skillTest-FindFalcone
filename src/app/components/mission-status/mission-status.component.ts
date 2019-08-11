import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/services/shared-service';


@Component({
  selector: 'app-mission-status',
  templateUrl: './mission-status.component.html',
  styleUrls: ['./mission-status.component.scss']
})
export class MissionStatusComponent implements OnInit {


  /**
   * Journey details
   * @type {*}
   * @memberof MissionStatusComponent
   */
  public joruneyStatus : any;


  /**
   * Creates an instance of MissionStatusComponent.
   * @param {Router} _router
   * @param {SharedService} _store
   * @memberof MissionStatusComponent
   */
  constructor(
    private _router: Router,
    private _store : SharedService
  ) { }


  /**
   * Angular life cycle
   * @memberof MissionStatusComponent
   */
  ngOnInit() {
    
    this._store.getReset().subscribe((value) => {

      if(value.isReset) {
        this.reset();
      }
    })
    
    this.joruneyStatus = this._store.commonStorage;

  }


  /**
   * Resetting the form => navigates to home page
   * @memberof MissionStatusComponent
   */
  public reset() : void {
    this._store.setReset(false);
    this._router.navigateByUrl('launch');
  }

}
