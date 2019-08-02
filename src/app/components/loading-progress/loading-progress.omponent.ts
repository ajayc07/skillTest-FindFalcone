import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'mission-loader',
  templateUrl: './loading-progress.component.html',
  styleUrls: ['./loading-progress.component.scss']
})
export class LoadingComponent implements OnInit {

  @Input() loaderMessage;

  constructor(
  ) { }

  ngOnInit() {
   
  }


}
