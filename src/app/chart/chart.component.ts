import { Component, ViewChild } from '@angular/core';
import {
  ChartComponent as C,
  ApexAxisChartSeries,
  ApexChart,
  ApexYAxis,
  ApexXAxis,
  ApexPlotOptions,
  ApexDataLabels,
  ApexStroke,
} from 'ng-apexcharts';
import { seriesData, seriesDataLinear } from './mockSeriesData';
import { GetAggregatesService } from '../services/get-aggregates.service';
import { filter, map, Observable, take } from 'rxjs';

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
  styleUrls: ['./chart.component.css'],
})
export class ChartComponent {
  @ViewChild('chart')
  chart!: C;
  chartCandleOptions$: Observable<any>;
  chartBrushOptions$: Observable<any>;

  constructor(private getAggregatesService: GetAggregatesService) {
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
              id: 'candles',
              toolbar: {
                autoSelected: 'pan',
                show: false,
              },
              zoom: {
                enabled: false,
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
              height: 160,
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
          };
        })
      );

    // this.chartBarOptions = {
    //   series: [
    //     {
    //       name: 'volume',
    //       data: seriesDataLinear
    //     },
    //   ],
    //   chart: {
    //     height: 160,
    //     type: 'bar',
    //     brush: {
    //       enabled: true,
    //       target: 'candles',
    //     },
    //     selection: {
    //       enabled: true,
    //       xaxis: {
    //         min: new Date('20 Jan 2017').getTime(),
    //         max: new Date('10 Dec 2017').getTime(),
    //       },
    //       fill: {
    //         color: '#ccc',
    //         opacity: 0.4,
    //       },
    //       stroke: {
    //         color: '#0D47A1',
    //       },
    //     },
    //   },
    //   dataLabels: {
    //     enabled: false,
    //   },
    //   plotOptions: {
    //     bar: {
    //       columnWidth: '80%',
    //       colors: {
    //         ranges: [
    //           {
    //             from: -1000,
    //             to: 0,
    //             color: '#F15B46',
    //           },
    //           {
    //             from: 1,
    //             to: 10000,
    //             color: '#FEB019',
    //           },
    //         ],
    //       },
    //     },
    //   },
    //   stroke: {
    //     width: 0,
    //   },
    //   xaxis: {
    //     type: 'datetime',
    //     axisBorder: {
    //       offsetX: 13,
    //     },
    //   },
    //   yaxis: {
    //     labels: {
    //       show: false,
    //     },
    //   },
    // };
    // this.getAggregatesService.aggregatesChartData$.subscribe((value) => {
    //   console.log(value)
    //   if (!value) return;
    // });
  }
}
