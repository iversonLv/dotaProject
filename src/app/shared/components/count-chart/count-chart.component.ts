import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-count-chart',
  templateUrl: './count-chart.component.html',
  styleUrls: ['./count-chart.component.scss']
})
export class CountChartComponent implements OnInit {
  @Input() title = 'test';
  @Input() data = {
    games: 3110,
    win: 1380
  };

  constructor() { }

  ngOnInit(): void {
  }

  cal(data): any {
    const a = 117.75 - 117.75 * data.win / data.games;
    return [a, 236.25];
  }
  calColor(data): any {
    const red = (255 - 255 * data.win / data.games).toFixed(1);
    const green = (255 * data.win / data.games).toFixed(1);
    const finalColor = `rgb(${red}, ${green}, 0)`;
    return finalColor;
  }

}
