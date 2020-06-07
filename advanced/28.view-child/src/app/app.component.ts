import { Component, AfterViewInit, ViewChild, AfterViewChecked } from '@angular/core';
import { SubComponent } from './sub/sub.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  title = 'hello-world';

  // @ViewChild(SubComponent) sub: SubComponent;
  @ViewChild('firstid') sub: SubComponent;


  ngAfterViewInit() {
    console.log(this.sub.howAreYou());
    
  }
  
}
