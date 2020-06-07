import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'this titile is changed by ahmad ezzat';
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
    return course ? course.id : undefined;
  }
}
