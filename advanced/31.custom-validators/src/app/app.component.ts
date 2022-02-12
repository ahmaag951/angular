import { Component } from '@angular/core';
import { AbstractControl, FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'hello-world';
  form: FormGroup;

  constructor(private fb: FormBuilder) {
    // if you didn't put these validators in array, it will validate the first custom validator and ignore the rest of them
    this.form = fb.group({
      email: ['ab c',
        [
          FankoshValidators.shouldBeFankoshy,
          EmailValidators.cannotContainSpace,
          EmailValidators.shouldBeUnique,
          minLengthValidator(6)
        ]
      ]
    });
  }

  onSave() {
    console.log(this.form);
  }
}

export class FankoshValidators {
  static shouldBeFankoshy(control: AbstractControl) {
    if (!(control.value as string).startsWith('f')) {
      return { notFankosh: true };
    }
    return null;
  }
}

export class EmailValidators {
  static cannotContainSpace(control: AbstractControl) {
    if ((control.value as string).indexOf(' ') >= 0) {
      return { cannotContainSpace: true };
    } else {
      return null;
    }
  }

  static shouldBeUnique(control: AbstractControl) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (control.value == 'admin') {
          resolve({ shouldBeUnique: true });
        } else {
          resolve(null);
        }
      }, 2000);
    });

  }
}

// to send data with the validators
export const minLengthValidator = (min: number) => {

  return (control: AbstractControl) => {
    if ((control.value as string).length < min) {
      return {
        minValue: { minLength: false }
      };
    }
    return null;
  };
};
