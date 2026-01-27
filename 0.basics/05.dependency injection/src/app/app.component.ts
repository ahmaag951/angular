import { Component } from '@angular/core';
import { CoursesService } from './courses.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
,  standalone: false})
export class AppComponent {
  title = 'this title is changed by me';
  courses;

  constructor(service: CoursesService) {
    // instead of creating this object by our self, we will ask angular to do that for us, using the DI.
    // we need to tell angular to create an instance of courses service and pass it to our courses component
    // go to app.module.ts => and add the service into the providers to be injected.

    //let service = new CoursesService();
    this.courses = service.getCourses();
  }
}

