import { Component, OnInit, Output, EventEmitter } from '@angular/core';
// import { EventEmitter } from 'protractor';

@Component({
  selector: 'my-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css']
,  standalone: false})
export class GridComponent {
  // the component can have input and output
  // the input is used to pass data or state to the component
  // and we use output properties to raise events from the component

  // the input and out are decorators
  // you can give the input or output alias names like this @Input('alias-name')
  // so if you change the name of the input here in the ts, you don't have to change it
  // in every html you used it in
  // we want the users of this component to be able to fire two events (open, and close)
  // first we create the two event emmiters as output parameters
  @Output() open: EventEmitter<any> = new EventEmitter();
  @Output() close: EventEmitter<any> = new EventEmitter();

  visible: boolean = true;

  toggle() {
    this.visible = !this.visible;

    // we now publish or emit our events
    // to notify the others that something happened
    if (this.visible) {
      // you can pass any value you want, and this value will be available to all the 
      // subscribers to this event
      this.open.emit('hello, the open event has been published.');
    } else {
      this.close.emit(null);
    }
  }

}

