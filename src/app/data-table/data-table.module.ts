import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataTableComponent } from './data-table.component';
import { GetAggregatesService } from '../services/get-aggregates.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { CdkDrag, CdkDropList } from '@angular/cdk/drag-drop';
@NgModule({
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    MatTableModule,
    CdkDrag,
    CdkDropList,
  ],
  exports: [DataTableComponent],
  declarations: [DataTableComponent],
  providers: [GetAggregatesService],
})
export class DataTableModule {}
