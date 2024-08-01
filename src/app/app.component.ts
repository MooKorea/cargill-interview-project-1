import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AggregatesModule } from './aggregates/aggregates.module';
import { DataTableModule } from './data-table/data-table.module';
import { ChartModule } from './chart/chart.module';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    AggregatesModule,
    DataTableModule,
    ChartModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'cargill-interview-project-1';
}
