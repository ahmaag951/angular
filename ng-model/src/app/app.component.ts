import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
,  standalone: false})
export class AppComponent {
  form: FormGroup;

  title = 'hello-world';
  lastname = 'initial last name';
  test: any;
  test2: any;

  onClick() {

    this.lastname = 'last name changed from ts';
  }

  constructor(fb: FormBuilder) {
    this.form = fb.group({
      id: ['aaa']
    });
  }
}

