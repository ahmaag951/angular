import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'hello-world';

  form: FormGroup;

  constructor(fb: FormBuilder) {
    this.form = fb.group({
      email: fb.control('initial email', Validators.required)
    });
  }

  onSave() {
    console.log(this.form.value);
  }
}
