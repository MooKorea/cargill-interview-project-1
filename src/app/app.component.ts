import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AggregatesModule } from './aggregates/aggregates.module';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AggregatesModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'cargill-interview-project-1';
}
