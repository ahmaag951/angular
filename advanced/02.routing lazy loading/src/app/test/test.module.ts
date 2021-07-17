import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TestRoutingModule } from './test-routing.module';
import { Countries2Component } from './countries2/countries2.component';

@NgModule({
  declarations: [ Countries2Component],
  imports: [
    CommonModule,
    TestRoutingModule
  ]
})
export class TestModule { }
