import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CountriesService } from 'src/app/services/countries.service';
import { Country } from 'src/app/models/country';

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.scss']
})
export class CountryComponent implements OnInit {
  country: Country;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private countriesService: CountriesService, public dialogRef: MatDialogRef<CountryComponent>) {

    this.country = data;
    console.log('cou1', data);
    
  }

  ngOnInit(): void {
  }

  onSave() {
console.log('id', this.country.id);

    if(!this.country.id ){
      this.countriesService.addCountry(this.country).subscribe(() => this.dialogRef.close())
    }else{
      this.countriesService.updateCountry(this.country).subscribe(() => this.dialogRef.close())

    }

  }

}
