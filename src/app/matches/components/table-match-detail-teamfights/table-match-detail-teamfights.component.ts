import { Component, EventEmitter, Input, OnInit, Output, ViewChild, OnChanges, SimpleChanges } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { IheroLocal } from 'src/app/heros/model/heroLocal';

@Component({
  selector: 'app-table-match-detail-teamfights',
  templateUrl: './table-match-detail-teamfights.component.html',
  styleUrls: ['./table-match-detail-teamfights.component.scss']
})
export class TableMatchDetailTeamfightsComponent implements OnInit, OnChanges {
  @Input() data: any;
  @Input() playerColorLocal: any;
  @Input() heroesLocal: IheroLocal;
  @Input() dataRange: number[];

  @Input() currentTeamFightDataForTable: any;

  @Input() itemsLocal: any;
  @Input() abilitiesTalentsLocal: any;
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
    'deaths',
    'damage',
    'healing',
    'gold_delta',
    'xp_delta',
    'ability_uses',
    'item_uses'
  ];
  sort;
  finalData = [];
  constructor() { }

  ngOnInit(): void {
    // extract the data
    // this.dataSource.data = this.extractData(this.data, this.currentTeamFightDataForTable);
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.dataSource.data = this.extractData(this.data,
      changes.currentTeamFightDataForTable.currentValue).slice(this.dataRange[0], this.dataRange[1]);
    // const change = changes.currentTeamFightDataForTable;
    // console.log(changes)
    // if (change.firstChange === true ) {
    //   console.log('changes')
    //   this.dataSource.data = this.extractData(this.data, changes.currentTeamFightDataForTable.currentValue);
    // } else {
    //   return;
    // }
  }

  // extract matches players[] to less data to meet for this page table
  extractData(data: any, currentTeamFightDataForTable: any): any[] {
    const arr = [];
    // console.log('in', currentTeamFightDataForTable);
    data.forEach((d, i) => {
      const { hero_id, player_slot, pred_vict, account_id, rank_tier, name, personaname,
        } = data[i];
      arr.push({
        hero_id,
        pred_vict,
        player_slot,
        account_id,
        rank_tier,
        name,
        personaname,
        // above is common data for player
        ...currentTeamFightDataForTable[i]
      });
    });
    console.log('default', arr);
    this.finalData = arr;
    return arr;
  }

  // set table sort
  setDataSourceAttributes(): any {
    this.dataSource.sort = this.sort;
  }

  // CalPerfectData for bar chart
  // For this table the bar chart total is special, the number will have minus [-32, -25, -140, 169, -118]
  // Then if minus, the bar will only show > 0 item, then all minus will be 0,
  // so we need restruct the list, the minimun minus number will plus itself, other will plus one by one
  // So we will add abs the minimum number, then fial list will be [108, 115, 0, 309, 22]
  // At the same time, the bar another number need plus the minNum as well or it will less than total one, no on data will meet 100%
  calPerfectData(data: any, field: string): number[] {
    let dataField = data.map(item => item[field]).filter(i => i !== undefined);
    const minNum = Math.abs(Math.min(...dataField));
    dataField = dataField.map(i => i + minNum);
    return [Math.max(...dataField), minNum];
  }

  objKey(data: any, field: string): any[] {
    return Object.keys(data[field]);
  }

}
