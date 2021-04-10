import { Component, Input, OnInit } from '@angular/core';

// ngx-echart
import * as echarts from 'echarts';



@Component({
  selector: 'app-world-population-chart',
  templateUrl: './world-population-chart.component.html',
  styleUrls: ['./world-population-chart.component.scss']
})
export class WorldPopulationChartComponent implements OnInit {
  @Input() data: any;
  @Input() countryDataLocal: any;
  @Input() latlongLocal: any;
  @Input() worldLocal: any;
  chartOption: echarts.EChartsOption;


  constructor() { }

  max = -Infinity;
  min = Infinity;
  mapData;

  ngOnInit(): void {
    echarts.registerMap('world', this.worldLocal);
    const hasCountryCode = this.extracthasCountryData(this.data);
    const contryCodeList = this.extractCountryCodeList(hasCountryCode);
    this.mapData = this.extractData(hasCountryCode, contryCodeList, this.countryDataLocal, this.latlongLocal);
    this.calPerfectData(this.mapData);
    this.chartOption = {
      backgroundColor: '#1a2b3e',
      title : {
          text: `${hasCountryCode.length} of ${this.data.length} pro players in our Dota2 World`,
          left: 'center',
          top: 30,
          textStyle: {
              color: '#fff'
          }
      },
      tooltip : {
          trigger: 'item',
          formatter: (params) => {
            return `<div  style="background-color: rgba(0, 0, 0, 1); margin: -12px; color: rgba(255, 255, 255); font-size:13px; padding: 12px">
            ${params.name} : ${params.value[2]}
            </div>`;
          }
      },
      visualMap: {
          show: false,
          min: this.min,
          max: this.max,
          inRange: {
            symbolSize: [this.min, this.max],
            color: ['green', 'yellow'],
          }
      },
      geo: {
        name: 'Dota2 World Players (pro)',
        left: 30, top: 90, right: 30, bottom: 30,
        type: 'map',
        map: 'world',
        roam: true,
        emphasis: {
            label: {
              show: false
            },
            itemStyle: {
              areaColor: '#E29B01'
            }
        },
        label: {
          show: false,
        },
        itemStyle: {
          areaColor: '#b8b6b4'
        },
      },
      series : [
        {
          type: 'scatter',
          coordinateSystem: 'geo',
          data: this.extractSeriesData(this.mapData)
        }
      ]
    };
  }

  extractData(players: any[], contryCodeList: any, countryDataLocal: any, latlongLocal: any): any[] {
    const arr = [];
    contryCodeList.forEach(code => {
      const newPlayers = players.filter(player => player.country_code === code);
      const c = code.toUpperCase();
      arr.push({
        code,
        ...latlongLocal[c],
        name: countryDataLocal[c]?.name?.common,
        value: newPlayers.length,
        players: newPlayers
      });
    });
    return arr;
  }

  calPerfectData(data: any): void {
    data = data.map(i => i.value);
    this.max = Math.max(...data);
    this.min = Math.min(...data);
  }

  extractSeriesData(data: any): any {
    return data.map((itemOpt) => {
      return {
          name: itemOpt.name,
          value: [
              itemOpt.longitude,
              itemOpt.latitude,
              itemOpt.value,
          ],
      };
    });
  }

  // some players does not have country code, filter them
  extracthasCountryData(data: any[]): any[] {
    return data.filter(i =>  i.country_code !== '');
  }

  // extract unique country code from the players arr
  extractCountryCodeList(data: any[]): any[] {
    data = data.map(i => i.country_code);
    data = [...new Set(data)];
    return data;
  }

}
