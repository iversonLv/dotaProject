import { Component, Input, OnInit } from '@angular/core';

// ngx-echart
import { EChartsOption } from 'echarts';

@Component({
  selector: 'app-bar-column-chart',
  templateUrl: './bar-column-chart.component.html',
  styleUrls: ['./bar-column-chart.component.scss']
})
export class BarColumnChartComponent implements OnInit {
  @Input() data: any;
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
          return `<div style="background-color: rgba(0, 0, 0, 1); margin: -12px; color: rgba(255, 255, 255); font-size:13px; padding: 12px">${params[0].data.content.duration_bin} Minutes <br/>
          ${params[0].value} Matches <br/>
          <span style="color: ${params[0].data.itemStyle.barBorderColor}">${Math.floor(params[0].data.content.winPecentage * 100) / 100}</span> Win %
          </div>`;
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
    d.sort((a, b) => a.duration_bin - b.duration_bin); // show the bar order as duration_bin
    for (const i in d) {
      if (d.hasOwnProperty(i)) {
        const calDuration = d[i].duration_bin / 60;
        xData.push(calDuration);
      }
    }
    return xData;
  }

  calSeriesData(data): string[] {
    const seriesData = [];
    const d = [...data];
    d.sort((a, b) => a.duration_bin - b.duration_bin);
    for (const i in d) {
      if (d.hasOwnProperty(i)) {
        const value = d[i].games_played;
        const winP = d[i].wins / d[i].games_played;
        const red = 255 - 255 * winP;
        const green = 255 * winP;
        const color = `rgba(${red}, ${green}, 0, .7)`;
        const barBorderColor = `rgba(${red}, ${green}, 0, 1)`;
        const calDuration = d[i].duration_bin / 60;
        // rgb('+ (255 - 255 * data[1] / data[0]) +', ' + 255 * data[1] / data[0] + ', 0)'
        seriesData.push({
          value,
          itemStyle: {
            barBorderColor,
            color,
            borderWidth: 2
          },
          content: { duration_bin: calDuration, winPecentage: winP * 100 }
        });
      }
    }
    return seriesData;
  }

}
