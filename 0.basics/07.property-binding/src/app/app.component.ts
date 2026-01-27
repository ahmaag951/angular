import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
  <h2>{{ title }}</h2>
  <h2 [textContent]="title"></h2>
    
    using interpolation
      <img src="{{ imageUrl }}" /> <br>
    using property binding 
      <img [src]="imageUrl" />       
  `,
  styleUrls: ['./app.component.css'],
  standalone: false
  /*
  behind the scene when angular compiles our templates, it translates these interpolations into what we call 
  'property binding', the property binding binds a property of the dom element like the src here to 
  a field or a property in our component (imageUrl). so when we use the first syntax (interpolation), 
  angular behind the scene translates that to the second syntax (property binding)
and whenever the value of the field in the component changed, the src property of this element 
automatically updated.

so what do we choose?
interpolations works well with headings, divs, spans, paragraphs (wherever you want to render texts)
because its syntax with text is more complex (<h2 [textContent]="title"></h2>)

- property binding works only one way, from component to the dom.
if the field in the component changed, angular will update the dom, but not the vice verse
you can try this with input field if you want, and change it in the page, 
and you will notice that it didn't changed in the component
  */
})
export class AppComponent {
  title = 'custom title';
  imageUrl = "favicon.ico";
}

