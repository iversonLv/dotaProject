import { Component, Input, OnInit, ViewChild } from '@angular/core';

// material
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

// model
import { IheroLocal } from 'src/app/heros/model/heroLocal';

@Component({
  selector: 'app-table-match-detail-actions',
  templateUrl: './table-match-detail-actions.component.html',
  styleUrls: ['./table-match-detail-actions.component.scss']
})
export class TableMatchDetailActionsComponent implements OnInit {
  @Input() data: any;
  @Input() playerColorLocal: any;
  @Input() heroesLocal: IheroLocal;

  @ViewChild(MatSort) set matSort(mp: MatSort) {
    this.sort = mp;
    this.setDataSourceAttributes();
  }

  dataSource = new MatTableDataSource();

  displayedColumns: string[] = [
    'player_slot',
    'actions_per_min',
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '8',
    '10',
    '24',
    '31',
  ];

  sort;

  actionstKey: any = {
    1: {
      tooltip: 'Number of times the player moved to a position',
      title: 'MV (P)',
    },
    2: {
      tooltip: 'Number of times the player moved to a target',
      title: 'MV (T)'
    },
    3: {
      tooltip: 'Number of times the player attacked a position (attack move)',
      title: 'ATK (P)'
    },
    4: {
      tooltip: 'Number of times the player attacked a target',
      title: 'ATK (T)'
    },
    5: {
      tooltip: 'Number of times the player cast on a position',
      title: 'CST (P)'
    },
    6: {
      tooltip: 'Number of times the player cast on a target',
      title: 'CST (T)'
    },
    8: {
      tooltip: 'Number of times the player cast on no target',
      title: 'CST (N)'
    },
    10: {
      tooltip: 'Number of times the player held position',
      title: 'HLD'
    },
    24: {
      tooltip: 'Number of times the player used the glyph',
      title: 'GLYPH'
    },
    31: {
      tooltip: 'Number of times the player used scan',
      title: 'SCN'
    },
  };
  // call largest data for bar chart
  teamsLargest: any = {
    actions_per_min: null,
    1: null,
    2: null,
    3: null,
    4: null,
    5: null,
    6: null,
    8: null,
    10: null,
    24: null,
    31: null
  };
  constructor() { }

  ngOnInit(): void {
    // extract the data
    this.dataSource.data = this.extractData(this.data);
  }

  // extract matches players[] to less data to meet for this page table
  extractData(data): any[] {
    const finalData = [];
    this.getLargestData(data);
    data.forEach(z => {
      const { hero_id, player_slot, pred_vict, account_id, rank_tier, name, personaname, actions_per_min, actions } = z;
      finalData.push({
        hero_id,
        pred_vict,
        player_slot,
        account_id,
        rank_tier,
        name,
        personaname,
        // above is common data for player
        actions_per_min,
        ...actions // here will extract number of actions obj to mapping the sort displayedColumns
      });
    });

    return finalData;
  }

  // set table sort
  setDataSourceAttributes(): any {
    this.dataSource.sort = this.sort;
  }

  getLargestData(data: any): any {
    this.teamsLargest.actions_per_min = Math.max(...data.map(item => item.actions_per_min));
    this.getNotUndefinedData(data, '1');
    this.getNotUndefinedData(data, '2');
    this.getNotUndefinedData(data, '3');
    this.getNotUndefinedData(data, '4');
    this.getNotUndefinedData(data, '5');
    this.getNotUndefinedData(data, '6');
    this.getNotUndefinedData(data, '8');
    this.getNotUndefinedData(data, '10');
    this.getNotUndefinedData(data, '24');
    this.getNotUndefinedData(data, '31');
    return this.teamsLargest;
  }

  getNotUndefinedData(data: any, field: string): any {
    const dataFilter = data.filter(i => i.actions[field] !== undefined);
    return this.teamsLargest[field] = Math.max(...dataFilter.map(item => item.actions[field]));
  }

}
