import { Component } from '@angular/core';
// import { url } from 'inspector';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'this title is changed by me';
  colSpanValue = 5;
  inputText = "Start Input Value";
  counter = 1;

  OnClick() {
    this.inputText = "Button Clicked" + this.counter;
    this.counter++;
  }

  onKeyUp() {
    // the value of the input text will not be changed even if you changed it from the input
    // to change it, you need to use the two way binding
    alert(this.inputText + " and input text value is " + this.inputText);

  }
}
