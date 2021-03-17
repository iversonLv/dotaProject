import { Component, Input, OnInit } from '@angular/core';
import { EChartsOption } from 'echarts';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss']
})
export class PieChartComponent implements OnInit {
  @Input() data: number[]; // example: level: 10, maxLevel: 25, so input data [10, 25]
  chartOption: EChartsOption;
  constructor() { }

  ngOnInit(): void {
    this.chartOption = {
      series: [
          {
              silent: true, // hover on the chart no animation
              type: 'pie',
              top: 0,
              left: 0,
              width: 30,
              height: 30,
              animation: false,
              radius: ['12', '15'],
              label: {
                  formatter: '{c}',
                  show: true,
                  fontSize: 10,
                  color: '#b8b6b4',
                  position: 'center'
              },
              data: [
                  {value: this.data[0], itemStyle: { color: '#b8b6b4'}},
                  {value: (this.data[1] - this.data[0]),  itemStyle: { opacity: 0 }, label: { show: false }},
              ]
          }
      ]
    };
  }

}
