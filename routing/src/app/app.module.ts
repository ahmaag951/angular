import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { RouterModule } from '@angular/router';
import { CoursesComponent } from './courses/courses.component'

@NgModule({
  declarations: [
    AppComponent,
    CoursesComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      {
        path: "courses", component: CoursesComponent
      },
      {
        path: "courses/:id", component: CoursesComponent
      },
      {
        path: "courses/:id/:name", component: CoursesComponent
      }, 
      {
        path: "home", component: AppComponent
      }, 
      {
        // if you want to send parameter
        // the order of these routes is important so if this is after the path 'home', it will never 
        // matched, so put the more specefic routes on the top
        path: "home/:id", component: AppComponent
      }, 
      {
        // wild card.. if nothing found, usual goes to NotFoundComponent
        path: "**", component: AppComponent
      }
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
