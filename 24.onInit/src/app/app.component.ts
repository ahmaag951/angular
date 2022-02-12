import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
/*
ngOnInit is a life cycle hook called by Angular2 to indicate that Angular is done creating the component.
  it's called after the component is created.
  Mostly we use ngOnInit for all the initialization/declaration and avoid stuff to work in the constructor. 
  The	constructor should only be used to initialize class members but shouldn't do actual "work".
  there are other life cycle hooks like OnChanges ... and so on
*/
// you can remove implements OnInit if you want

export class AppComponent implements OnInit {
  ngOnInit(): void {
    this.title = "title changed from onInit"
  }

  constructor() {
    this.title = "title changed from constructor"

  }

  title = 'this title is changed by me';
}
