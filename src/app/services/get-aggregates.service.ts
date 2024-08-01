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
import { AggregatesData, AggregatesDataPoint } from '../models/aggregatesData';
import { AggregateSort } from '../models/aggregateSort';
import { AggregateChartData } from '../models/aggregateChartData';

@Injectable({
  providedIn: 'root',
})
export class GetAggregatesService {
  private aggregatesSubject =
  new BehaviorSubject<HttpRequestState<AggregatesData> | null>(null);
  public aggregatesData$: Observable<HttpRequestState<AggregatesData> | null> =
  this.aggregatesSubject.asObservable();
  
  private aggregatesChartSubject =
  new BehaviorSubject<AggregateChartData[] | null>(null);
  public aggregatesChartData$: Observable<AggregateChartData[] | null> =
  this.aggregatesChartSubject.asObservable();
  
  constructor(private http: HttpClient) {}
  
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
        const res = response as HttpRequestState<AggregatesData>;
        this.aggregatesSubject.next(res);
        if (!res.data) return;
        this.parseChartData(res.data.results)
      });
  }

  private parseChartData(data:AggregatesDataPoint[]) {
    const chartData = data.map(e => {
      return {
        x: new Date(e.t),
        y: [e.o, e.h, e.l, e.c],
        linearPoint: e.v
      }
    })

    this.aggregatesChartSubject.next(chartData)
  }

  sortData(sortParams: AggregateSort) {
    const currentState = this.aggregatesSubject.value;

    if (!currentState || !currentState.data) {
      console.error('No data available to sort');
      return;
    }

    const { data } = currentState;

    //Sort by timestamp by default
    if (sortParams.direction === 'none') {
      sortParams.dataType = 't';
      sortParams.direction = 'ascending';
    }

    // (a, b) => a - b sorts numbers in ascending order and vice versa.
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
    const sortedResults = [...data.results].sort(
      (a: AggregatesDataPoint, b: AggregatesDataPoint) => {
        if (sortParams.direction === 'ascending') {
          return a[sortParams.dataType] - b[sortParams.dataType];
        } else {
          return b[sortParams.dataType] - a[sortParams.dataType];
        }
      }
    );

    const sortedData = {
      ...data,
      results: sortedResults,
    };

    this.aggregatesSubject.next({ ...currentState, data: sortedData });
  }
}
