import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'custom title';

  courseNumber = 2;

  constructor(private router: Router) {

  }

  btnNavigateClick() {
    // the first argument is an array of link parameters, the same kind of array we use with the
    // router link directive and the 100 is the required parameters
    // and the second parameter is a navigation extra object
    this.router.navigate(['/courses', 100, 60], {
      queryParams: { page: 1, order: 'newest' }
    });
  }
}

/* there are three steps to implement navigation
  1. configure the routes (what component will be visible when user navigate to a component)
    so a route is a maping of a path to a component
  2. router outlet
  the router outlet is where you want to display the corresponding component when a given route becomes
 active
  3. add links
*/

