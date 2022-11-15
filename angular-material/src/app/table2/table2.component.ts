import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';

export interface Country {
  id: number;
  name: string;
}
const countries: Country[] = [
  { id: 1, name: 'Hydrogen' },
  { id: 2, name: 'Helium' },
  { id: 3, name: 'Lithium' },
  { id: 4, name: 'Beryllium' },
  { id: 5, name: 'Boron' },
  { id: 6, name: 'Carbon' },
  { id: 7, name: 'Nitrogen' },
  { id: 8, name: 'Oxygen' },
  { id: 9, name: 'Fluorine' },
  { id: 10, name: 'Neon' },
];
@Component({
  selector: 'app-table2',
  templateUrl: './table2.component.html',
  styleUrls: ['./table2.component.css']
})
export class Table2Component implements OnInit {

  columnsToDisplay = ['id', 'name'];
  /*
  Property decorator that configures a view query. The change detector looks for the first element or 
  the directive matching the selector in the view DOM. If the view DOM changes, and a new child matches the 
  selector, the property is updated. */
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  dataSource = new MatTableDataSource<Country>(countries);
  constructor() { }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
  }



}
