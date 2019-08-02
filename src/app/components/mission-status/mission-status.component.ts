import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/services/shared-service';


@Component({
  selector: 'app-mission-status',
  templateUrl: './mission-status.component.html',
  styleUrls: ['./mission-status.component.scss']
})
export class MissionStatusComponent implements OnInit {

  public joruneyStatus : any;

  constructor(
    private _router: Router,
    private _store : SharedService
  ) { }

  ngOnInit() {
    
    this._store.getReset().subscribe((value) => {

      if(value.isReset) {
        this.reset();
      }
    })
    
    this.joruneyStatus = this._store.commonStorage;

  }

  public reset() : void {
    this._store.setReset(false);
    this._router.navigateByUrl('launch');
  }

}
