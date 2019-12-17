import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FlightComponent } from './flight/flight.component';
import { FlightSearchComponent } from './flight-search/flight-search.component';;


const routes: Routes = [
  { path: '', pathMatch: 'full',component: FlightSearchComponent },
  { path:'flights', component: FlightComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
