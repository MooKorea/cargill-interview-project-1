import { Component, input, OnDestroy, OnInit } from '@angular/core';
import { AggregateSortService } from '../../services/aggregate-sort.service';
import { AggregatesDataPoint } from '../../models/aggregatesData';
import { filter, Observable, Subscription } from 'rxjs';
import { AggregateSort } from '../../models/aggregateSort';

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
  constructor(private aggregateSortService: AggregateSortService) {
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
    this.aggregateSortService.updateSort({
      direction: 'none',
      dataType: this.dataType(),
    });
    this.sortIndex++;
    this.sortIndex = this.sortIndex % 3;
  }

  ngOnDestroy() {
    this.sortSubscription.unsubscribe();
  }
}
