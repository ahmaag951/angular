import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'this title is changed by me';
  courses = [
    { id: 1, name: 'course1' },
    { id: 2, name: 'course2' },
    { id: 3, name: 'course3' },
  ];

  courses2;

  onClick() {
    this.courses.push({ id: 4, name: 'course4' });
  }

  onRemove(course) {
    let index = this.courses.indexOf(course);
    this.courses.splice(index, 1);
  }

  onEdit(course) {
    course.name = 'some new name';
  }

  loadCourses2() {
    this.courses2 = [
      { id: 11, name: 'course11' },
      { id: 12, name: 'course12' },
      { id: 13, name: 'course13' },
    ];
  }

  trackCourse(index, course) {
    // if the course is exist and we have a course object, we return its id not the course itself, so the comparsion will be based on the id
    return course ? course.id : undefined;
    // now if you inspect the page elements, you will not notice changing in the li in the list, because the list is not reloaded
  }
}
