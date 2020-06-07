import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CountriesService extends HttpService {
  protected get baseUrl(): string {
    return 'countries/';
  }

  getCountries(): Observable<any>{
    return this.get('GetAll');
  }

  getCountry(id){
    return this.get(`Get/${id}`);
  }

  addCountry(data){
    return this.post('Post', data);
  }

  updateCountry(data){
    return this.put(`Put`, data);
  }

  deleteCountry(id){
    return this.delete(`Delete/${id}`);
  }
}
