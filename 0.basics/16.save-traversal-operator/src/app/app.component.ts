import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
,  standalone: false})
export class AppComponent {
  title = 'this title is changed by me';
  task = {
    // "assignee": { name: 'abc' },
    "assignee": { name: null },
  }
}

