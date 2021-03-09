import { Component, Input, OnInit } from '@angular/core';
import { EChartsOption } from 'echarts';

@Component({
  selector: 'app-ward-map-chart',
  templateUrl: './ward-map-chart.component.html',
  styleUrls: ['./ward-map-chart.component.scss']
})
export class WardMapChartComponent implements OnInit {
  @Input() data: any;
  chartOption: EChartsOption;
  constructor() { }

  ngOnInit(): void {
    this.chartOption = {
      grid: {
        height: '100%',
        width: '100%',
        top: '0',
        left: '0',
      },
      visualMap: {
        show: false,
          min: this.data.min,
          max: this.data.max,
          inRange: {
              color: ['rgba(0,0,255, .2)', 'green', 'red']
          }
      },
      xAxis: {
          show: false,
          position: 'top',
          type: 'category',
          min: 0,
          data: this.generateXYData()[0],
          splitArea: {
              show: false
          }
      },
      yAxis: {
          show: false,
          min: 0,
          type: 'category',
          data: this.generateXYData()[1],
          inverse: true,
          splitArea: {
              show: false
          }
      },
      series: [{
          type: 'scatter',
          data: this.data.data,
      }]
    };
  }

  generateXYData(): any[] {
    const x = [];
    const y = [];
    for (let i = 0; i < 901; i++) {
      x.push(i);
      y.push(i);
    }
    return [x, y];
  }


}
