import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CoursesService } from './courses.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [
    CoursesService // angular will create a single instance of this service for the entire module
                  // for every one who wants to use it [singleton]
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
