import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.scss']
})
export class CountryComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) fromDialog
  ) {
    console.log(fromDialog);


  }

  ngOnInit() {

  }

}
