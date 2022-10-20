import { Component, Input, OnInit } from '@angular/core';

import tierNames from '../../../../assets/data/tier_name.json';

// ngx-echart
import { EChartsOption } from 'echarts';

@Component({
  selector: 'app-distributions-col-chart',
  templateUrl: './distributions-col-chart.component.html',
  styleUrls: ['./distributions-col-chart.component.scss']
})
export class DistributionsColChartComponent implements OnInit {
  @Input() data: any;
  tierNames: string[] = tierNames;
  chartOption: EChartsOption;
  constructor() {
  }

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
          return `
          <div style="background-color: rgba(0, 0, 0, 1); margin: -12px; color: rgba(255, 255, 255); font-size:13px; padding: 12px">
            ${params[0].data.content.tierName} <br/>
            <span>${params[0].data.content.playerCounts} Players</span>
          </div>
          `;
        }
      },
      yAxis: [{
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
    for (const i in d) {
      if (d.hasOwnProperty(i)) {
        const a = this.tierNameDestruct(this.tierNames, d[i].bin_name);
        xData.push(a);
      }
    }
    return xData;
  }

  calSeriesData(data): string[] {
    const seriesData = [];
    const d = [...data];
    for (const i in d) {
      if (d.hasOwnProperty(i)) {
        const tierId = d[i].bin_name;
        const playerCounts = d[i].count;
        const tierName = this.tierNameDestruct(this.tierNames, d[i].bin_name);
        seriesData.push({
          value: playerCounts,
          category: tierId,
          itemStyle: {
            borderWidth: 2
          },
          content: { tierId, playerCounts, tierName }
        });
      }
    }
    return seriesData;
  }

  // the tier name is id, example 11, 80
  // 1st number is for tier, 2nd number is for level of this tier
  // So we need map the number to readable text
  // 11 === Herald [1]
  tierNameDestruct(tierNamesArr: string[], tierId: number): string {
    const changeIdToString = tierId + '';
    return tierNamesArr[+changeIdToString.charAt(0) - 1] + (changeIdToString.charAt(1) !== '0' ? ` [${changeIdToString.charAt(1)}]` : '' );
  }

}
