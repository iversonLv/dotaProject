import { Component, Input, OnInit } from '@angular/core';
import { EChartsOption } from 'echarts';

@Component({
  selector: 'app-chart-stack-line-with-minus',
  templateUrl: './chart-stack-line-with-minus.component.html',
  styleUrls: ['./chart-stack-line-with-minus.component.scss']
})
export class ChartStackLineWithMinusComponent implements OnInit {
  @Input() data: any;
  chartOption: EChartsOption;
  constructor() { }

  ngOnInit(): void {
    this.chartOption = {
      legend: {
        data: ['Experience', 'Gold'],
        textStyle: {
          color: 'white'
        },
        bottom: '0%',
        inactiveColor: '#b8b6b4'
      },
      xAxis: {
        splitLine: { show: true, lineStyle: { color: 'rgba(184, 182, 180, .6)'} },
        axisLine: { onZero: true },
        boundaryGap: false, // don't let the first bar beginning from 0
        data: this.calXData(this.data),
      },
      yAxis: [{
        type: 'value',
        show: true,
        splitArea: {
          show: true,
          areaStyle: {
              color: ['rgba(102, 187, 106, .1)']
          }
        },
        min: this.calSmallestNumber(this.data) - 2000
      }],
      title: {
        text: 'Radiant',
        subtext: 'Dire',
        left: '0',
        top: '50',
        textStyle: {
          fontSize: 16,
          fontWeight: 'bold',
          color: 'rgb(102, 187, 106)'
        },
        subtextStyle: {
          fontSize: 16,
          fontWeight: 'bold',
          color: 'rgb(255, 76, 76)'
        },
        itemGap: 450
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'line',
          lineStyle: {
            type: 'solid',
            width: 2
          }
        },
        formatter(params): any {
          let str = `<div style='background-color: rgba(0, 0, 0, 1); margin: -12px; color: rgba(255, 255, 255); font-size:13px; padding: 12px'>
          <header style='text-transform: capitalize; margin: -12px -12px 12px; text-align: center; background-color: white; color: black;'>${params[0].name}</header>
          `;
          params.forEach(i => {
            const side = i.data < 0 ? 'Dire' : 'Radiant';
            return str += `
            <div><span class='${i.data < 0 ? 'side-dire' : 'side-radiant'}'>${side}<span><span style='color: ${i.color}'> ${Math.abs(i.data)} ${i.seriesName}</span></div>`;
          });
          str += `</div>`;
          return str;
        }

        // <img src='https://steamcdn-a.akamaihd.net/${i.data.content.heroImg}' />
    },
      series: this.calSeriesData(this.data)
    };
  }

  // cal xAxis hero name
  calXData(data: any): string[] {
    const xData = [];
    const d = [...data];
    for (let i = 0; i < d[0].length; i++) {
      xData.push(i + ':00');
    }
    return xData;
  }

  calSeriesData(data: any[]): any {
    const seriesData = [];
    for (let i = 0; i < data.length; i ++) {
      const seriesItem = {
          data: data[i],
          name: i === 0 ? 'Experience' : 'Gold',
          type: 'line',
          smooth: true,
          symbol: 'none',
          color: i === 0 ? 'rgb(102, 187, 255)' : 'rgb(201, 175, 29)',
          markArea: {
            itemStyle: {
              normal: {
                  color: 'rgba(255, 76, 76, .1)'
              },
            },
            data: [
                [ {yAxis: this.calSmallestNumber(data) - 2000 }, { yAxis: 0 }],
            ]
        }
      };
      seriesData.push(seriesItem);
    }
    console.log(seriesData);
    return seriesData;
  }

  // cal the smallest number to markArea;
  calSmallestNumber(data: any): number {
    const arr = [];
    const d = [...data];
    d.forEach(i => {
      arr.push(Math.min(...i));
    });
    return Math.min(...arr);
  }
}
