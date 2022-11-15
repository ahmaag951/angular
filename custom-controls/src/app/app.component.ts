import { Component } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'hello-world';
  cars = [
    { id: 1, name: 'Volvo' },
    { id: 2, name: 'BMW' },
    { id: 3, name: 'Audi' },
  ];

  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = fb.group({
      external: [''],
      car: ['']
    });
  }

  onClick() {
    console.log(this.form.value);

  }
}
