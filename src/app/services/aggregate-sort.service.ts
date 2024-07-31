import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AggregateSort } from '../models/aggregateSort';

@Injectable({
  providedIn: 'root',
})
export class AggregateSortService {
  private sortSubject = new BehaviorSubject<AggregateSort>({
    direction: 'none',
    dataType: 't',
  });
  public currentSort$: Observable<AggregateSort> =
    this.sortSubject.asObservable();

  updateSort(sortParams:AggregateSort) {
    this.sortSubject.next(sortParams)
  }

  constructor() {}
}
