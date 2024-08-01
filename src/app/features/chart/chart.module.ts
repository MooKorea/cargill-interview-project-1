import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartComponent as ChartComponentMain } from './chart.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { GetAggregatesService } from '../../services/get-aggregates.service';
import { SelectAggregatePointService } from '../../services/select-aggregate-point.service';

@NgModule({
  imports: [CommonModule, NgApexchartsModule],
  exports: [ChartComponentMain],
  declarations: [ChartComponentMain],
  providers: [GetAggregatesService, SelectAggregatePointService]
})
export class ChartModule {}
