import { Component, OnInit } from '@angular/core';
import { Observable, Subject, BehaviorSubject, of } from 'rxjs';

// https://medium.com/@luukgruijs/understanding-rxjs-subjects-339428a1815b

const myObservable = Observable.create((observer) => {
  // this is an observable that return random number to its subscribers
  // every time the value of the random number will be different
  observer.next(Math.random());
});

const anotherWay = new Observable(observer => {
  // observable execution
  observer.next("bla bla bla")
});

const anotherWay2 = of('abc');

const mySubject = new Subject();
const myBehaviorSubject = new BehaviorSubject(99999);

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'hello-world';
  ngOnInit() {
    this.start();
  }
  /*
  The difference between the subject and the observable is that the observable is unicast
  and the subject is multicast, that means the subscribers of the observable each one
  will get different execution. unicast means that only one listens for each observable and multicast
  means that every subscriber will get the same result
  */

  start() {
    myObservable.subscribe((data) => {
      console.log('Observable subscriber1 ', data);
    });

    myObservable.subscribe((data) => {
      console.log('Observable subscriber2 ', data);
    });

    mySubject.subscribe((data) => {
      console.log('Subject subscriber1 ', data);
    });

    myBehaviorSubject.subscribe((data) => {
      console.log('Behavior subject first subscription ', data);
    });

    // you have to subscribe to the data first before you send it,
    // so the subscribers are listening to the data
    // because subscriber1 subscribed to the data before it's sent
    mySubject.next('subscriber1 only will get this data');

    mySubject.subscribe((data) => {
      console.log('Subject subscriber2 ', data);
    });

    myBehaviorSubject.subscribe((data) => {
      console.log('Behavior Subject second subscription ', data);
    });

    mySubject.next(Math.random());
    myBehaviorSubject.next(Math.random());
  }

}
