import { Component, Input, OnInit } from '@angular/core';
import { IheroLocal } from 'src/app/heros/model/heroLocal';

import { ISingleMatchPickBand } from '../../model/onematch';

@Component({
  selector: 'app-band-pick-list',
  templateUrl: './band-pick-list.component.html',
  styleUrls: ['./band-pick-list.component.scss']
})
export class BandPickListComponent implements OnInit {
  @Input() data: ISingleMatchPickBand[];
  // User for hero modal to mapping
  @Input() heroesLocal: IheroLocal;
  constructor() { }

  ngOnInit(): void {
  }

}
