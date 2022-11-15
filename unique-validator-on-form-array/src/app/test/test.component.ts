import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray } from '@angular/forms';
import { RxwebValidators } from '@rxweb/reactive-form-validators';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {
  form: FormGroup;

  constructor(private fb: FormBuilder) {

    this.form = fb.group({
      skills: fb.array([
        this.getSkillFormGroup()
      ])
    });
  }

  onSave() {
    console.log(this.form.value);
  }

  addSkill() {
    let skillsArray = <FormArray>this.form.controls.skills;
    skillsArray.push(this.getSkillFormGroup());
  }

  getSkillFormGroup() {
    return this.fb.group({
      skillName: ['', RxwebValidators.unique()]
    })
  }

  ngOnInit() {
  }

}
