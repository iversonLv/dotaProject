import { Component, Input, OnInit } from '@angular/core';

// ngx-echart
import { EChartsOption } from 'echarts';

// pipe
import { NameDestructPipe } from '../../../shared/utils/name-destruct.pipe';
import { DurationFormatPipe } from '../../../shared/utils/duration-format.pipe';
import { DateTillTodayPipe } from '../../../shared/utils/date-till-today.pipe';

// model
import { ITrend } from '../../model/trend';
import { IheroLocal } from 'src/app/heros/model/heroLocal';

@Component({
  selector: 'app-trends-chart',
  templateUrl: './trends-chart.component.html',
  styleUrls: ['./trends-chart.component.scss'],
  providers: [NameDestructPipe, DurationFormatPipe, DateTillTodayPipe]
})
export class TrendsChartComponent implements OnInit {
  @Input() data: ITrend[];
  @Input() fieldDescription: string;
  @Input() field: string;
  @Input() heroes: IheroLocal;
  @Input() gameMode: any;
  chartOption: EChartsOption;

  constructor(
    private nameDestruct: NameDestructPipe,
    private durationFormat: DurationFormatPipe,
    private dateTillToday: DateTillTodayPipe,
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
          data: [`${this.nameDestruct.transform(this.field, '_', 0, 'upperCase')} ${this.fieldDescription !== '' ? '(' + this.fieldDescription + ')' : ''}`],
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
            const result = (player_slot > 120 && !radiant_win) || (player_slot <= 120 && radiant_win) ? 'Won Match' : 'Lost Match';
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

                <img
                onError="this.src='./assets/images/Dota2Logo.svg'"
                width="93" height="52"
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
          name: `${this.nameDestruct.transform(this.field, '_', 0, 'upperCase')} ${this.fieldDescription !== '' ? '(' + this.fieldDescription + ')' : ''}`,
          data: this.calSeriesData(this.data, this.field, this.heroes, this.gameMode),
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

  calSeriesData(data: ITrend[], field, heroes, gameMode): string[] {
    // console.log(field, hero, gameMode)
    const seriesData = [];
    const d = [...data];
    // d.sort((a, b) => a.duration_bin - b.duration_bin);
    for (const i in d) {
      if (d.hasOwnProperty(i)) {
        const { game_mode, hero_id, duration, start_time } = d[i];
        const value = d[i][field];
        // rgb('+ (255 - 255 * data[1] / data[0]) +', ' + 255 * data[1] / data[0] + ', 0)'
        const gameModeName = this.nameDestruct.transform(gameMode[game_mode].name, '_', 2);
        const heroImg = heroes[hero_id].img;
        const durationFormat = this.durationFormat.transform(duration);
        const tillToday = this.dateTillToday.transform(start_time * 1000);
        const fieldT = this.nameDestruct.transform(this.field, '_', 0, 'upperCase');
        seriesData.push({
          value,
          content: { ...d[i], field: fieldT, heroImg, gameModeName, durationFormat, tillToday  }
        });
      }
    }
    return seriesData;
  }

}
