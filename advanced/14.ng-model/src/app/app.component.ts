import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'hello-world';
  lastname = 'initial last name';

  onClick() {

    this.lastname = 'last name changed from ts';
  }
}
