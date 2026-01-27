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

  submit(f){
    alert(f.valid)
    // f.value has a json object that holds all the values in this form
    // so you can send that to persistance to save it into the db for example
    console.log(f);
    
  }

}

