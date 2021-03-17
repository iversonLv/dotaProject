import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';

// material
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

// model
import { IheroLocal } from 'src/app/heros/model/heroLocal';

@Component({
  selector: 'app-table-match-detail-overview',
  templateUrl: './table-match-detail-overview.component.html',
  styleUrls: ['./table-match-detail-overview.component.scss']
})
export class TableMatchDetailOverviewComponent implements OnInit {
  @Input() data: any;
  @Input() dataRange: number[]; // because the table need calculate the largest number and show under line style
  @Input() playerColorLocal: any;
  @Input() heroesLocal: IheroLocal;
  @Input() itemIdsLocal: any;
  @Input() itemsLocal: any;
  @Input() abilitiesTalentsLocal: any;
  @Input() permanentBuffsLocal: any;
  @Output() showItemModalFn: any = new EventEmitter();
  @Output() hideItemModalFn: any = new EventEmitter();
  @Output() showAbilityModalFn: any = new EventEmitter();
  @Output() hideAbilityModalFn: any = new EventEmitter();

  @ViewChild(MatSort) set matSort(mp: MatSort) {
    this.sort = mp;
    this.setDataSourceAttributes();
  }

  dataSource = new MatTableDataSource();

  displayedColumns: string[] = [
    'player_slot',
    'level',
    'hero_kills',
    'deaths',
    'assists',
    'last_hits',
    'denies',
    'net_worth',
    'gold_per_min',
    'xp_per_min',
    'hero_damage',
    'tower_damage',
    'hero_healing',
    'items',
    'item_neutral',
    'aghanims',
    'permanent_buffs',
  ];

  sort;
  finalData = [];
  constructor() { }

  ngOnInit(): void {
    // extract the data
    this.dataSource.data = this.extractData(this.data.slice(this.dataRange[0], this.dataRange[1]));
  }

  // extract matches players[] to less data to meet for this page table
  extractData(data): any[] {
    data.forEach(z => {
      const { hero_id, player_slot, pred_vict, account_id, rank_tier, name, personaname,
        level, hero_kills, deaths, assists, last_hits, denies, net_worth,
        gold_per_min, xp_per_min, hero_damage, tower_damage, hero_healing, item_neutral, permanent_buffs,
        item_0, item_1, item_2, item_3, item_4, item_5,
        backpack_0, backpack_1, backpack_2, backpack_3,
        item_usage, purchase, purchase_time, item_win  } = z;

      this.finalData.push({
        hero_id,
        pred_vict,
        player_slot,
        account_id,
        rank_tier,
        name,
        personaname,
        // above is common data for player
        level,
        hero_kills,
        deaths,
        assists,
        last_hits,
        denies,
        net_worth,
        gold_per_min,
        xp_per_min,
        hero_damage,
        tower_damage,
        hero_healing,
        item_neutral,
        permanent_buffs,
        items: [item_0, item_1, item_2, item_3, item_4, item_5],
        backpack: [backpack_0, backpack_1, backpack_2, backpack_3],
        item_usage,
        purchase,
        purchase_time,
        item_win,
      });
    });

    return this.finalData;
  }
  // set table sort
  setDataSourceAttributes(): any {
    this.dataSource.sort = this.sort;
  }

  calTotal(data: any, field: string): any {
    if (data.filter(i => i[field] !== '-').length !== 0) {
      const totalNum =  data.filter(i => i[field] !== '-').map(i => i[field]).reduce((cur, total) => cur + total, 0);
      return totalNum === 0 ? '-' : totalNum;
    } else {
      return '-';
    }

  }

  calPerfectData(data: any, field: string, min: string = ''): number {
    if (!min) {
      return Math.max(...data.map(item => item[field]));
    } else {
      return Math.min(...data.map(item => item[field]));
    }
  }

  // whether show back pack list
  whetherShowBackPackList(data): boolean {
    if (data.filter(i => i === 0).length === 3) {
      return false;
    } else {
      return true;
    }
  }

  // whether show scepter or shard
  // permanent buff list, scepter id is 2, shard id is 12
  whetherShowScepterShard(data: any, permanentBuffScepterShardId: number): boolean {
    if (data) {
      return data.filter(i => i.permanent_buff === permanentBuffScepterShardId).length > 0;
    }
  }

}
