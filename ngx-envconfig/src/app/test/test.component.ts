import { Component, OnInit } from '@angular/core';
import { ConfigService } from '../config.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
,  standalone: false})
export class TestComponent implements OnInit {

  
  constructor(private config: ConfigService){
    console.log("This is a log from the console" + config.get('host'));
    
  }

  ngOnInit(): void {
  }

}

