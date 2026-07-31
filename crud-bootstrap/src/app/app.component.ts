import { Component } from '@angular/core';
import { Database, list, ref, push, set, remove } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: false
})
export class AppComponent {
  courses$: Observable<{ key: string | null; value: any }[]>;
  dbPath = '/Courses/';
  inputVal = '';

  constructor(private db: Database) {
    this.courses$ = list(ref(db, this.dbPath)).pipe(
      map(changes => changes.map(c => ({ key: c.snapshot.key, value: c.snapshot.val() })))
    );
  }

  add() {
    if (this.inputVal === '') return;
    push(ref(this.db, this.dbPath), this.inputVal);
    this.inputVal = '';
  }

  edit(key: string | null) {
    if (this.inputVal === '' || !key) return;
    set(ref(this.db, this.dbPath + key), this.inputVal);
    this.inputVal = '';
  }

  delete(key: string | null) {
    if (!key) return;
    remove(ref(this.db, this.dbPath + key));
  }
}

