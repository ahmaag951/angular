import { Component } from '@angular/core';
import { CoursesService } from './courses.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'this titile is changed by me';
  courses;
  // go to the terminal and write 'ng g s courses'
  // g for generate, s for service, courses is the service name

  constructor(service: CoursesService) {
    this.courses = service.getCourses();
  }
}
