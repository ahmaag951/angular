import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CoursesComponent } from './courses.component';
import { SecondComponent } from './Second.component';

// the Angular Module: is a container for a group of related components
// this is a decorator for this class to convert it to a module from the angular's point of view
@NgModule({
  // here is where we add the components that are parts of this module
  declarations: [
    AppComponent,
    // we added our component
    CoursesComponent,
    SecondComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
