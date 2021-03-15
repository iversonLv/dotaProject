import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss']
})
export class BarChartComponent implements OnInit {
  @Input() data: number[] = [266, 160, 3];
  // new feature, some data is more bigger, more worse, example match detail page performance dead column, long dead time is worse
  @Input() longIsBad = false;

  kdaColor: string[] = ['rgb(102, 187, 106)', 'rgb(255, 76, 76)', 'rgb(124, 153, 168)'];
  constructor(
  ) { }

  ngOnInit(): void {
  }

  calDataTotal(data): number {
    const total = data.reduce((c, t) => c + t, 0);
    return total;
  }

  calColor(i): string {
    switch (i) {
      case 0:
        return 'green';
      case 1:
        return  'red';
      default:
        return 'rgb(124, 153, 168)';
    }
  }

}




