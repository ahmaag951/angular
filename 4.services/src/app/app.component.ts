import { Component } from '@angular/core';
import { CoursesService } from './courses.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'this titile is changed by ahmad ezzat';
  courses;

  // if you needed data from http service [end point], and you called it here direct, this will make 
  // two problems
  // 1. this component will be tightly coupled to the service, 
  // 2. if someone else in this application needed to call this service, he will write this code again
  // 3. the component should not include any logic other than the presentation logic
  // details of how courses retreived should be delegated somewhere else in the app, 
  // so where we should implement that logic? by creating services
  // add file courses.service.ts


  constructor() {
    let service = new CoursesService();
    this.courses = service.getCourses();
  }
}
