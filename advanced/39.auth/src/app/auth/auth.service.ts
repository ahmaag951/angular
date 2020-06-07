import { tokenNotExpired } from 'angular2-jwt';
import { DataService } from './../data.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user;

  constructor(private dataService: DataService) { }

  isLogedIn() {
    return tokenNotExpired('token');
  }

  login() {
    this.dataService.post('https://localhost:44398/api/values/login', {})
      .subscribe(result => {
        console.log(result);
        localStorage.setItem('token', result.token);
      }
      );
  }

  logout() {
    localStorage.removeItem('token');
    this.user = null;
  }
}
