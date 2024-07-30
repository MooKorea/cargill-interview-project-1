import { Component, OnInit } from '@angular/core';
import { GetAggregatesService } from '../services/get-aggregates.service';
import { AggregatesData } from '../models/aggregatesData';
import { HttpRequestState } from '../models/httpRequestState';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss'],
})
export class DataTableComponent implements OnInit {
  table: HttpRequestState<AggregatesData> | null = null;
  displayedColumns: string[] = [
    'v',
    'vw',
    'o',
    'c',
    'h',
    'l',
    't',
    'n',
  ];

  constructor(private getAggregatesService: GetAggregatesService) {
    this.getAggregatesService.getData().subscribe((value) => {
      this.table = value;
    });
  }

  ngOnInit() {}
}
