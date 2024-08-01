import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataTableComponent } from './data-table.component';
import { GetAggregatesService } from '../services/get-aggregates.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { CdkDrag, CdkDropList } from '@angular/cdk/drag-drop';
import { TableHeaderComponent } from './table-header/table-header.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { AggregateSortService } from '../services/aggregate-sort.service';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    MatTableModule,
    CdkDrag,
    CdkDropList,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
  ],
  exports: [DataTableComponent],
  declarations: [
    DataTableComponent,
    TableHeaderComponent,
  ],
  providers: [GetAggregatesService, AggregateSortService],
})
export class DataTableModule {}
