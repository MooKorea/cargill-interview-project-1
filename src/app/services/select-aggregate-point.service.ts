import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SelectAggregatePointService {
  private selectSubject = new BehaviorSubject<number>(-1);
  public currentSelect: Observable<number> = this.selectSubject.asObservable();
  constructor() {}

  updateSelect(time: number) {
    this.selectSubject.next(time);
  }
}
