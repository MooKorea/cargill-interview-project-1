import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdditionalInfoComponent } from './additional-info.component';
import { TickerSymbolsService } from '../../services/ticker-symbols.service';
import { GetAggregatesService } from '../../services/get-aggregates.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  imports: [
    CommonModule,
    MatProgressSpinnerModule
  ],
  exports: [
    AdditionalInfoComponent
  ],
  declarations: [AdditionalInfoComponent],
  providers: [GetAggregatesService, TickerSymbolsService]

})
export class AdditionalInfoModule { }
