import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'strict-default';

  constructor() {
    // https://docs.angular.lat/guide/strict-mode
    // the strict mode doesn't enable some errors that are demonstrated in that link 
    // here is an example to the Fallthrough case in switch
    // see angular.json files to know the differences between the strict project and the no strict project
    const a: number = 6;

    switch (a) {
      case 0:
        // this is Fallthrough case in switch because there are no break at the end of the case
        // because we enable the strict mode, this will give compile error
        console.log("even");
      case 1:
        console.log("odd");
        break;
    }
  }
}
