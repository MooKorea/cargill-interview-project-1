import { Component, OnInit } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { GetAggregatesService } from '../services/get-aggregates.service';
import { DatePipe } from '@angular/common';
import { AggregatesForm } from '../models/aggregatesForm';
import { first, last, take } from 'rxjs/operators';

@Component({
  selector: 'app-aggregates',
  templateUrl: './aggregates.component.html',
  styleUrls: ['./aggregates.component.scss'],
})
export class AggregatesComponent implements OnInit {
  formData;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private getAggregatesService: GetAggregatesService,
    private fb: NonNullableFormBuilder
  ) {
    this.formData = this.fb.group({
      tickerSymbol: ['', [Validators.required]],
      timespanMultiplier: ['', [Validators.required]],
      timespan: ['', [Validators.required]],
      startDate: this.fb.control<string | Date>('', [Validators.required]),
      endDate: this.fb.control<string | Date>('', [Validators.required]),
    });
  }

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.formData.patchValue({
        tickerSymbol: params['tickerSymbol'] || '',
        timespanMultiplier: params['timespanMultiplier'] || '',
        timespan: params['timespan'] || '',
        startDate: params['startDate'] ? new Date(params['startDate']) : '',
        endDate: params['endDate'] ? new Date(params['endDate']) : '',
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
          startDate: value.startDate
            ? (value.startDate as Date).toISOString().split('T')[0]
            : null,
          endDate: value.endDate
            ? (value.endDate as Date).toISOString().split('T')[0]
            : null,
        },
        queryParamsHandling: 'merge',
      });
    });

    this.route.queryParams.pipe(take(2), last()).subscribe((params) => {
      if (params['isSubmitted'] && this.formData.valid) {
        this.getAggregatesService.getAggregates(
          this.formData.value as AggregatesForm
        );
      } else {
        this.setSubmittedState(false);
      }
    });
  }

  setSubmittedState(isSubmitted: boolean) {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        isSubmitted: isSubmitted,
      },
      queryParamsHandling: 'merge',
    });
  }

  onSubmit() {
    if (this.formData.valid) {
      this.getAggregatesService.getAggregates(
        this.formData.value as AggregatesForm
      );

      this.setSubmittedState(true);
    } else {
      console.error('Data is invalid');
    }
  }
}
