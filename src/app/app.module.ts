import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BaseComponent } from './components/base/base.component';
import { MissionStatusComponent } from './components/mission-status/mission-status.component';
import { LoadingComponent } from './components/loading-progress/loading-progress.omponent';

import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';

import { SharedService } from './services/shared-service';

@NgModule({
  declarations: [
    AppComponent,
    BaseComponent,
    MissionStatusComponent,
    LoadingComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,

    MatSelectModule,
    MatRadioModule
  ],
  providers: [SharedService],
  bootstrap: [AppComponent]
})
export class AppModule { }
