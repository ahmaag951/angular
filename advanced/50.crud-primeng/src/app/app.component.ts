import { Component, OnDestroy } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/database';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  // this is the link to setup primeng https://primefaces.org/primeng/showcase/#/setup
  courses$: Observable<any>;
  dbPath = '/Courses/';

  inputVal = '';

  constructor(private db: AngularFireDatabase) {
    this.courses$ = db.list(this.dbPath).snapshotChanges();
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
}
