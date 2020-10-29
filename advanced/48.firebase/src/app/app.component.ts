import { Component, OnDestroy } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  courses$: Observable<any>;
  dbPath = '/Courses/';
  // this is the link https://www.npmjs.com/package/@angular/fire
  // npm i firebase @angular/fire

  displayedColumns: string[] = ['name', 'actions'];
  dataSource;

  inputVal = '';

  constructor(private db: AngularFireDatabase) {
    this.courses$ = db.list(this.dbPath).snapshotChanges();
    this.dataSource = this.courses$;
    // this.courses$.pipe(take(1)).subscribe(
    //   list => this.dataSource = list
    // );
  }

  add() {
    if (this.inputVal === '') {
      return;
    }
    this.db.list(this.dbPath).push(this.inputVal);
    this.inputVal = '';
  }
  edit(key) {
    if (this.inputVal === '') {
      return;
    }
    console.log(this.inputVal, key);

    this.db.object(this.dbPath + key).set(this.inputVal);
    this.inputVal = '';
  }
  delete(key) {
    this.db.object(this.dbPath + key).remove();
  }


  // the firebase database is a real time database, so any change in the database will be immediatly executed.
  // when you make any change to the database you get the entire list of objects,
  // this is because you subscribed to the courses list in the database
  // this is not a big issue and you don't have to worry about it because firebase is optimized to handle that situations, but
  // if you subscribed to a list and you navigated away from that page, the subscription will keep getting that list again from the server
  // and this could lead to a memory leak (it consumes more memory that it needs)
  // to solve this unsubscribe to that list on OnDestroy, or use the async pipe

}
