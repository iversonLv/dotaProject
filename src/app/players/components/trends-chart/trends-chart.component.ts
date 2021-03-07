import { Component, Input, OnInit } from '@angular/core';

// ngx-echart
import { EChartsOption } from 'echarts';

// model
import { ITrend } from '../../model/trend';
import { IheroLocal } from 'src/app/heros/model/heroLocal';

// service
import { HerosService } from 'src/app/heros/services/heros.service';
import { GameModeService } from 'src/app/services/game-mode.service';

@Component({
  selector: 'app-trends-chart',
  templateUrl: './trends-chart.component.html',
  styleUrls: ['./trends-chart.component.scss']
})
export class TrendsChartComponent implements OnInit {
  @Input() data: ITrend[];
  @Input() fieldDescription: string;
  @Input() field: string;
  @Input() hero: IheroLocal;
  @Input() gamemode: any;
  chartOption: EChartsOption;

  constructor(
  ) { }

  ngOnInit(): void {

    this.chartOption = {
      xAxis: {
          type: 'category',
          boundaryGap: true, // don't let the first bar beginning from 0
          splitLine: { show: true, lineStyle: { color: 'rgba(184, 182, 180, .6)'} },
          data: this.calXData(this.data)
      },
      legend: {
          data: [`${this.nameDestruct(this.field, '_', 0, 'upperCase')} ${this.fieldDescription !== '' ? '(' + this.fieldDescription + ')' : ''}`],
          textStyle: {
              color: 'white'
          }
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'shadow'        // default line, type：'line' | 'shadow'
        },
        formatter(params): any {
          // console.log(params[0])
          if (params[0].value > 0) {
            const  { field, heroImg, gameModeName, durationFormat, tillToday, player_slot, radiant_win } = params[0].data.content;
            const result = (player_slot > 4 && !radiant_win) || (player_slot <= 4 && radiant_win) ? 'Won Match' : 'Lost Match';
            return `
            <div style="background-color: rgba(0, 0, 0, 1); margin: -12px; color: rgba(255, 255, 255); font-size:13px; padding: 12px">
              <header style="text-transform: capitalize; margin: -12px -12px 12px; text-align: center; background-color: white; color: black;">${field}</header>
              <div style="display: flex; justified-content: space-arround;">
                <div style="padding-right: 10px">
                  <div style="color: ${result === 'Won Match' ? 'rgb(102, 187, 106)' : 'rgb(255, 76, 76)'};">${result} <span style="font-size:11px; color: white">${tillToday}</span></div>
                  <div style="text-transform: capitalize;">${gameModeName}</div>
                  <div>${durationFormat}</div>
                  <div><span style="text-transform: capitalize; font-weight: bold;">${field}:</span> ${params[0].data.value}</div>
                </div>

                <img width="93" height="52"
                  src="https://steamcdn-a.akamaihd.net/${heroImg}"
                  (mouseover)="showHeroModalFn($event, element.hero_id)" (mouseout)="showHeroModal=false; currentMouseOverHero = null"
                />
              </div>
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
      series: [{
          name: `${this.nameDestruct(this.field, '_', 0, 'upperCase')} ${this.fieldDescription !== '' ? '(' + this.fieldDescription + ')' : ''}`,
          data: this.calSeriesData(this.data, this.field, this.hero, this.gamemode),
          type: 'line',
      }],
    };
  }

  calXData(data): string[] {
    const xData = [];
    // trends x will be the 1000 matches
    // d.sort((a, b) => a.duration_bin - b.duration_bin); // show the bar order as duration_bin
    for (let i = 0; i < data.length; i++) {
        xData.push(i);
    }
    return xData;
  }

  calSeriesData(data: ITrend[], field, hero, gamemode): string[] {
    // console.log(field, hero, gamemode)
    const seriesData = [];
    const d = [...data];
    // d.sort((a, b) => a.duration_bin - b.duration_bin);
    for (const i in d) {
      if (d.hasOwnProperty(i)) {
        const { game_mode, hero_id, duration, start_time } = d[i];
        const value = d[i][field];
        // rgb('+ (255 - 255 * data[1] / data[0]) +', ' + 255 * data[1] / data[0] + ', 0)'
        const gameModeName = this.nameDestruct(gamemode[game_mode].name, '_', 2);
        const heroImg = hero[hero_id].img;
        const durationFormat = this.durationFormat(duration);
        const tillToday = this.tillToday(start_time * 1000);
        const fieldT = this.nameDestruct(this.field, '_', 0, 'upperCase');
        seriesData.push({
          value,
          content: { ...d[i], field: fieldT, heroImg, gameModeName, durationFormat, tillToday  }
        });
      }
    }
    return seriesData;
  }

  durationFormat(duration): string {
    const getMin = (duration / 60).toString().split('.')[0];
    let getSec = duration % 60 === 0 ? '00' : duration % 60;
    if (getSec < 10) {
      getSec = '0' + getSec + '';
    }
    return `${getMin}:${getSec}`;
  }

  tillToday(date): string {
    const today = (new Date()).toString();
    const todayParse = Date.parse(today);

    const lastPlayedTillToday = todayParse - date;

    const tillYears = lastPlayedTillToday / 1000 / 60  / 60 / 24 / 30 / 12;
    const tillMonths = lastPlayedTillToday / 1000 / 60  / 60 / 24 / 30;
    const tillDays = lastPlayedTillToday / 1000 / 60  / 60 / 24;
    const tillHours = lastPlayedTillToday / 1000 / 60  / 60;
    const tillMinutes = lastPlayedTillToday / 1000 / 60;

    if (date === 0 ) {
        return null;
      }
    if (tillYears >= 1 ) {
      if (Math.floor(tillYears) > 1) {
        return `${Math.floor(tillYears)} years ago`;
      } else {
        return 'a year ago';
      }
    } else if (tillMonths >= 1 ){
      if (Math.floor(tillMonths) > 1) {
        return `${Math.floor(tillMonths)} months ago`;
      } else {
        return 'a month ago';
      }
    } else if (tillDays >= 1) {
      if (Math.floor(tillDays) > 1) {
        return `${Math.floor(tillDays)} days ago`;
      } else {
        return 'a day ago';
      }
    } else if (tillHours >= 1) {
      if (Math.floor(tillHours) > 1) {
        return `${Math.floor(tillHours)} hours ago`;
      } else {
        return 'an hour ago';
      }
    } else if (tillMinutes  >= 1) {
      if (Math.floor(tillMinutes) > 1) {
        return `${Math.floor(tillMinutes)} minutes ago`;
      } else {
        return 'a minute ago';
      }
    }
    return null;
  }


  nameDestruct(value: string, separator: string, separatorPlacement: number, upperCase?: string): string {
    if (typeof(value) === 'string' && value !== null && value.split(separator).length > 1) {
      if (upperCase === 'upperCase') {
        return value.split(separator).splice(separatorPlacement).map(i => i.charAt(0).toUpperCase() + i.slice(1, i.length)).join(' ');
      } else {
        return value.split(separator).splice(separatorPlacement).join(' ');
      }
    } else {
      return value;
    }
  }


}
