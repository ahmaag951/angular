import { Component, OnDestroy } from '@angular/core';
import { ServiceService } from './service.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
,  standalone: false})
export class AppComponent {
  title = 'hello-world';

  constructor(private service: ServiceService) {

  }

  addCountry(country) {
    this.service.sendCountry(country);
  }
}

