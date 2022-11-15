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
    TableComponent,
    Table2Component,
    StepperComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  // here we add the components that added dynamically
  // that they are used in popup and not used anywhere else in the app
  // so the app will not know anything about them unless they are here
  // please see the app-routing-module file
  entryComponents: [MyDialogComponent]
})
export class AppModule { }
