import { HttpService } from './http.service';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'hello-world';
  form: FormGroup;

  constructor(fb: FormBuilder, private service: HttpService) {
    this.form = fb.group({
      fileName: ['']
    });
  }

  save() {
    console.log(this.form.value);

    this.service
      .post('https://localhost:44386/api/values/save', this.form.value)
      .subscribe(result => console.log('result: ', result.result)
      );
  }

  onSelectedFilesChanged(inputFile: any) {
    const file: File = inputFile.files[0];
    const reader = new FileReader();
    reader.addEventListener('load', (event: any) => {

      this.form.value.fileName = event.target.result;
    });
    reader.readAsDataURL(file);


  }
}
