import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'this titile is changed by ahmad ezzat';
  task = {
    // "assignee": { name: 'abc' },
    "assignee": { name: null },
  }
}
