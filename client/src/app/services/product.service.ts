import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  baseURL = '/api/products';

  constructor(private http: HttpClient) {}

  getProduct() {
    return this.http.get<any[]>(this.baseURL).pipe(
      tap((_) => this.log('data received')),
      catchError(this.handleError('Get Products', []))
    );
  }

  postProduct(data) {
    this.log('post request');
    const httpOptions = {
      headers: new HttpHeaders({
        // eslint-disable-next-line @typescript-eslint/naming-convention
        'Content-Type': 'application/json',
      })
    };
   return this.http.post<any[]>(this.baseURL,data, httpOptions).pipe(
      tap((_) => this.log('data sent')),
      catchError(this.handleError('post product failed',[]))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

  private log(message: string) {
    console.log(message);
  }
}
