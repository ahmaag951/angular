import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'this titile is changed by me';

  // not empty courses list
  courses = [1, 2];
  // empty courses list
  courses2 = [];
}
