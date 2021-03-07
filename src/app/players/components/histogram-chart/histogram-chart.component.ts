import { Component, Input, OnInit } from '@angular/core';

// ngx-echart
import { EChartsOption } from 'echarts';

// model
import { IHistogram } from '../../model/histogram';

@Component({
  selector: 'app-histogram-chart',
  templateUrl: './histogram-chart.component.html',
  styleUrls: ['./histogram-chart.component.scss']
})
export class HistogramChartComponent implements OnInit {
  @Input() data: IHistogram[];
  chartOption: EChartsOption;
  constructor() { }

  ngOnInit(): void {
    this.chartOption = {
      xAxis: {
          type: 'category',
          boundaryGap: true, // don't let the first bar beginning from 0
          splitLine: { show: true, lineStyle: { color: 'rgba(184, 182, 180, .6)'} },
          data: this.calXData(this.data)
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'shadow'        // default line, type：'line' | 'shadow'
        },
        formatter(params): any {
          if (params[0].value > 0) {
            return `<div style="background-color: rgba(0, 0, 0, 1); margin: -12px; color: rgba(255, 255, 255); font-size:13px; padding: 12px">${params[0].data.content.col} <br/>
            ${params[0].value} Matches <br/>
            <span style="color: ${params[0].data.itemStyle.borderColor}">${Math.floor(params[0].data.content.winPecentage * 100) / 100}</span> Win %
            </div>`;
          } else {
            return `<div style="background-color: rgba(0, 0, 0, 1); margin: -12px; color: rgba(255, 255, 255); font-size:13px; padding: 12px">${params[0].data.content.col} <br/>
            ${params[0].value} Matches`;
          }
        }
      },
      yAxis: [{
          scale: true,
          type: 'value',
          splitLine: { show: true, lineStyle: { color: 'rgba(184, 182, 180, .6)'} },
          axisLine: {
            show: true ,
          }
      }],
      series: [{
          data: this.calSeriesData(this.data),
          type: 'bar',
          barWidth: '80%',
      }],
    };
  }

  calXData(data): string[] {
    const xData = [];
    const d = [...data];
    // d.sort((a, b) => a.duration_bin - b.duration_bin); // show the bar order as duration_bin
    for (const i in d) {
      if (d.hasOwnProperty(i)) {
        const col = d[i].x;
        xData.push(col);
      }
    }
    return xData;
  }

  calSeriesData(data): string[] {
    const seriesData = [];
    const d = [...data];
    // d.sort((a, b) => a.duration_bin - b.duration_bin);
    for (const i in d) {
      if (d.hasOwnProperty(i)) {
        const col = d[i].x;
        const value = d[i].games;
        const winP = d[i].win / d[i].games;
        const red = 255 - 255 * winP;
        const green = 255 * winP;
        const color = `rgba(${red}, ${green}, 0, .7)`;
        const borderColor = `rgba(${red}, ${green}, 0, 1)`;
        // rgb('+ (255 - 255 * data[1] / data[0]) +', ' + 255 * data[1] / data[0] + ', 0)'
        seriesData.push({
          value,
          itemStyle: {
            borderColor,
            color,
            borderWidth: value === 0 ? 0 : 2  // if value is 0, dont' show border as well
          },
          content: { col, winPecentage: winP * 100 }
        });
      }
    }
    return seriesData;
  }

}
