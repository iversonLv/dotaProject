import { Component, Input, OnInit } from '@angular/core';

// echart
import { EChartsOption } from 'echarts';

// model
import { IheroLocal } from 'src/app/heros/model/heroLocal';

// pipe
import { GreaterNumPipe } from '../../../shared/utils/greater-num.pipe';

@Component({
  selector: 'app-chart-stack-bar',
  templateUrl: './chart-stack-bar.component.html',
  styleUrls: ['./chart-stack-bar.component.scss'],
  providers: [GreaterNumPipe]
})
export class ChartStackBarComponent implements OnInit {
  @Input() data: any;
  @Input() heroes: IheroLocal;
  @Input() field;
  @Input() mapping;
  chartOption: EChartsOption;

  constructor(
    private greaterNum: GreaterNumPipe
  ) { }

  ngOnInit(): void {
    this.chartOption = {
      xAxis: {
        axisLine: { onZero: true },
        splitArea: { show: false },
        boundaryGap: true, // don't let the first bar beginning from 0
        splitLine: { show: true, lineStyle: { color: 'rgba(184, 182, 180, .6)'} },
        data: this.calXData(this.data, this.field),
        axisLabel: {
          formatter(value): any {
              return '{' + value + '| }\n{value|}';
          },
          rich: {
            ...this.calXDataRich(this.data, this.field, this.heroes)
          }
        },
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'shadow'
        },
        formatter(params): any {
          let str = '';
          params.forEach(i => {
            return str += `
            <div class="tooltip-item-row" style="color: ${i.color};">
              <span>${i.seriesName}</span> <span>${i.value}</span>
            </div>`;
          });
          return str;
        }
      },
      yAxis: {},
      series: this.calSeriesData(this.data, this.field, this.mapping),
    };
  }

  // here we sort the players base on their gold_reasons/xp_reasons
  // sum all gold_reasons/xp_reasons then sort them
  calSort(players: any, filed: string): any {
    const d = [...players];
    const newArr = [];
    d.forEach(i => {
      const forSort = Object.values(i[filed]).filter(x => x !== undefined).reduce((cur, total) => +cur + +total, 0);
      // push existing players data and new key forSort which for sort base
      return newArr.push({...i, forSort});
    });
    // sort the new data array base on the sum forSort value
    newArr.sort((a, b) => b.forSort - a.forSort);
    return newArr;
  }

  calXData(data: any, field: string): string[] {
    const xData = [];
    this.calSort(data, field).map(i => i.hero_id).forEach(i => xData.push(i));
    return xData;
  }

  // for xAxis hero image
  calXDataRich(data, field, heroes): any {
    const xDataRich = {};
    this.calXData(data, field).forEach(x => {
      const heroImg = heroes[x].img;
      const img = {
        image: null
      };
      const bg = {
        backgroundColor: null
      };
      img.image = `https://steamcdn-a.akamaihd.net/${heroImg}`;
      bg.backgroundColor = {...img};
      xDataRich[x] = {...bg,
        height: 40,
        align: 'center'};
    });
    return xDataRich;
  }

  calSeriesData(players: any[], field: string, mapping: any): any[] {
    const seriesData = [];

    const resson = this.calSort(players, field).map(i => i[field]);

    Object.keys(mapping).forEach(i => {
      const seriesItem = {
        stack: null,
        data: [],
        type: 'bar',
        name: null,
        color: null,
      };
      resson.forEach(x => {
        if (x[i] !== undefined) {
          return seriesItem.data.push(x[i]);
        }
      });

      seriesItem.name = mapping[i].title;
      seriesItem.color = mapping[i].color;
      if (mapping[i].title === 'death') {
          seriesItem.stack = 'two';
      } else {
        seriesItem.stack = 'one';
      }
      seriesData.push(seriesItem);
    });

    return seriesData;
  }

}
