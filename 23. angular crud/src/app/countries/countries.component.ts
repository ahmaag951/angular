import { Component, OnInit } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import { Observable, pipe } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Component({
  selector: 'countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.css']
})
export class CountriesComponent implements OnInit {
  countries: country[];
  countryNameInput;
  options = new RequestOptions({ headers: new Headers({ 'Content-Type': 'application/json' }) })

  constructor(private http: Http) {
    
    http.get('http://localhost:11217/api/Countries/GetCountries')
      .subscribe(response => {
        console.log(response.json());
        this.countries = response.json();
      }
      );
    // we are subscribing to this observable, so when the data is ready we will be notified        
  }

  addCountry(countryInput: HTMLInputElement) {
    console.log(countryInput.value);
    // let country = { CountryName: countryName.value }
    let country: country = { CountryName: countryInput.value, CountryIdPk: 0, CountryLanguage: '' }
    
    
    this.http.post("http://localhost:11217/api/Countries/PostCountry", JSON.stringify(country), this.options)
    .subscribe(response=>{
      let newCountry = response.json();
      this.countries.push(newCountry);
      console.log(response.json());
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
    .subscribe(response =>{
      console.log(response);
      
    });
  }

  Delete(country: country){
    this.http.delete("http://localhost:11217/api/Countries/DeleteCountry/" + country.CountryIdPk)
    .subscribe(response =>{
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
