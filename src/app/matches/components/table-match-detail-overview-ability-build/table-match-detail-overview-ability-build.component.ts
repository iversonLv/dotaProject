import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';

// material
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

// model
import { IheroLocal } from 'src/app/heros/model/heroLocal';

@Component({
  selector: 'app-table-match-detail-overview-ability-build',
  templateUrl: './table-match-detail-overview-ability-build.component.html',
  styleUrls: ['./table-match-detail-overview-ability-build.component.scss']
})
export class TableMatchDetailOverviewAbilityBuildComponent implements OnInit {
  @Input() data: any;
  @Input() playerColorLocal: any;
  @Input() heroesLocal: IheroLocal;
  @Input() abilitiesByIdLocal: any;
  @Input() abilitiesTalentsLocal: any;
  @Output() showAbilityModalFn: any = new EventEmitter();
  @Output() hideAbilityModalFn: any = new EventEmitter();
  @ViewChild(MatSort) set matSort(mp: MatSort) {
    this.sort = mp;
    this.setDataSourceAttributes();
  }

  dataSource = new MatTableDataSource();

  displayedColumns: string[] = [
    'player_slot',
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '10',
    '11',
    '12',
    '13',
    '14',
    '15',
    '16',
    '17',
    '18',
    '19',
    '20',
    '21',
    '22',
    '23',
    '24',
    '25'
  ];
  sort;
  finalData = [];
  constructor() { }

  ngOnInit(): void {
    // extract the data
    this.dataSource.data = this.extractData(this.data);
  }
  // extract matches players[] to less data to meet for this page table
  extractData(data): any[] {
    data.forEach(z => {
      const { hero_id, player_slot, pred_vict, account_id, rank_tier, name, personaname,
      ability_upgrades_arr } = z;

      this.finalData.push({
        hero_id,
        pred_vict,
        player_slot,
        account_id,
        rank_tier,
        name,
        personaname,
        // above is common data for player
        ability_upgrades_arr: this.addPlaceholderForAbilityUpgradesArr(ability_upgrades_arr)
      });
    });

    return this.finalData;
  }
  // set table sort
  setDataSourceAttributes(): any {
    this.dataSource.sort = this.sort;
  }

  // push 0 for placeholder for ability upgrades arr
  // As dota abilty upgrade array is [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, X, 18, X, 20, X, X, X, X, 25]
  // level 17, 19, 20, 21, 21, 23, 24, for empty, so from response data we need push 0 for placeholder
  addPlaceholderForAbilityUpgradesArr(data: any): number[] {
    if (data) {
      const arr = [...data];
      arr.splice(16, 0, 0); // for 17
      arr.splice(18, 0, 0); // for 19
      arr.splice(20, 0, 0); // for 21
      arr.splice(21, 0, 0); // for 22
      arr.splice(22, 0, 0); // for 23
      arr.splice(23, 0, 0); // for 24
      return arr;
    }
  }

}
