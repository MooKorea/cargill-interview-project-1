import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AggregatesModule } from './features/aggregates/aggregates.module';
import { DataTableModule } from './features/data-table/data-table.module';
import { ChartModule } from './features/chart/chart.module';
import { AdditionalInfoModule } from './features/additional-info/additional-info.module';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    AggregatesModule,
    DataTableModule,
    ChartModule,
    AdditionalInfoModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'cargill-interview-project-1';
}
