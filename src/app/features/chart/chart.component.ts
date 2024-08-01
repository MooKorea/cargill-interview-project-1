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
import { filter, map, Observable } from 'rxjs';

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
              width: "99%",
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
              height: 120,
              width: "99%",
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
}
