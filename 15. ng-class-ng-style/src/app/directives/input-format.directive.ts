import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[myCustomDirective]'
})
export class InputFormatDirective {

  // ElementRef is a service in angular that gives us access to a dom object
  constructor(private el: ElementRef) { }

  @Input('myCustomDirective')
  myInput;

  @Input()
  mySecondInput;

  // when we focus on our input field, this method will be called
  // host listener decorator alows us to subscribe to the events raised from the dom elements, you just give it the name of the dom event
  @HostListener('focus')
  onFocus() {
    console.log('on focus');

  }

  @HostListener('blur')
  onBlur() {
    console.log('on blur, the input is: ' + this.myInput);
    const value: string = this.el.nativeElement.value;
    this.el.nativeElement.value = value.toLowerCase() + ' this is added by the custom directive';
    console.log('the second input: ' + this.mySecondInput);

  }

}
