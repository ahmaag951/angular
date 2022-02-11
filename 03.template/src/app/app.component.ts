import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'this titile is changed by me';
  testData = "Simple Data";
  coursesList = ["course1", "course2", "course3"];

  getData() {
    return this.title;
  }
}
