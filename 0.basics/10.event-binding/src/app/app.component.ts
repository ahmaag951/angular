import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
,  standalone: false})
export class AppComponent {
  title = 'custom title';
  textValue = 'the starting text value';
  onClick() {
    console.log('Button Clicked');
  }

  onClickWithEvent($event) {
    console.log($event);
  }

  onKeyUp($event) {
    if ($event.keyCode === 13) // when Enter is clicked
      console.log('enter was clicked');

  }

  onKeyUpWithEventFilter() {
    console.log('enter was clicked');
  }

  onKeyUpAndGetText($event) {
    console.log('you wrote: ' + $event.target.value);

  }
  onKeyUpAndGetTextWithTemplateVariables(text) {
    console.log('you wrote: ' + text);
  }

  twoWayBinding1(text) {
    console.log('the textValue field = ' + this.textValue);
  }

  onButtonClicked($event) {
    console.log('onButtonClicked', $event);
    $event.stopPropagation();
  }

  onDivClicked($event) {
    console.log('onDivClicked', $event);
  }
}

