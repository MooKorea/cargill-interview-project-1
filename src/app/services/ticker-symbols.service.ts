import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, startWith } from 'rxjs';
import { TickerSymbol } from '../models/tickerSymbol';
import { HttpRequestState } from '../models/httpRequestState';

@Injectable({
  providedIn: 'root',
})
export class TickerSymbolsService {
  constructor(private http: HttpClient) {}

  getTickerSymbols(
    query: string
  ): Observable<HttpRequestState<TickerSymbol[]>> {
    const url = `https://cargill-interview-project-backend.vercel.app/api/ticker-symbol?query=${query.toUpperCase()}`;
    return this.http
      .get<{ data: TickerSymbol[] }>(url, {
        headers: { Accept: 'application/json' },
      })
      .pipe(
        map((data) => {
          return { data: data.data as TickerSymbol[], isLoading: false };
        }),
        catchError((error) => {
          console.error(error)
          return of({ error, isLoading: false });
        }),
        startWith({ error: null, isLoading: true })
      );
  }
}
