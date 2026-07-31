import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, pipe } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Component({
  selector: 'countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.css']
,  standalone: false})
export class CountriesComponent implements OnInit {
  countries: country[] = [];
  countryNameInput: any;
  options = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

  constructor(private http: HttpClient) {
    
    http.get<country[]>('http://localhost:11217/api/Countries/GetCountries')
      .subscribe(response => {
        console.log(response);
        this.countries = response;
      }
      );
    // we are subscribing to this observable, so when the data is ready we will be notified        
  }

  addCountry(countryInput: HTMLInputElement) {
    console.log(countryInput.value);
    // let country = { CountryName: countryName.value }
    let country: country = { CountryName: countryInput.value, CountryIdPk: 0, CountryLanguage: '' }
    
    
    this.http.post<country>("http://localhost:11217/api/Countries/PostCountry", JSON.stringify(country), this.options)
    .subscribe(response=>{
      this.countries.push(response);
      console.log(response);
      countryInput.value = '';
    });
  }

  Update(country: country){
    // console.log(this.countryNameInput);
    country.CountryName = this.countryNameInput;
    // also there is the patch, it's like the put but the difference between patch and put is that patch 
    // updates only a few properties, but patch is not widely supported, but it's useful in the performance
    this.http.put("http://localhost:11217/api/Countries/PutCountry/" + country.CountryIdPk, 
    JSON.stringify(country), this.options)
    .subscribe((response: any) =>{
      console.log(response);
      
    });
  }

  Delete(country: country){
    this.http.delete("http://localhost:11217/api/Countries/DeleteCountry/" + country.CountryIdPk)
    .subscribe((response: any) =>{
      let index = this.countries.indexOf(country);
      this.countries.splice(index, 1);
      
    });
  }

  ngOnInit() {
  }

}

interface country {
  CountryIdPk: number;
  CountryName: string;
  CountryLanguage: string;
}

