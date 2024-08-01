import { Component, OnInit } from '@angular/core';
import { GetAggregatesService } from '../services/get-aggregates.service';
import { AggregatesData, AggregatesDataPoint } from '../models/aggregatesData';
import { HttpRequestState } from '../models/httpRequestState';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { AggregateSortService } from '../services/aggregate-sort.service';
import { AggregateSort } from '../models/aggregateSort';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss'],
})
export class DataTableComponent implements OnInit {
  table: Observable<HttpRequestState<AggregatesData> | null>

  headerData: { label: string; dataType: keyof AggregatesDataPoint }[] = [
    { label: 'Timestamp', dataType: 't' },
    { label: 'Trading Volume', dataType: 'v' },
    { label: 'Volume Weighted Avg. Price', dataType: 'vw' },
    { label: 'Open Price', dataType: 'o' },
    { label: 'Close Price', dataType: 'c' },
    { label: 'Highest Price', dataType: 'h' },
    { label: 'Lowest Price', dataType: 'l' },
    { label: 'No. of Transactions', dataType: 'n' },
  ];

  displayedColumns = this.headerData.map((e) => e.label);
  sortType: Observable<AggregateSort>;
  
  constructor(
    private getAggregatesService: GetAggregatesService,
    private aggregateSortService: AggregateSortService
  ) {
    this.table = this.getAggregatesService.aggregatesData$
    this.sortType = this.aggregateSortService.currentSort$;
  }
  
  drop(event: CdkDragDrop<string>) {
    moveItemInArray(
      this.displayedColumns,
      event.previousIndex,
      event.currentIndex
    );

    moveItemInArray(this.headerData, event.previousIndex, event.currentIndex);
  }

  parseTime(milliseconds: string) {
    const date = new Date(milliseconds);
    const formattedDate = date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
    });
    return formattedDate;
  }

  ngOnInit() {}
}
