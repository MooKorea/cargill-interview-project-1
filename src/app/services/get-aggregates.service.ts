import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AggregatesForm } from '../models/aggregatesForm';
import {
  BehaviorSubject,
  catchError,
  map,
  Observable,
  of,
  startWith,
} from 'rxjs';
import { HttpRequestState } from '../models/httpRequestState';
import { AggregatesData } from '../models/aggregatesData';

@Injectable({
  providedIn: 'root',
})
export class GetAggregatesService {
  constructor(private http: HttpClient) {}
  private aggregatesSubject =
    new BehaviorSubject<HttpRequestState<AggregatesData> | null>(null);
  public aggregatesData$: Observable<HttpRequestState<AggregatesData> | null> =
    this.aggregatesSubject.asObservable();

  getAggregates(formData: AggregatesForm) {
    const params = new URLSearchParams({
      stocksTicker: formData.tickerSymbol,
      multiplier: formData.timespanMultiplier,
      timespan: formData.timespan,
      startDate: (formData.startDate as Date).toISOString().split('T')[0],
      endDate: (formData.endDate as Date).toISOString().split('T')[0],
    });
    const url =
      'https://cargill-interview-project-backend.vercel.app/api/aggregates?' +
      params;

    this.http
      .get<{ data: AggregatesData }>(url, {
        headers: { Accept: 'application/json' },
      })
      .pipe(
        map((data) => {
          return { data: data.data as AggregatesData, isLoading: false };
        }),
        catchError((error) => {
          console.error(error);
          return of({ error, isLoading: false });
        }),
        startWith({ isLoading: true })
      )
      .subscribe((response) => {
        this.aggregatesSubject.next(
          response as HttpRequestState<AggregatesData>
        );
      });
  }

  getData() {
    return this.aggregatesData$;
  }
}
