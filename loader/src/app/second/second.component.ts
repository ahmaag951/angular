import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-second',
  templateUrl: './second.component.html',
  styleUrls: ['./second.component.scss']
,  standalone: false})
export class SecondComponent implements OnInit {

  constructor() {
    setTimeout(() => {

    }, 3000);

  }

  ngOnInit(): void {
  }

}

