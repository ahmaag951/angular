import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: false
})
export class AppComponent {
  title = 'custom title';
  courses = [
    { id: 1, name: 'course1' },
    { id: 2, name: 'course2' },
    { id: 3, name: 'course3' },
  ];

  courses2: any;

  onClick() {
    this.courses.push({ id: 4, name: 'course4' });
  }

  onRemove(course: any) {
    let index = this.courses.indexOf(course);
    this.courses.splice(index, 1);
  }

  onEdit(course: any) {
    course.name = 'some new name';
  }

  loadCourses2() {
    this.courses2 = [
      { id: 11, name: 'course11' },
      { id: 12, name: 'course12' },
      { id: 13, name: 'course13' },
    ];
  }

  trackCourse(index: any, course: any) {
    // if the course is exist and we have a course object, we return its id not the course itself, so the comparsion will be based on the id
    return course ? course.id : undefined;
    // now if you inspect the page elements, you will not notice changing in the li in the list, because the list is not reloaded
  }
}

