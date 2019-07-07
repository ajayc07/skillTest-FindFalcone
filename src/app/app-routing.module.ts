import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MissionStatusComponent } from './components/mission-status/mission-status.component';
import { BaseComponent } from './components/base/base.component';

const routes: Routes = [
  { path: '', redirectTo: '/launch', pathMatch: 'full' },
  { path: 'launch', component: BaseComponent },
  { path: 'result', component: MissionStatusComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
