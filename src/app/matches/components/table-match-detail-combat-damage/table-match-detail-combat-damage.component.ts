import { Component, Input, OnInit } from '@angular/core';
import { IheroLocal } from 'src/app/heros/model/heroLocal';

@Component({
  selector: 'app-table-match-detail-combat-damage',
  templateUrl: './table-match-detail-combat-damage.component.html',
  styleUrls: ['./table-match-detail-combat-damage.component.scss']
})
export class TableMatchDetailCombatDamageComponent implements OnInit {
  @Input() data: any;
  @Input() heroesLocal: IheroLocal;
  constructor() { }

  ngOnInit(): void {
  }

}
