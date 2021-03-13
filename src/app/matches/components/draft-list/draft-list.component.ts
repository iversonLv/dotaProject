import { Component, Input, OnInit } from '@angular/core';
import { IheroLocal } from 'src/app/heros/model/heroLocal';

// model
import { ISingleMatchPickBand, ISingleMatchTeam } from '../../model/onematch';

@Component({
  selector: 'app-draft-list',
  templateUrl: './draft-list.component.html',
  styleUrls: ['./draft-list.component.scss']
})
export class DraftListComponent implements OnInit {
  @Input() data: ISingleMatchPickBand[];
  @Input() radiantTeam: ISingleMatchTeam;
  @Input() direTeam: ISingleMatchTeam;
  // User for hero modal to mapping
  @Input() heroesLocal: IheroLocal;
  constructor() { }

  ngOnInit(): void {
  }

}
