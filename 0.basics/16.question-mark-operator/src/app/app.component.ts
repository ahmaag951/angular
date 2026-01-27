import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
,  standalone: false})
export class AppComponent {
  title = { data: 'hello-world' };
  test = { data: null };
  test2 = {};
  // tslint:disable-next-line: whitespace
  abc = this.title?.data;
  abcd = this.test?.data;

  // the ?. is called 'the Elvis optional chaining operator, and it's supported
  // only in typescript 3.7, but it works fine in the html page without updating ts
  // it will give you syntax error, but it will work when you run
constructor() {
  // tslint:disable-next-line: whitespace
  console.log(this.abc);
  console.log(this.abcd);
  
}
}

export interface Country {
  id: number;
}
