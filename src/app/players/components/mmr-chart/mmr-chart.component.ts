import { Component, Input, OnInit } from '@angular/core';
import { EChartsOption } from 'echarts';
import { IRating } from '../../model/rating';

@Component({
  selector: 'app-mmr-chart',
  templateUrl: './mmr-chart.component.html',
  styleUrls: ['./mmr-chart.component.scss']
})
export class MmrChartComponent implements OnInit {
  @Input() data: IRating[];
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
      legend: {
          data: [
            {
            name: 'Solo MMR',
            textStyle: {
              color: '#5470c6'
            }
          },
          {
            name: 'Party MMR',
            textStyle: {
              color: 'red'
            }
          }]
      },
      dataZoom: [
        {
            show: true,
            realtime: true,
            start: 0,
            end: 10000,
            xAxisIndex: [0, 1]
        }
      ],
      tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'shadow'        // default line, type：'line' | 'shadow'
        },
        formatter(params): any {
          if (params) {
            // Check whether legend filter the data, if no such data won't show the tooltip
            const soloMMRtooltip = params[0] ? `<div style="color: ${params[0].color}">${params[0].seriesName}: ${params[0].value}</div>` : '';
            const partyMMRtooltip = params[1] ? `<div style="color: ${params[1].color}">${params[1].seriesName}: ${params[1].value}</div>` : '';
            return `
            <div style="background-color: rgba(0, 0, 0, 1); margin: -12px; color: rgba(255, 255, 255); font-size:13px; padding: 12px">
                ${soloMMRtooltip}
                ${partyMMRtooltip}
            </div>
            `;
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
      series: this.calSeriesData(this.data),
    };
  }
  calXData(data): string[] {
    const xData = [];
    const d = [...data];
    for (const i of d) {
      const yearDate = i.time;
      xData.push(yearDate);
    }
    return xData;
  }

  calSeriesData(data: IRating[]): any[] {
    const soloMMAR = {
      name: 'Solo MMR',
      data: [],
      type: 'line',
      color: '#5470c6'
    };
    const partyMMR = {
      name: 'Party MMR',
      data: [],
      type: 'line',
      color: 'red'
    };
    const d = [...data];
    for (const i in d) {
      if (d.hasOwnProperty(i)) {
        soloMMAR.data.push(d[i].solo_competitive_rank);
        partyMMR.data.push(d[i].competitive_rank);
      }
    }
    return [soloMMAR, partyMMR];
  }


}
