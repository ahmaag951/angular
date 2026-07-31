import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.scss']
,  standalone: false})
export class CountryComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) fromDialog: any
  ) {
    console.log(fromDialog);


  }

  ngOnInit() {

  }

}

