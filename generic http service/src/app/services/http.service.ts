import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export abstract class HttpService {

  public serverUrl = 'http://localhost:50299/api/';
  protected abstract get baseUrl(): string;

  constructor(private http: HttpClient) {
  }
  
  get(url){
    
    return this.http.get(this.serverUrl + this.baseUrl + url);
  }

  post(url, data){
    return this.http.post(this.serverUrl + this.baseUrl + url, data, httpOptions);
  }

  put(url, data){
    return this.http.put(this.serverUrl + this.baseUrl + url, data, httpOptions);
  }

  delete(url){
    return this.http.delete(this.serverUrl + this.baseUrl + url);
  }
}
