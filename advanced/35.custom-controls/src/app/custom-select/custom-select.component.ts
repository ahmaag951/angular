import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { Component, OnInit, forwardRef, Input } from '@angular/core';

@Component({
  selector: 'app-custom-select',
  templateUrl: './custom-select.component.html',
  styleUrls: ['./custom-select.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CustomSelectComponent),
      multi: true
    }
  ]
})
export class CustomSelectComponent implements OnInit {
  val = '';
  @Input() cars;

  constructor() {

  }

  ngOnInit() {
  }

  onChange: any = () => { };
  onTouched: any = () => { };

  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouched = fn;
  }

  writeValue(value) {
    this.value = value;
  }

  set value(val) {
    if (val !== undefined && val !== this.val) {
      this.val = val;
      this.onChange(val);
      this.onTouched(val);
    }
  }
}
