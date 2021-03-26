import { Component, Input, OnInit } from '@angular/core';

// echart
import { EChartsOption } from 'echarts';

// model
import { IheroLocal } from 'src/app/heros/model/heroLocal';

@Component({
  selector: 'app-chart-statck-line',
  templateUrl: './chart-statck-line.component.html',
  styleUrls: ['./chart-statck-line.component.scss']
})
export class ChartStatckLineComponent implements OnInit {
  @Input() data: any;
  @Input() playerColorLocal: any;
  @Input() heroesLocal: IheroLocal;
  @Input() heroesNameLocal: any;
  @Input() field;
  chartOption: EChartsOption;
  constructor() { }

  ngOnInit(): void {
    this.chartOption = {
      xAxis: {
        splitLine: { show: true, lineStyle: { color: 'rgba(184, 182, 180, .6)'} },
        axisLine: { onZero: true },
        boundaryGap: false,
        data: this.calXData(this.data, this.field),
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
            let str = `<div style="background-color: rgba(0, 0, 0, 1); margin: -12px; color: rgba(255, 255, 255); font-size:13px; padding: 12px">
            <header style="text-transform: capitalize; margin: -12px -12px 12px; text-align: center; background-color: white; color: black;">${params[0].name}</header>
            `;
            params.sort((a, b) => b.value - a.value).forEach(i => {
              return str += `
              <div class="tooltip-item-row ${i.data.content.isRadiant ? 'is-radiant' : ''}" style="color: white; border-color: ${i.color}">
                <div>
                  <span>${i.data.content.hero}:</span>
                </div>
                <span>${i.value}</span>
              </div>`;
            });
            str += `</div>`;
            return str;
          }

          // <img src="https://steamcdn-a.akamaihd.net/${i.data.content.heroImg}" />
      },
      legend: {
        itemWidth: 32,
        itemHeight: 32,
        data: this.calLegendData(this.data, this.playerColorLocal, this.heroesLocal),
        bottom: '0%',
        inactiveColor: '#b8b6b4'
      },
      yAxis: {},
      series: this.calSeriesData(this.data, this.field, this.playerColorLocal, this.heroesLocal),
    };
  }

  // cal xAxis hero name
  calXData(data: any, field: string): string[] {
    const xData = [];
    const d = [...data];
    for (let i = 0; i < d[0][field].length; i++) {
      xData.push(i + ':00');
    }
    return xData;
  }

  // cal ledgen
  calLegendData(data: any, playerColorLocal: any, heroesLocal: IheroLocal): string[] {
    const legendData = [];
    data.map(i => {
      const legend = {
        icon: null,
        name: null,
        color: null,
        textStyle: {
          color: null,
        },
      };
      const playerName = this.calPlayerName(i);
      legend.name = playerName;
      legend.icon = `image://https://steamcdn-a.akamaihd.net/${heroesLocal[i.hero_id].icon}`;
      legend.textStyle.color = playerColorLocal[i.player_slot];

      legendData.push(legend);
    });
    return legendData;
  }

  calSeriesData(data: any[], field: string, playerColorLocal: any, heroesLocal: IheroLocal): any {
    const seriesData = [];

    data.forEach(player => {
      const seriesItem = {
        data: [],
        type: 'line',
        color: null,
        symbol: 'none',
        name: null,
        smooth: true,
        animation: false,
        emphasis: {
          focus: 'series'
        },
        silent: true,
        legendHoverLink: true
      };
      const playerName = this.calPlayerName(player);
      seriesItem.color = playerColorLocal[player?.player_slot];
      seriesItem.name = playerName;

      const heroImg = heroesLocal[player.hero_id].icon;
      const hero = heroesLocal[player.hero_id].localized_name;
      const isRadiant = player.isRadiant;
      player[field].forEach(i => {
        seriesItem.data.push({
          value: i,
          content: {
            heroImg,
            isRadiant,
            playerName,
            hero,
          }
        });
      });

      seriesData.push(seriesItem);
    });
    return seriesData;
  }

  calPlayerName(player: any): string {
    const { name, personaname, player_slot } = player;
    if (!name) {
      if (!personaname) {
        return `Anonymous ${player_slot}`;
      } else {
        return personaname;
      }
    } else {
      return name;
    }
  }

}
