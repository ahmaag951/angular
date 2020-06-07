import { DataService } from './service/data.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'hello-world';
  countries;

  constructor(
    private dataService: DataService) {
    this.getAllCountries();
  }

  getAllCountries() {
    this.dataService
      .getList('https://localhost:44307/api/values/getall')
      .subscribe(result => this.countries = result);
  }

  onAdd() {
    this.dataService
      .post('https://localhost:44307/api/values/post', { name: 'test country' })
      .subscribe(() => this.getAllCountries());
  }

  onUpdate() {
    this.dataService
      .put('https://localhost:44307/api/values/put', { id: 1, name: 'updated country' })
      .subscribe(() => this.getAllCountries());
  }

  onDelete() {
    this.dataService
      .delete(`https://localhost:44307/api/values/delete/${1}`)
      .subscribe(() => this.getAllCountries());
  }
}
