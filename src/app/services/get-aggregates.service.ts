import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GetAggregatesService {
  constructor(private http: HttpClient) {}
  getAggregates(
    stocksTicker: string,
    multiplier: string,
    timespan: string,
    startDate: string,
    endDate: string
  ) {
    const params = new URLSearchParams({
      stocksTicker,
      multiplier,
      timespan,
      startDate,
      endDate
    })
    const url = "https://cargill-interview-project-backend.vercel.app/api/aggregates" + params
    console.log(url)
  }
}
