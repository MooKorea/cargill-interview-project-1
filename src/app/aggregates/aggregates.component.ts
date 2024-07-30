import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { GetAggregatesService } from '../services/get-aggregates.service';

@Component({
  selector: 'app-aggregates',
  templateUrl: './aggregates.component.html',
  styleUrls: ['./aggregates.component.scss'],
})
export class AggregatesComponent implements OnInit {
  formData: FormGroup = new FormGroup({
    tickerSymbol: new FormControl('', [Validators.required]),
    timespanMultiplier: new FormControl('', [Validators.required]),
    timespan: new FormControl('', [Validators.required]),
    startDate: new FormControl('', [Validators.required]),
    endDate: new FormControl('', [Validators.required])
  });

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private getAggregatesService: GetAggregatesService
  ) {

  }

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.formData.patchValue({
        tickerSymbol: params['tickerSymbol'] || '',
        timespanMultiplier: params['timespanMultiplier'] || '',
        timespan: params['timespan'] || '',
        startDate: params['startDate'] ? new Date(params['startDate']) : '',
        endDate: params['endDate'] ? new Date(params['endDate']) : ''
      });
    });
  }

  ngAfterViewInit() {
    this.formData.valueChanges.subscribe((value) => {
      this.router.navigate([], {
        relativeTo: this.route,
        queryParams: {
          tickerSymbol: value.tickerSymbol,
          timespanMultiplier: value.timespanMultiplier,
          timespan: value.timespan,
          startDate: value.startDate ? value.startDate.toISOString().split('T')[0] : null,
          endDate: value.endDate ? value.endDate.toISOString().split('T')[0] : null,
        },
        queryParamsHandling: 'merge',
      });
    });
  }

  onSubmit() {
    if (this.formData.valid) {
      console.log(this.formData.value);
    } else {
      console.error('Data is invalid');
    }
    console.log(
      this.formData.value.startDate.toISOString().split('T')[0]
    );
  }
}
