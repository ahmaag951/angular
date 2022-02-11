import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'this titile is changed by me';
  textValue = 'the starting text value';
  onClick() {
    alert('Button Clicked');
  }
  onClickWithEvent($event) {
    alert('Please see the log console');
    console.log($event);
  }

  onKeyUp($event) {
    if ($event.keyCode === 13) // when Enter is clicked
      alert('enter was clicked');

  }

  onKeyUpWithEventFilter() {
    alert('enter was clicked');
  }

  onKeyUpAndGetText($event) {
    alert('you wrote: ' + $event.target.value);

  }
  onKeyUpAndGetTextWithTemplateVariables(text) {
    alert('you wrote: ' + text);

  }
  twoWayBinding1(text) {

    alert('the textValue field = ' + this.textValue);
  }

  onButtonClicked($event) {
    console.log('onButtonClicked', $event);
    $event.stopPropagation();
  }

  onDivClicked($event) {
    console.log('onDivClicked', $event);
  }

}
