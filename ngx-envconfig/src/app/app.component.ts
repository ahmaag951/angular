import { Component } from '@angular/core';
import { ConfigService } from 'ngx-envconfig';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'hello-world';

  constructor(private config: ConfigService){
    console.log(config.get('host'));
    
  }
}
