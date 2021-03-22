import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { IheroLocal } from 'src/app/heros/model/heroLocal';

@Component({
  selector: 'app-table-match-detail-last-hits',
  templateUrl: './table-match-detail-last-hits.component.html',
  styleUrls: ['./table-match-detail-last-hits.component.scss']
})
export class TableMatchDetailLastHitsComponent implements OnInit {
  @Input() data: any;
  @Input() playerColorLocal: any;
  @Input() heroesLocal: IheroLocal;
  @ViewChild(MatSort) set matSort(mp: MatSort) {
    this.sort = mp;
    this.setDataSourceAttributes();
  }

  lastHitTimeList: string[] = [];

  dataSource = new MatTableDataSource();
  displayedColumns: string[] = [
    'player_slot'
  ];

  sort;
  finalData = [];
  constructor() { }

  ngOnInit(): void {
    this.lastHitTimeList = this.calLastHitData(this.data[0].lh_t);
    this.displayedColumns.push(...this.lastHitTimeList.slice(1));
    // extract the data
    this.dataSource.data = this.extractData(this.data);
  }
  // extract matches players[] to less data to meet for this page table
  extractData(data): any[] {
    data.forEach(z => {
      const { hero_id, player_slot, pred_vict, account_id, rank_tier, name, personaname,
        lh_t  } = z;

      this.finalData.push({
        hero_id,
        pred_vict,
        player_slot,
        account_id,
        rank_tier,
        name,
        personaname,
        // above is common data for player
        ...this.extractLastHit(lh_t)
      });
    });
    return this.finalData;
  }

  // set table sort
  setDataSourceAttributes(): any {
    this.dataSource.sort = this.sort;
  }

  extractLastHit(data): any {
    const finalObj = {
      value: null,
      key: null,
      increase: null
    };
    const final = {};
    this.lastHitTimeList.slice(1).forEach(x => {
      finalObj.value = data[x];
      finalObj.key = x;
      finalObj.increase = data[x] - data[+x - 5];
      final[x] = {...finalObj};
    });
    return final;
  }

  // cal last hit bottom total
  calTotalData(data: any, field: string, time: number): any {
    if (data.filter(i => i[field]).length !== 0) {
      const totalNum =  data.map(i => i[field][time]).reduce((cur, total) => cur + total, 0);
      return totalNum === 0 ? '-' : totalNum;
    } else {
      return '-';
    }
  }

  // cal perfect data only for one level sub field for bar chart
  calPerfectData(data: any, field: string, time: number, min: string = ''): number {
    const dataField = data.map(item => item[field][time]).filter(i => i !== undefined);
    if (!min) {
      return Math.max(...dataField);
    } else {
      return Math.min(...dataField);
    }
  }

  // calLastHitData
  calLastHitData(data: any): string[] {
    const lastHitRange = [];
    const len = Math.floor(data.slice(1).length / 5);
    for (let i = 0; i <= len; i++) {
      lastHitRange.push(i * 5 + '');
    }
    return lastHitRange;
  }

}
