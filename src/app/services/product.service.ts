import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient) {}

  getProduct() {
    const reqHeader = new HttpHeaders({
      Authorization:
        'Bearer Nzc3MDM3NWNjYWRhM2NlNmMzNjRkNjVhMzQ3N2RhOGE2N2I4MGIyNzIxM2UzNjIzMTVjZWVjZTIwMzY3YjM5Mw',
    });
    return this.http
      .get('https://mvmapi.webkul.com/api/v2/products.json', {
        headers: reqHeader,
      })
      .pipe(
        tap((_) => this.log('data received')),
        catchError(this.handleError('Get Seller', []))
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
