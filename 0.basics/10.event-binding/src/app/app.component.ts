import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: false
})
export class AppComponent {
  title = 'custom title';
  textValue = 'the starting text value';
  onClick() {
    console.log('Button Clicked');
  }

  onClickWithEvent($event: Event) {
    console.log($event);
  }

  onKeyUp($event: any) {
    if ($event.keyCode === 13) // when Enter is clicked
      console.log('enter was clicked');

  }

  onKeyUpWithEventFilter() {
    console.log('enter was clicked');
  }

  onKeyUpAndGetText($event: any) {
    console.log('you wrote: ' + $event.target.value);

  }
  onKeyUpAndGetTextWithTemplateVariables(text: string) {
    console.log('you wrote: ' + text);
  }

  twoWayBinding1(text?: string) {
    console.log('the textValue field = ' + this.textValue);
  }

  onButtonClicked($event: Event) {
    console.log('onButtonClicked', $event);
    $event.stopPropagation();
  }

  onDivClicked($event: Event) {
    console.log('onDivClicked', $event);
  }

  getInputValue($event: Event): string {
    return ($event.target as HTMLInputElement).value;
  }
}

