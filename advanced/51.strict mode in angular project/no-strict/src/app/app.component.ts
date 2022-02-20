import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'no-strict';

  constructor() {
    const a: number = 6;

    switch (a) {
      case 0:
        // this is Fallthrough case in switch because there are no break at the end of the case
        // in the strict mode, this will give compile error, but here no
        console.log("even");
      case 1:
        console.log("odd");
        break;
    }
  }
}
