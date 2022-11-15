import { Component, OnInit, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.css']
})
export class CountryComponent implements OnChanges, OnInit {
  @Input() name;

  ngOnChanges() {
    console.log('1.ngOnChanges ', this.name);
  }

  constructor() {
    // in constructor the input is not defined yet
    console.log('0.constructor ', this.name);
  }

  ngOnInit() {
    console.log('2.ngOnInit (called once)', this.name);
  }

  ngDoCheck() {
    console.log('3.ngDoCheck');
  }

  ngAfterContentInit() {
    console.log('4.ngAfterContentInit (called once)');
  }

  ngAfterContentChecked() {
    console.log('5.ngAfterContentChecked');
  }

  ngAfterViewInit() {
    console.log('6.ngAfterViewInit (called once)');
  }

  ngAfterViewChecked() {
    console.log('7.ngAfterViewChecked');
  }

  ngOnDestroy() {
    console.log('8.ngOnDestroy');
  }

}
