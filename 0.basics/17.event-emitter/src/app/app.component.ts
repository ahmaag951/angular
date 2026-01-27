import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
,  standalone: false})
export class AppComponent {
  title = 'hello-world';

  myOnOpen(eventArgs){
    console.log('open: ', eventArgs);
  }

  myOnClose(event){
    console.log('close: ', event);
  }
}

