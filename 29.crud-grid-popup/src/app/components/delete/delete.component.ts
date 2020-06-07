import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CountriesService } from 'src/app/services/countries.service';
import { CountryComponent } from '../country/country.component';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss']
})
export class DeleteComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private countriesService: CountriesService, public dialogRef: MatDialogRef<CountryComponent>) {

  }

  onSave() {
    this.countriesService.deleteCountry(this.data.id).subscribe(() => this.dialogRef.close())
  }

  ngOnInit(): void {
  }

}
