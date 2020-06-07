import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LookupsRoutingModule } from './lookups-routing.module';
import { CountriesComponent } from './countries/countries.component';

@NgModule({
  declarations: [CountriesComponent],
  imports: [
    CommonModule,
    LookupsRoutingModule
  ]
})
export class LookupsModule { }
