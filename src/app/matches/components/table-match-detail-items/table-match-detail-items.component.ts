import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { IheroLocal } from 'src/app/heros/model/heroLocal';

@Component({
  selector: 'app-table-match-detail-items',
  templateUrl: './table-match-detail-items.component.html',
  styleUrls: ['./table-match-detail-items.component.scss']
})
export class TableMatchDetailItemsComponent implements OnInit {
  @Input() data: any;
  @Input() playerColors: any;
  @Input() heroes: IheroLocal;

  @Input() items: any;
  @Output() showItemModalFn: any = new EventEmitter();
  @Output() hideItemModalFn: any = new EventEmitter();

  @Input() enableConsumable;  // This is to control whether show purchase consumable items
  @ViewChild(MatSort) set matSort(mp: MatSort) {
    this.sort = mp;
    this.setDataSourceAttributes();
  }

  timeList: string[] = [];

  dataSource = new MatTableDataSource();
  displayedColumns: string[] = [
    'player_slot'
  ];

  sort;
  finalData = [];
  constructor() { }

  ngOnInit(): void {
    this.timeList = this.calTimeRangeData(this.data[0].purchase_log);
    this.displayedColumns.push(...this.timeList);
    // extract the data
    this.dataSource.data = this.extractData(this.data);
  }

  // extract matches players[] to less data to meet for this page table
  extractData(data): any[] {
    data.forEach(z => {
      const { hero_id, player_slot, pred_vict, randomed, account_id, rank_tier, name, personaname,
        purchase_log  } = z;

      this.finalData.push({
        hero_id,
        pred_vict,
        player_slot,
        account_id,
        rank_tier,
        randomed,
        name,
        personaname,
        // above is common data for player
        ...this.extractPurchaseItemData(purchase_log)
      });
    });
    return this.finalData;
  }

   // set table sort
   setDataSourceAttributes(): any {
    this.dataSource.sort = this.sort;
  }

  extractPurchaseItemData(data): any {
    const finalPurchaseItemData = {};
    this.calTimeRangeData(data).forEach(i => {
      if (i === '0') {
        data.filter(x =>  x.time < i);
        finalPurchaseItemData[i] = {data: data.filter(x =>  x.time < i), key: i};
      } else {
        data.filter(x =>   (x.time / 60) < +i && (x.time / 60) >= +i - 5);
        finalPurchaseItemData[i] = {data: data.filter(x =>   (x.time / 60) < +i && (x.time / 60) >= (+i - 5)), key: i};
      }
    });
    return finalPurchaseItemData;
  }


  // calTimeRangeData ["0", "5", "10", "15", "20", "25", "30", "35", "40", "45", "50", "55"]
  calTimeRangeData(data: any): string[] {
    const timeRange = [];
    // for time of  item purchase
    // purchase_log: [
    // {
    //     "time": -89,
    //     "key": "tango"
    // },
    // ...
    // ]
    // So we need cal 5 mins gap base on last purchased item time
    const len = Math.ceil(data[data.length - 1].time / 60 / 5);
    for (let i = 0; i <= len; i++) {
      timeRange.push(i * 5 + '');
    }
    return timeRange;
  }

  // calItemTotal
  calItemTotal(data: any): number {
    if (data) {
      return data.filter(i => this.items[i?.key]?.qual !== 'consumable').length;
    } else {
      return 0;
    }
  }

}
