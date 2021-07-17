import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  private subject = new Subject<any>();

  constructor() { }

  sendCountry(country) {
    this.subject.next({ country: country });
  }

  getCountry(): Observable<any> {
    return this.subject.asObservable();
  }
}
