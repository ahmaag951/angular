import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.css'],
  // here is the second way
  // inputs: ['isFavorite'] // this will create field under the hood named with 'isFavorite'
,
  standalone: false
})
export class FavoriteComponent {

  // we want to mark this field as an input property, so who use this component can pass this value to it
  // there are two ways to do that 
  // 1. anotate this field like this, using input decorator
  // you can give this field an alis or a nick name
  // @Input('is-favorite-alias') isFavorite = true; 
  // the aliasing advantage is that if you changed the field name, no problems will happen
  // and you wont have to change anything in the view
  @Input() isFavorite = true;
  // 2. in the component meta data, up in this file
  // but the first approach is better, because you are not writing the field name in quotes
  // so if you changed the field name, it wont change in the quotes in the inputs.
  // isFavorite = true;

  // ------------------OUTPUT--------------------
  // we will add output field and the name of this field should be exactly the same name as the event we 
  // want to raise, in this case 'change', and decorate it with output decorator
  // we should also initialize this field with instance of the event emeter class, but please
  // take care that you can import this event emitter class from 3 places, take the one from @angular/core
  @Output() change = new EventEmitter();
  // please note that you can aliase the output, just exactly like you can aliase your input

  onClick() {
    this.isFavorite = !this.isFavorite;
    // now after you change isFavorite
    // raise an event emmiter for that
    //this.change.emit();// we use that to raise and publish an event, it means notify others that something happend
    // you can optionaly pass values with the emit method, and the subscribers will see that value
    // this.change.emit(this.isFavorite);
    // you can also pass the whole object
    this.change.emit({ newValue: this.isFavorite });
  }
}

export interface FavoriteChangedEventArgs{
  newValue: Boolean
}
