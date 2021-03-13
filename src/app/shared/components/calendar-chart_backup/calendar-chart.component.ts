import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

// ngx-echart
import { EChartsOption } from 'echarts';

// ngrx
import { Store } from '@ngrx/store';
import * as playersActions from '../../../players/store/players.actions';

// model
import { IMatch, IMatchData } from 'src/app/matches/model/match';

@Component({
  selector: 'app-calendar-chart',
  templateUrl: './calendar-chart.component.html',
  styleUrls: ['./calendar-chart.component.scss']
})
export class CalendarChartComponent implements OnInit {
  @Input() data: any;
  chartOption: EChartsOption;

  chartHeight: number;

  // chart calendar common setting
  yareMonthOPtion = {
    itemStyle: {
      color: 'rgb(0 0 0 / 20%)',
      borderColor: 'rgb(26 43 62)',
    },
    splitLine: {
      lineStyle: {
        color: 'rgba(0, 0, 0, 1)',
        width: 2
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

  minYear: number;
  maxYear: number;


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
      calendar: this.calCalendar(2013, 2021),
      series:  this.calSeriesData(this.data)
    };

  }

  calCalendar(minYear, maxYear): any {
    const calendar = [];
    const yearLength = maxYear - minYear + 1;
    this.chartHeight = yearLength * 200 + 50;
    for (let i = 0; i < yearLength; i++) {
       calendar.push({
         ...this.yareMonthOPtion,
         range: maxYear - i + '',
         top: i * 200 + 75
       });
    }
    return calendar;
  }
  // parse input data with same date
  // how many item for same date
  // how win item for sam data
  parseData(data): any {
    const arr = [];
    const objTotal = {};
    const objWins = {};
    const objLose = {};
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < data.length; i++) {
      const item = new Date(data[i].start_time *　1000).toISOString().slice(0, 10);
      objTotal[item] = (objTotal[item] + 1) || 1;

      if ((data[i].player_slot <= 120 && data[i].radiant_win) || (data[i].player_slot > 120 && !data[i].radiant_win)) {
              // winning
              objWins[item] = (objWins[item] + 1) || 1;
            } else {
    //           lose
              objLose[item] = (objLose[item] + 1) || 1;
            }
            // obj[item] = (obj[item] + 1) || 1
  }

    // list all date
    const objTotalKeys = Object.keys(objTotal);

    for (let k = 0; k < Object.entries(objTotal).length; k++) {
      // if that date is 0 win then all will be lose, so first verify whether that date has win matches or not
      if (objWins[objTotalKeys[k]] !== undefined) {
        arr.push([
          ...Object.entries(objTotal)[k],
          objWins[objTotalKeys[k]],
          +Object.entries(objTotal)[k][1] - objWins[objTotalKeys[k]],
          objWins[objTotalKeys[k]] / +Object.entries(objTotal)[k][1]
        ]);
      } else {
        arr.push([
          ...Object.entries(objTotal)[k],
          0, Object.entries(objTotal)[k][1],
          0
        ]);
      }
    }
    //  date, total, win, lose, pecent
    // [["2021-02-22", 1, 0, 1, 0],["2021-02-21", 3, 1, 2, 0.3333333333333333]]
    return arr;
  }

  // loop the series
  calSeriesData(data): any {
    const calendar = this.calCalendar(2013, 2021);
    const series = [];
    for (let i = 0; i < calendar.length; i++) {
      series.push({
        type: 'scatter',
        coordinateSystem: 'calendar',
        data: this.parseData(data),
        calendarIndex: i,
        symbolSize(val): any {
          if (val[1] > 10) {
            return val[1];
          } else {
            return val[1] * 2;
          }
        }
      });
    }
    return series;
  }


}
