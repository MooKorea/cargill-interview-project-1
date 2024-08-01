import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  catchError,
  map,
  Observable,
  of,
  startWith,
} from 'rxjs';
import { TickerSymbol } from '../models/tickerSymbol';
import { HttpRequestState } from '../models/httpRequestState';

@Injectable({
  providedIn: 'root',
})
export class TickerSymbolsService {
  private tickerSubject = new BehaviorSubject<string | null>(null);
  public tickerSymbol$: Observable<string | null> =
    this.tickerSubject.asObservable();
  constructor(private http: HttpClient) {}

  getTickerSymbols(
    query: string
  ): Observable<HttpRequestState<TickerSymbol[]>> {
    const url = `https://cargill-interview-project-backend.vercel.app/api/ticker-symbol?query=${query.toUpperCase()}`;
    return this.http
      .get<{ res: TickerSymbol[] }>(url, {
        headers: { Accept: 'application/json' },
      })
      .pipe(
        map((data) => {
          return { data: data.res as TickerSymbol[], isLoading: false };
        }),
        catchError((error) => {
          console.error(error);
          return of({ error, isLoading: false });
        }),
        startWith({ error: null, isLoading: true })
      );
  }

  setTickerSymbol(tickerSymbol: string) {
    this.tickerSubject.next(tickerSymbol);
  }
}
