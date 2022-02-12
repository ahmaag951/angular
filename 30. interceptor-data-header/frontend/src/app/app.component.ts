import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'hello-world';
  constructor(private http: HttpClient) { 
    http.get("http://localhost/interceptor-data-header/api/values").subscribe(result => {
      console.log(result);
      
    })
  }
}
