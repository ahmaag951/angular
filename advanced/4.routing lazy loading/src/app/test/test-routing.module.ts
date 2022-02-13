import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Countries2Component } from './countries2/countries2.component';

const routes: Routes = [
  { path: '', component: Countries2Component },
  { path: 'countries', component: Countries2Component },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TestRoutingModule { }
