import { NgModule } from '@angular/core';
import { AggregatesComponent } from './aggregates.component';
import { TickerSymbolInputComponent } from '../components/ticker-symbol-input/ticker-symbol-input.component';
import { TextInputComponent } from '../components/text-input/text-input.component';
import { DatePickerComponent } from '../components/date-picker/date-picker.component';
import { MatButtonModule } from '@angular/material/button';
import { TimespanInputComponent } from '../components/timespan-input/timespan-input.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { provideHttpClient } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { GetAggregatesService } from '../services/get-aggregates.service';

@NgModule({
  imports: [
    TickerSymbolInputComponent,
    TextInputComponent,
    DatePickerComponent,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    TimespanInputComponent,
    RouterModule
  ],
  exports: [AggregatesComponent],
  declarations: [AggregatesComponent],
  providers: [
    provideHttpClient(),
    GetAggregatesService
  ],
})
export class AggregatesModule {}
