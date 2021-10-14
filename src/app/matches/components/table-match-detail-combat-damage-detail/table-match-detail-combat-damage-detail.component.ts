import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { IheroLocal } from 'src/app/heros/model/heroLocal';

@Component({
  selector: 'app-table-match-detail-combat-damage-detail',
  templateUrl: './table-match-detail-combat-damage-detail.component.html',
  styleUrls: ['./table-match-detail-combat-damage-detail.component.scss']
})
export class TableMatchDetailCombatDamageDetailComponent implements OnInit {
  @Input() data: any;
  @Input() playerColors: any;
  @Input() heroes: IheroLocal;

  @Input() heroNames: IheroLocal;
  @Input() itemIds: any;
  @Input() items: any;
  @Input() abilities: any;
  @Output() showItemModalFn: any = new EventEmitter();
  @Output() hideItemModalFn: any = new EventEmitter();
  @Output() showAbilityModalFn: any = new EventEmitter();
  @Output() hideAbilityModalFn: any = new EventEmitter();
  // above is common player column
  @ViewChild(MatSort) set matSort(mp: MatSort) {
    this.sort = mp;
    this.setDataSourceAttributes();
  }
  dataSource = new MatTableDataSource();

  displayedColumns: string[] = [
    'player_slot',
    'dealt',
    'received'
  ];
  sort;
  constructor() { }

  ngOnInit(): void {
     // extract the data
     this.dataSource.data = this.extractData(this.data);
  }
  // extract matches players[] to less data to meet for this page table
  extractData(data): any[] {
    const finalData = [];
    data.forEach(z => {
      const { hero_id, player_slot, randomed, pred_vict, account_id, rank_tier, name, personaname,
        damage_inflictor_received, damage_targets, damage_inflictor } = z;
      finalData.push({
        hero_id,
        pred_vict,
        player_slot,
        account_id,
        rank_tier,
        name,
        randomed,
        personaname,
        // above is common data for player
        damage_inflictor_received: this.extractObjToArry(damage_inflictor_received),
        damage_inflictor: this.extractObjToArry(damage_inflictor),
        damage_targets,
      });
    });

    return finalData;
  }

  // set table sort
  setDataSourceAttributes(): any {
    this.dataSource.sort = this.sort;
  }

  extractObjToArry(data: any): any[] {
    const arr = [];
    Object.keys(data).forEach(key => {
      arr.push({
        key,
        value: data[key]
      });
    });
    return arr.sort((a, b) => b.value - a.value);
  }

}
