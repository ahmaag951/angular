import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'hello-world';
  /*
  to install bootstrap
  1. npm install --save bootstrap
  2. in angular.json in styles add => "./node_modules/bootstrap/dist/css/bootstrap.min.css"
  or import it in styles.scss => @import "~bootstrap/dist/css/bootstrap.css"
  */
}
