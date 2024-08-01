import { Component, input, OnDestroy, OnInit } from '@angular/core';
import { AggregateSortService } from '../../services/aggregate-sort.service';
import { AggregatesDataPoint } from '../../models/aggregatesData';
import { Observable, Subscription } from 'rxjs';
import { AggregateSort } from '../../models/aggregateSort';
import { GetAggregatesService } from '../../services/get-aggregates.service';

@Component({
  selector: 'app-table-header',
  templateUrl: './table-header.component.html',
  styleUrls: ['./table-header.component.scss'],
})
export class TableHeaderComponent implements OnInit, OnDestroy {
  label = input.required<string>();
  dataType = input.required<keyof AggregatesDataPoint>();
  sortType: Observable<AggregateSort>;
  sortIndex: number = 0;

  sortSubscription!: Subscription;
  constructor(
    private aggregateSortService: AggregateSortService,
    private getAggregatesService: GetAggregatesService
  ) {
    this.sortType = aggregateSortService.currentSort$;
  }

  ngOnInit() {
    this.sortSubscription = this.sortType.subscribe((x) => {
      if (x.dataType !== this.dataType()) {
        this.sortIndex = 0;
      }
    });
  }

  sortColumn() {
    this.sortIndex++;
    this.sortIndex = this.sortIndex % 3;

    const orderTypes = ['none', 'descending', 'ascending'] as const;
    const sortParams: AggregateSort = {
      direction: orderTypes[this.sortIndex],
      dataType: this.dataType(),
    };

    this.aggregateSortService.updateSort(sortParams);
    this.getAggregatesService.sortData(sortParams)
  }

  ngOnDestroy() {
    this.sortSubscription.unsubscribe();
  }
}
