
/* use the suffix component when you name the component like CoursesComponent
now it's a normal ts class not a component, 
to make it component we have to add some metadata that angular understands
we use a decorator to achieve this called 'component decorator' */
import { Component } from '@angular/core';

// use the component decorator
@Component({
    selector: 'Courses', // like the css selectors, for example when you want to call a div with specific
    // id you call it like this '#div', or '.div' or 'div'. here in our case this is
    // the way you tell the component how it will be called, like this '<Courses>'
    template: '<h2>Courses[this is a header we added from component]</h2>',
    standalone: false 
    // it's the html markup we want to be rendered for this component,
    // and for simplicity we use the <h2>    
    // this is a basic component in angular
    // this was the first step
    // the second step is to register this component in a module
    // go to app.module.ts
    // the third step, use that component in html markup           
    // go to app.component.html => it's the html for the home page

    /*
    - to add component to your app you have to do 3 steps
        1. create a component
        2. register it in a module
        3. add an element in an HTML markup
    - if you want to make a component for courses for example name it
        courses.component.ts in the app folder in src
        and if it has multiple words call it 'course-form.component.ts
    - Pascal Naming Convention => the first letter of every word is capital
        this naming convention is used for the types and components
    */
})

export class CoursesComponent {

}