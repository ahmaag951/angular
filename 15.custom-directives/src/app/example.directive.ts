import { Directive, ElementRef, Renderer2, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appExample]'
})
export class ExampleDirective {
  @Input() defaultColor;
  // we created this element ref so we can access the native element that uses our directive
  constructor(elementRef: ElementRef, renderer: Renderer2) {
    console.log(elementRef);

    elementRef.nativeElement.onclick = () => console.log('button clicked');
    renderer.setStyle(elementRef.nativeElement, 'background-color', '#ff0');


  }

  ngOnInit() {
    console.log(this.defaultColor);

  }
  @HostListener('mouseenter') onMouseEnter() {
    console.log('mouse enter done');
  }

  @HostListener('mouseleave') onMouseLeave() {
    console.log('mouse leave done');

  }
}
