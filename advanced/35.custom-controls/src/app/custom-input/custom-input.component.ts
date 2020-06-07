import { Component, OnInit, forwardRef, HostBinding, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

/*
ControlValueAccessor is an INTERFACE that acts as a bridge between the Angular forms API and a native element in the DOM.
*/
@Component({
  selector: 'app-custom-input',
  templateUrl: './custom-input.component.html',
  styleUrls: ['./custom-input.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CustomInputComponent),
      multi: true
    }
  ]
})
export class CustomInputComponent implements OnInit {
  val = ''; // this is the updated value that the class accesses
  constructor() { }

  ngOnInit() {
  }

  onChange: any = () => { };
  onTouched: any = () => { };

  set value(val) { // this value is updated by programatic changes
    if (val !== undefined && this.val !== val) {
      this.val = val;
      this.onChange(val);
      this.onTouched(val);
    }
  }

  // this method sets the value programmatically
  writeValue(value: any) {
    this.value = value;
  }

  // when UI element value changes, this method gets triggered
  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouched = fn;
  }

}
