import { Component, OnInit } from '@angular/core';
import { GetAggregatesService } from '../services/get-aggregates.service';
import { AggregatesData } from '../models/aggregatesData';
import { HttpRequestState } from '../models/httpRequestState';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss'],
})
export class DataTableComponent implements OnInit {
  table: HttpRequestState<AggregatesData> | null = null;
  displayedColumns: string[] = [
    'Timestamp',
    'Trading Volume',
    'Volume Weighted Avg. Price',
    'Open Price',
    'Close Price',
    'Highest Price',
    'Lowest Price',
    'No. of Transactions',
  ];

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(
      this.displayedColumns,
      event.previousIndex,
      event.currentIndex
    );
  }

  constructor(private getAggregatesService: GetAggregatesService) {
    this.getAggregatesService.getData().subscribe((value) => {
      this.table = value;
    });
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
