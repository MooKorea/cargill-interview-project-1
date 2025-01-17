import { Component, OnInit } from '@angular/core';
import { TickerSymbolsService } from '../../services/ticker-symbols.service';
import { filter, map, mergeMap, Observable } from 'rxjs';
import { HttpRequestState } from '../../models/httpRequestState';
import { TickerSymbol } from '../../models/tickerSymbol';
import { GetAggregatesService } from '../../services/get-aggregates.service';

@Component({
  selector: 'app-additional-info',
  templateUrl: './additional-info.component.html',
  styleUrls: ['./additional-info.component.scss'],
})
export class AdditionalInfoComponent implements OnInit {
  label$: Observable<HttpRequestState<TickerSymbol[]>>;
  high$: Observable<number>;
  low$: Observable<number>;

  constructor(
    private tickerSymbolService: TickerSymbolsService,
    private getAggregatesService: GetAggregatesService
  ) {
    this.label$ = this.tickerSymbolService.tickerSymbol$.pipe(
      filter((value): value is string => !!value),
      mergeMap((value) => {
        return this.tickerSymbolService.getTickerSymbols(value);
      })
    );

    this.high$ = this.getAggregatesService.aggregatesChartData$.pipe(
      filter((x) => !!x),
      map((value) => {
        const highs = value.map(e => e.y[1])
        return Math.max(...highs);
      })
    );

    this.low$ = this.getAggregatesService.aggregatesChartData$.pipe(
      filter((x) => !!x),
      map((value) => {
        const lows = value.map(e => e.y[2])
        return Math.min(...lows)
      })
    );
  }

  ngOnInit() {}
}
