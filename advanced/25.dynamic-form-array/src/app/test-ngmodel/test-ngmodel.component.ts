import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-test-ngmodel',
  templateUrl: './test-ngmodel.component.html',
  styleUrls: ['./test-ngmodel.component.css']
})
export class TestNgmodelComponent implements OnInit {
  form: FormGroup;
  test = "initial test";
  test2 = "initial test2";

  constructor(fb: FormBuilder) {
    this.form = fb.group({
      id: ['aaa']
    })
   }

  ngOnInit() {
  }

}
