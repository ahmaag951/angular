import { Component } from '@angular/core';
import { HttpService } from './services/http.service';
import { CountriesService } from './services/countries.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'hello-world';

  constructor(countriesService: CountriesService) {
    countriesService.getCountries().subscribe(result => {
      console.log(result);
    });

  }
}
