import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
,  standalone: false})
export class AppComponent {
  title = 'custom title';
  testData = "Simple Data";
  coursesList = ["course1", "course2", "course3"];

  getData() {
    return this.title;
  }
}

