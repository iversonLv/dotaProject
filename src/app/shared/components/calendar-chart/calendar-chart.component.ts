import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

// ngx-echart
import { EChartsOption } from 'echarts';


@Component({
  selector: 'app-calendar-chart',
  templateUrl: './calendar-chart.component.html',
  styleUrls: ['./calendar-chart.component.scss']
})
export class CalendarChartComponent implements OnInit {
  @Input() data: any;
  @Output() emitClickSymble = new EventEmitter();
  chartOption: EChartsOption;

  chartHeight: number;

  // chart calendar common setting
  yareMonthOption = {
    itemStyle: {
      color: 'rgb(0 0 0 / 20%)',
      borderColor: 'rgb(26 43 62)',
    },
    splitLine: {
      lineStyle: {
        color: '#b8b6b4',
        width: 1.5
      }
    },
    dayLabel: {
      color: '#b8b6b4',
    },
    yearLabel: {
        margin: 40
      },
      monthLabel: {
          margin: 20,
          color: '#b8b6b4',
      }
  };

  constructor(
  ) { }

  ngOnInit(): void {
    this.chartOption = {
        visualMap: [{
          show: false,
          min: 0,
          max: 1,
          // valueIndex: [4],
          inRange: {
              color: ['red', 'green']
          }
      }],
      tooltip: {
        formatter(params): any {
              return `<div style="text-align: center;background-color: rgba(0, 0, 0, 1); margin: -12px; color: rgba(255, 255, 255); font-size:13px; padding: 12px">
              <h2 style="font-size:13px; margin:0">${params.data[0]}</h2>
              <span style="color: rgb(102, 187, 106); font-weight: bold">${params.data[2]}</span> - <span style="color: rgb(255, 76, 76); font-weight: bold">${params.data[3]}</span>
              </div>`;
            },
      },
      calendar: {
        ...this.yareMonthOption,
        range: this.data.range,
        top: 75
      },
      series:  {
        type: 'scatter',
        selectedMode: 'single',
        select: {
          itemStyle: {
            borderColor: 'rgba(255, 255, 255, 1)',
            borderWidth: 1
          },
        },
        symbol: 'rect',
        coordinateSystem: 'calendar',
        data: this.parseData(this.data.subData),
        calendarIndex: 0,
        symbolSize: 17
        // symbolSize(val): any {
        //   if (val[1] > 10) {
        //     return val[1];
        //   } else if (val[1] < 5) {
        //     return val[1] * 4;
        //   } else {
        //     return val[1] * 2;
        //   }
        // }
      }
    };

  }

  // parse input data with same date
  // how many item for same date
  // how win item for sam data
  parseData(data): any {
    const dataArr = [];
    // data structure
    // {
    //   "2023-01-01": []
    // }
    for (const i in data) {
      if (data.hasOwnProperty(i)) {
        // tslint:disable-next-line:max-line-length
        const winsLen = data[i].filter(item => (item.player_slot <= 120 && item.radiant_win) || (item.player_slot > 120 && !item.radiant_win)).length;
        dataArr.push([
          i,
          data[i].length,
          winsLen,
          data[i].length - winsLen,
          winsLen / data[i].length
        ]);
      }
    }
    return dataArr;
  }

  onChartEvent(event: any, type: string): any {
    // console.log(event)
    this.emitClickSymble.emit(event.value[0]);
  }

}
