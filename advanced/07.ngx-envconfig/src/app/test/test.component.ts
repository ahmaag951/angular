import { Component, OnInit } from '@angular/core';
import { ConfigService } from 'ngx-envconfig';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {

  
  constructor(private config: ConfigService){
    console.log(config.get('host'));
    
  }

  ngOnInit(): void {
  }

}
