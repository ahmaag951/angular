import { Component } from '@angular/core';
import { ConfigService } from './config.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
,  standalone: false})
export class AppComponent {
  title = 'hello-world';

  constructor(private config: ConfigService){
    console.log(config.get('host'));
    
  }
}

