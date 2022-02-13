import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/toPromise';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor() {
    // https://itnext.io/javascript-promises-vs-rxjs-observables-de5309583ca2#targetText=Or%20that%20a%20promise%20is,at%20it%20in%20more%20detail.

    // There are different ways in JavaScript to create asynchronous code. The most important ones are the following:
    // Callbacks
    // Promises
    // Async/Await
    // RxJS Observables

    // in the callbacks you send function as a paramter to another function to be 
    // executed after the first function is finished
    this.callback1('ctor', this.callback2);

    // 2. promises
    // the promise differ from the callback in that you tell the promise what to do after it's finished not the vise versa
    let promise = this.asyncFunc();
    promise.then(result => console.log('the results from the promise: ', result));

    // 3. async/await
    // the async/await are just another syntax (syntax sugar) for the promise, it has been introduced in 
    // it tells the method to stop until the awaited method is finished
    // an async function returns a promise itself that is resolved with the function’s return value 
    // when the execution of the function body completes.
    // see the ngOnInit()

    // 4. observables
    // the observables are part of RxJS
    // RxJS is the JavaScript implementation of the ReactiveX project (project aims at providing an API for 
    // asynchronous programming for different programming languages)
    // the main difference between a promise and an observable is that a promise emits only a single value, 
    // whereas an observable emits multiple values
    // observable can do everything that a promise can do, but the reverse is not true

    // in the promise you can resolve (emit) only one value, but with observables you can emmit multiple values
    // just call next() every time you want to emit a new value, and then when you subscribe to that observable 
    // you will get these valuse by their order

    // we pass subscriber method to the ctor of the Observable
    // The subscriber function is called by the system whenever a new subscriber subscribes to the observable.
    // the observer object has a method next, which when called, emits the value that you pass it as argument from the observable
    // Note that after calling next, the subscriber function keeps running, and it can call next many more times. 
    // This is an important difference to promises, where after calling resolve the executor function is terminated
    // Promises can emit at most one value, whereas observables can emit any number of values.
    // to handle errors in promise use the resolve, and in observable use observer.error(error); it's like observer.next()
    // in observable If all successful... call  observer.complete(); either onCompleted or onError will be called but not both

    // if you tried to resolve multiple values with promise it will resolve only the first one
    /*
      const promise = new Promise(resolve => {
        resolve(1);
        resolve(2);
        resolve(3);
      });
      promise.then(result => console.log(result));
      This prints: 1 only
    */

    // the promise is eager and the observable is lazy
    // this means when you create the promise it will be automatically called
    let notCalledPromise = new Promise((resolve, reject) => console.log('from the notCalledPromise'));
    // but the observable will not be called until someone subscribe to it
    let notCalledObservable = new Observable(subscriber => subscriber.next('from notCalledObservable'));
    // this will not called unless you subscribed to it

    // the promise is not cancellable, so if you created promise that will do someting after 5 seconds you can't stop 
    // the then function from being executed
    // but the observable is cancellable, so you can unsubscribe to the observable

    // another thing ...
    // by default you can't make observable await, so you wait the result of observable
    // before doing some code, you have to convert it to promise by (toPromise)
    // for more information see sample (toPromise)


    const myObservable = new Observable(subscriber => {
      subscriber.next('I am the first value you will get');
      subscriber.next('I am the second value you will get');

      setTimeout(() => {
        console.log('and after one second you will get this last value');
      }, 1000)
    });

    myObservable.subscribe(result => {
      console.log('this is the result from the observable: ', result);

    })

  }

  callback1(str: string, callback) {
    console.log('callback1', str);
    callback();
  }

  callback2() {
    console.log('callback2');
  }

  asyncFunc() {
    return new Promise((resolve, reject) => {
      resolve('this message is from asyncFunc.');
      console.log('this is a log after asyncFunc resolve, but it will be executed before the resolve');
      // in other words, it will be executed when we create the promise

    });
  }

  async ngOnInit() {
    this.getList().then(() => {
      console.log(this.list);
    });
    await this.getList();
    console.log('after the await getList');

    console.log(this.list);

    await this.getList2(); // the two methods are similar
    console.log('after the await getList2');


    // if you check the type of this result field, you will find it by default promise, so you don't have to 
    // create the promise and return it in that method, just return what you want
    let result = await this.testAsyncMethodReturn();

    console.log('after testAsyncMethodReturn');
  }

  async getList() {
    // this promice after 3 seconds returns this list
    let promise: any = new Promise((resolve, reject) => {
      let list = ["ahmad", "mohd", "sayed"];
      setTimeout(() => { resolve(this.list = list) }, 3000);
    });
    return promise;
  }

  getList2() {
    return new Promise((resolve, reject) => {
      setTimeout(() => { resolve(["ahmad2", "mohd2", "sayed2"]) }, 5000);
    })
  }

  async testAsyncMethodReturn() {
    setTimeout(() => {
      return 'hello';
    }, 5000);
  }  

  title = 'hello-world';
  list: string[];
}
