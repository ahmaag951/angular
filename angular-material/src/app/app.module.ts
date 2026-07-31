import { MaterialModule } from './material/material.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';


import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MyDialogComponent } from './my-dialog/my-dialog.component';
import { TableComponent } from './table/table.component';
import { Table2Component } from './table2/table2.component';
import { StepperComponent } from './stepper/stepper.component';

@NgModule({ 
  declarations: [
    AppComponent,
    MyDialogComponent,
    Table2Component,
    StepperComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    TableComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
