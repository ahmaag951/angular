import { Component, OnInit } from '@angular/core';

export interface Car {
  vin;
  year;
  brand;
  color;
}

export enum FilterMode {
  text, select, date
}

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css']
})
export class DataTableComponent implements OnInit {
  FilterMode = FilterMode;

  data: Car[] = [
    { vin: 'dsad231ff', year: 2012, brand: 'VW', color: 'Orange' },
    { vin: 'gwregre345', year: 2011, brand: 'Audi', color: 'Black' },
    { vin: 'dsad231ff', year: 2012, brand: 'VW', color: 'Orange' },
    { vin: 'h354htr', year: 2005, brand: 'Renault', color: 'Gray' },
    { vin: 'gwregre345', year: 2011, brand: 'Audi', color: 'Black' },
    { vin: 'h354htr', year: 2005, brand: 'Renault', color: 'Gray' },
  ];

  cols: any[] = [
    { field: 'vin', header: 'Vin', filterMode: FilterMode.text },
    { field: 'year', header: 'Year', filterMode: FilterMode.text },
    { field: 'brand', header: 'Brand', filterMode: FilterMode.select },
    { field: 'color', header: 'Color', filterMode: FilterMode.text }
  ];

  brands = [
    { label: 'All Brands', value: null },
    { label: 'VW', value: 'VW' },
    { label: 'Audi', value: 'Audi' },
    { label: 'BMW', value: 'BMW' },
    { label: 'Fiat', value: 'Fiat' },
    { label: 'Honda', value: 'Honda' },
    { label: 'Jaguar', value: 'Jaguar' },
    { label: 'Mercedes', value: 'Mercedes' },
    { label: 'Renault', value: 'Renault' },
    { label: 'Volvo', value: 'Volvo' }
  ];

  constructor() { }

  ngOnInit() {
  }

  customSort(event) {
    console.log(event);

  }

  onChange() {
    alert('hello');
  }

}
