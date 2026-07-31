import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
,  standalone: false})
export class AppComponent {
  title = 'hello-world';
  val: number = 0;
  value: Date = new Date();

}

