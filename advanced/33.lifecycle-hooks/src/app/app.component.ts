import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'hello-world';
  countryName = 'initial country name';

  onCountryNameChanged() {
    this.countryName = 'country name changed from app component';
  }
}
