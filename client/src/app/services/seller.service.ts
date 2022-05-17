import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  baseURL = 'api/sellers';
  constructor(private http: HttpClient) {}

  createSeller(info): Observable<any> {
    return this.http.post<any[]>(this.baseURL, info).pipe(
      tap((_) => this.log('seller is created')),
      catchError(this.handleError('failed to create a seller', []))
    );
  }

  readSeller(id): Observable<any> {
    return this.http.get<any>(`${this.baseURL}+${id}.json`).pipe(
      tap((_) => this.log('Seller received')),
      catchError(this.handleError('failed retrieving the seller', []))
    );
  }

  updateSeller(id, updatedInfo): Observable<any> {
    return this.http.put<any>(this.baseURL + id + `.json`, updatedInfo).pipe(
      tap((_) => this.log('Seller updated')),
      catchError(this.handleError('failed updating the seller', []))
    );
  }

  deleteSeller(id): Observable<any> {
    return this.http.delete<any>(this.baseURL + id + `.json`).pipe(
      tap((_) => this.log('Seller has removed')),
      catchError(this.handleError('failed to remove the seller', []))
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
