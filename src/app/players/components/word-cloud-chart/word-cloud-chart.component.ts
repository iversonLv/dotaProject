import { Component, Input, OnInit } from '@angular/core';

// ngx-echart
import { EChartsOption } from 'echarts';

@Component({
  selector: 'app-word-cloud-chart',
  templateUrl: './word-cloud-chart.component.html',
  styleUrls: ['./word-cloud-chart.component.scss']
})
export class WordCloudChartComponent implements OnInit {
  @Input() data: any;
  chartOption: EChartsOption;
  constructor() { }

  ngOnInit(): void {
    this.chartOption = {
      series: [{
        itemStyle: {
          borderColor: 'black'
        },
        width: '100%',
        roam: false,
        height: '100%',
        type: 'treemap',
        data: this.data
      }]
    };
  }


}
