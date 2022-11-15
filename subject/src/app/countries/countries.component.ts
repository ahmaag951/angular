import { ServiceService } from './../service.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.css']
})
export class CountriesComponent implements OnDestroy {
  title = 'hello-world';
  countries: any[] = [];
  subscription: Subscription;

  constructor(private service: ServiceService) {

    // subscribe to the new added countries
    this.subscription = this.service.getCountry().subscribe(country => {
      this.countries.push(country);
    })
    this.service.sendCountry('initial country');
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }



}
