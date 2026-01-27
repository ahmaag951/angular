// ViewEncapsulation must be imported from angular/core
import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styles: [
    `
    button{
      background-color: green;
    ,  standalone: false}

    a{
      background-color: aqua
    }
    `
    /* the app.component.css makes the button red, and here in styles it make the button green
     what come last will be the one effective
     the third way to apply styles is inline in the html
     but angular will pick only one of these style definitions, so angular will ignore all the styles
     that are defined in the first approach and take the styles in the second one, so the 'a' style
     will not work, because its styles approach is completly ignored and there will be no aqua color
     so you need to pick one of the approaches
     and in the third approach it will override only the specefic styles you override
     so the font size will be 20 not 150
 
     */
  ],
  styleUrls: ['./app.component.css'],
  /*
      please note that these styles will not leek outside this component
      so if you created a button outside this component it will not be affected with the styles in the component
      this is because something called 'view encapsulation', you can change it, but it's by default
      set to ' Emulated', also there is native and none options... for 99.9 in the cases you don't have
      to change this. this is just for explanation and also because something called 'shadow dom',
      simpley it allows us to apply scoped styles to elements without bleeding out to the outer world. this is new feature in some browsers
      its idea is very simple, your component create a shadow for the elements that it wants to change the style of,
      then shange the style of that shadow, by that way it will not affect the style of the other elements outside the component
  
      emulated: angular will emulate the shadow dom, because of the browsers that don't support shadow dom,
      so angular make a trick to apply scope to the styles
      attach attributes to elements and uses that attributes like for example [_ngcontent-c1] => so the other styles will work only
      with the components that has that attribute, you will notice that this is different to each component
  
      native: angular will use the native shadow dom in the browser, so it wont work with some browsers
      if you inspect element you will see something called 'shadow root'
  
      none: the styles defined here will leak outside the component
   */
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  title = 'this title is changed by me';
}

