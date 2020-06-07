import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
/**
 * there are two types of directives
 * 1. structural => modify the structure of the dom, by adding or removing dom elements
 * 2. attribute => modify the attribute of the dom element
 * 
 * whenever you use the structural directives, you precede them with (*)
 * 
 * 
 */