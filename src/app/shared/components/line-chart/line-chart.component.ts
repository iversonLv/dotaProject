import { Component, Input, OnInit } from '@angular/core';

// ngx-echart
import { EChartsOption } from 'echarts';
import * as echarts from 'echarts';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss']
})
export class LineChartComponent implements OnInit {
  @Input() data: any;
  @Input() title: string;
  chartOption: EChartsOption;
  constructor() { }

  ngOnInit(): void {

    this.chartOption = {
      xAxis: {
          type: 'category',
          boundaryGap: false,
          splitLine: { show: true, lineStyle: { color: 'rgba(184, 182, 180, .6)'} },
          data: this.calXData(this.data.data)
      },
      tooltip: {
          trigger: 'axis',
          formatter(params): any {
            return `<div style="background-color: rgba(0, 0, 0, 1); margin: -12px; color: rgba(255, 255, 255); font-size:13px; padding: 12px">
            <span style="color: ${params[0].color}; display: inline-block; padding-right: 10px">${params[0].seriesName}</span>
            ${params[0].value}
            </div>`;
          }
      },
      yAxis: [{
          type: 'value',
          splitLine: { show: true, lineStyle: { color: 'rgba(184, 182, 180, .6)'} },
      }],
      series: [{
          showSymbol: false, // initial show dot or not
          name: this.data.title, // tooltip title
          data: this.calSeriesData(this.data.data),
          type: 'line',
          lineStyle: {
            color: this.data.color,
          },
          color: this.data.color, // dot color
          areaStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
              offset: 0,
              color: this.data.color
            }, {
              offset: 1,
              color: 'rgba(255, 255, 255, 0)',
            }])
        },
      }]
    };
  }

  calXData(data): string[] {
    const xData = [];
    for (const i in data) {
      if (data.hasOwnProperty(i)) {
        xData.push(data[i].percentile * 100 + '%');
      }
    }
    return xData;
  }

  calSeriesData(data): string[] {
    const seriesData = [];
    for (const i in data) {
      if (data.hasOwnProperty(i)) {
        const value = Math.floor(data[i].value * 100) / 100;
        seriesData.push(value);
      }
    }
    return seriesData;
  }

}
