import { Component, ViewChild } from '@angular/core';
import {
  ChartComponent as Chart,
  ApexAxisChartSeries,
  ApexChart,
  ApexYAxis,
  ApexXAxis,
  ApexPlotOptions,
  ApexDataLabels,
  ApexStroke,
} from 'ng-apexcharts';
import { GetAggregatesService } from '../../services/get-aggregates.service';
import { filter, map, Observable, Subscription } from 'rxjs';
import { AggregateChartData } from '../../models/aggregateChartData';
import { SelectAggregatePointService } from '../../services/select-aggregate-point.service';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis;
  plotOptions: ApexPlotOptions;
  dataLabels: ApexDataLabels;
  stroke: ApexStroke;
};

export type ChartCandleOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  plotOptions: ApexPlotOptions;
};

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss'],
})
export class ChartComponent {
  @ViewChild('chart')
  chart!: Chart;
  chartCandleOptions$: Observable<ChartCandleOptions>;
  chartBrushOptions$: Observable<ChartOptions>;
  currentSelect: number = -1;

  chartData!: AggregateChartData[] | null;
  private chartSubscription!: Subscription;

  constructor(
    private getAggregatesService: GetAggregatesService,
    private selectAggregatePointService: SelectAggregatePointService,
  ) {
    this.chartCandleOptions$ =
      this.getAggregatesService.aggregatesChartData$.pipe(
        filter((x) => !!x),
        map((value) => {
          return {
            series: [
              {
                name: 'candle',
                data: value,
              },
            ],
            chart: {
              type: 'candlestick',
              height: 290,
              width: '99%',
              id: 'candles',
              toolbar: {
                autoSelected: 'pan',
                show: false,
              },
              zoom: {
                enabled: false,
              },
              events: {
                //https://apexcharts.com/docs/options/chart/events/#dataPointSelection
                //no types unfortunately
                click: (event, chartContext, opts) => {
                  this.onDataPointSelection(event, chartContext, opts);
                },
              },
            },
            plotOptions: {
              candlestick: {
                colors: {
                  upward: '#3C90EB',
                  downward: '#DF7D46',
                },
              },
            },
            xaxis: {
              type: 'datetime',
            },
          };
        })
      );

    this.chartBrushOptions$ =
      this.getAggregatesService.aggregatesChartData$.pipe(
        map((value) => {
          const minTime = !!value ? value[0].x : new Date();
          const maxTime = !!value ? value[value.length - 1].x : new Date();
          return {
            series: [
              {
                name: 'volume',
                data: value?.map((e) => {
                  return { x: e.x, y: e.linearPoint };
                }),
              },
            ],
            chart: {
              height: 120,
              width: '99%',
              type: 'bar',
              brush: {
                enabled: true,
                target: 'candles',
              },
              selection: {
                enabled: true,
                xaxis: {
                  min: minTime.getTime(),
                  max: maxTime.getTime(),
                },
                fill: {
                  color: '#ccc',
                  opacity: 0.4,
                },
                stroke: {
                  color: '#0D47A1',
                },
              },
            },
            dataLabels: {
              enabled: false,
            },
            plotOptions: {
              bar: {
                columnWidth: '80%',
                colors: {
                  ranges: [
                    {
                      from: -1000,
                      to: 0,
                      color: '#F15B46',
                    },
                    {
                      from: 1,
                      to: 10000,
                      color: '#FEB019',
                    },
                  ],
                },
              },
            },
            stroke: {
              width: 0,
            },
            xaxis: {
              type: 'datetime',
              axisBorder: {
                offsetX: 13,
              },
            },
            yaxis: {
              labels: {
                show: false,
              },
            },
          } as ChartOptions;
        })
      );
  }

  ngOnInit(): void {
    this.chartSubscription =
      this.getAggregatesService.aggregatesChartData$.subscribe((value) => {
        this.chartData = value;
      });
  }

  ngOnDestroy(): void {
    if (this.chartSubscription) {
      this.chartSubscription.unsubscribe();
    }
  }

  onDataPointSelection(event: any, chartContext: any, opts: any) {
    if (opts.dataPointIndex === -1 || this.chartData === null) return;
    const select = this.chartData[opts.dataPointIndex].x.getTime()

    //scroll to selected data in table if point is clicked on twice
    const element = document.getElementById(select.toString())
    if (select === this.currentSelect && element) {
      const y = element.getBoundingClientRect().top + window.scrollY - 200;
      window.scrollTo({top: y, behavior: 'smooth'});
    }

    this.currentSelect = select;
    this.selectAggregatePointService.updateSelect(this.currentSelect);
  }

}
