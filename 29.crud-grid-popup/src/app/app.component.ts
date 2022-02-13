import { Component } from '@angular/core';
import { CountriesService } from './services/countries.service';
import { Country } from './models/country';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { CountryComponent } from './components/country/country.component';
import { DeleteComponent } from './components/delete/delete.component';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'hello-world';
  countries: Country[];

  constructor(private countriesService: CountriesService, private dialog: MatDialog) {

  }

  ngOnInit() {
    this.loadCountries();

  }

  loadCountries() {
    this.countriesService.getCountries().subscribe((result) => this.countries = result);
  }

  openPopup(country) {
    console.log('cou', country);
    
    let dialogConfig = new MatDialogConfig();
    dialogConfig.position = {
      'top': '0',
      left: '0'
    };
    dialogConfig.data = country;
    let myDialog = this.dialog.open(CountryComponent, dialogConfig);
    myDialog.afterClosed().subscribe(result => {
      if(result != false) {
        this.loadCountries();
      }
    });
  }

  openDeletePopup(country) {
    let dialogConfig = new MatDialogConfig();
    dialogConfig.position = {
      'top': '0',
      left: '0'
    };
    dialogConfig.data = country;
    let myDialog = this.dialog.open(DeleteComponent, dialogConfig);
    myDialog.afterClosed().subscribe(result => {
      if(result != false) {
        this.loadCountries();
      }
    });
  }
}
