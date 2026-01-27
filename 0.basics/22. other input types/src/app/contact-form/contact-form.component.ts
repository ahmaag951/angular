import { Component, NgModule } from '@angular/core';

@Component({
  selector: 'contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.css'],
  standalone: false
})
export class ContactFormComponent {

  log(data) {
    console.log(data);
    
  }

  contactMethods = [
    { id: 1, name: 'email'},
    { id: 2, name: 'paper'},
  ]

}

