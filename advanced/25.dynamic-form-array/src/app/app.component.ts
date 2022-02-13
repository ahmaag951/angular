import { Component } from '@angular/core';
import { FormGroup, FormArray, FormBuilder } from '@angular/forms'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'hello-world';
  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = fb.group({
      email: ['abc'],
      email2: fb.control('aaa'),
      address: fb.group({
        street: ['54 street'],
        avenue: ['1 avenue']
      }),
      countries: fb.array([
        ['Egypt'],
        ['Bahrain']
      ]),
      countries2: fb.array([
        fb.group({ id: ['1'], name: ['Egypt'] }),
        fb.group({ id: ['2'], name: ['Bahrain'] })
      ])

    });
  }

  onClick() {
    console.log(this.form.value.countries);
    console.log(this.form.value.countries2);

    console.log((this.form.controls.countries as FormArray).controls);

    console.log((this.form.get('countries') as FormArray).controls);

  }

  addCountries() {
    let array = this.form.controls.countries as FormArray;
    array.push(this.fb.control(['new country']));
  }

  addCountries2() {
    let array = this.form.get('countries2') as FormArray;
    array.push(this.fb.group({ id: 3, name: 'new country name' }));
  }

  removeCountries(index) {
    let array = this.form.controls.countries as FormArray;
    array.removeAt(index);
  }

  removeCountries2(index) {
    let array = this.form.controls.countries2 as FormArray;
    array.removeAt(index);
  }
}

/*
additional ideas
fb.array([this.createItem()]
this.countriesArray.push(this.createItem());
-----
  createItem() {
    return this.fb.group({
      id: [''],
      name: ['']
    })
  }
------
  // if you want it to be static at the beginning using existed array /////////////////////////////
    let list = [
      { id: ['1'], name: ['abc'] },
      { id: ['2'], name: ['cde'] }
    ]
    let array: FormArray = new FormArray([]);

    for (let item of list) {
      array.push(this.fb.group(item));
    }
------
    this.form = fb.group({
      countriesArray: array
    })
------
*/
