import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'hello-world';

  myArray: string[] = ['ab', 'cd', 'ef'];

  ngOnInit() {
    // Calls a defined callback function on each element of an array, 
    // and returns an array that contains the results.
    // in my example it takes one argument (the array element) and append '1' to it
    let list = this.myArray.map(x => (x + '1'));
    let list2 = this.myArray.map(x => {
      return (x + '1');
    });
    // list and list2 are the save but with different syntax
    console.log(list);
    console.log(list2);
  }
}
