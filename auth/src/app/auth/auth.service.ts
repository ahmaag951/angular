import { DataService } from './../data.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: any;

  constructor(private dataService: DataService) { }

  isLogedIn() {
    const token = localStorage.getItem('token');
    if (!token) return false;
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.exp > Date.now() / 1000;
    } catch {
      return false;
    }
  }

  login() {
    this.dataService.post('https://localhost:5001/api/values/login', {})
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
