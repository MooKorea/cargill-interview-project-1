import { Component } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet, Routes } from '@angular/router';
import { AggregatesModule } from './aggregates/aggregates.module';
import { DataTableModule } from "./data-table/data-table.module";
import { concatMap, filter, take, tap } from 'rxjs/operators';
import { GetAggregatesService } from './services/get-aggregates.service';
import { of } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AggregatesModule, DataTableModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'cargill-interview-project-1';

  // constructor(private router: Router, private getAggregatesService: GetAggregatesService) {
    
  // }

  // ngOnInit() {
  //   this.router.events
  //     .pipe(
  //       filter((x) => {
  //         return x instanceof NavigationEnd
  //       }),
  //       // tap((x) => {
  //       //   console.log(x.url)

  //       // }),
  //       concatMap(x => {
  //         if (x.url) {
  //           return this.getAggregatesService.getAggregates({
  //             tickerSymbol: "AAPL",
  //             timespanMultiplier: "1",
  //             timespan: "day",
  //             startDate: new Date(),
  //             endDate: new Date()
  //           })
  //         }
          
  //         return of ({data: null, isLoading: false}) as any
  //       }),
  //       take(1),
  //     ).subscribe()
  // }
}
