import { Injectable } from '@angular/core';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class CountriesService extends HttpService {
  protected get baseUrl(): string {
    return 'values/';
  }

  getCountries(){
    return this.get('GetList');
  }

  getCountry(){
    return this.get('GetCountry/0');
  }

  addCountry(){
    return this.post('Post', 'new country');
  }

  updateCountry(){
    return this.put('Put/0', 'initial updated');
  }

  deleteCountry(){
    return this.delete('Delete/0');
  }
}
