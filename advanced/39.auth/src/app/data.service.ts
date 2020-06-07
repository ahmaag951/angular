import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(
    private http: HttpClient) { }

  getList(url: string): Observable<any[]> {
    return this.http.get<any[]>(url)
      .pipe(
        catchError(this.handleError('getList', []))
      ); 
  }

  get(url: string): Observable<any> {
    return this.http.get<any>(url)
      .pipe(
        catchError(this.handleError('get'))
      );
  }

  post(url: string, item: any): Observable<any> {
    return this.http.post<any>(url, item, httpOptions)
      .pipe(
        catchError(this.handleError('post'))
      );
  }

  postList(url: string, items: any[]): Observable<any> {
    return this.http.post<any>(url, items, httpOptions)
      .pipe(
        catchError(this.handleError('post list'))
      );
  }

  put(url: string, item: any): Observable<any> {
    return this.http.put<any>(url, item, httpOptions)
      .pipe(
        catchError(this.handleError('put'))
      );
  }

  delete(url: string): Observable<any> {
    return this.http.delete<any>(url)
      .pipe(
        catchError(this.handleError('delete'))
      );
  }

  private handleError(operation = 'operation', result?: any) {
    return (error: any): Observable<any> => {


      return throwError(error);
    };
  }

}
