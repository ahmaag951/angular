import { Component } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, take } from 'rxjs/operators';

const simpleObservable = new Observable(observer => {

  // observable execution
  observer.next("bla bla bla")
  observer.next("bla 22")
  observer.next("bla 33")
  observer.complete();
});

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'hello-world';

  constructor() {
    this.add();
  }

  add() {
    simpleObservable.subscribe(result => {
      console.log('normal subscription without any operators', result);
    });

    of('abcd from of').subscribe(result => {
      console.log(result);
    });

    simpleObservable.pipe(
      // will give you only the first two arguments from the observable
      // (the first two nexts)
      take(2)
    ).subscribe(result => {
      console.log('operator take2', result);
    });

    simpleObservable.pipe(
      map(x => x + ".....") // these dots will be added to the
      // returned result from the observable
    ).subscribe(result => {
      console.log(result);
    });

  }

}
