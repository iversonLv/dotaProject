import { Component, Input, OnInit, ViewChild } from '@angular/core';

// material table
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

// model
import { IheroLocal } from 'src/app/heros/model/heroLocal';
import { ICosmetic } from 'src/app/shared/model/cosmetic';

@Component({
  selector: 'app-table-cosmetics',
  templateUrl: './table-cosmetics.component.html',
  styleUrls: ['./table-cosmetics.component.scss']
})
export class TableCosmeticsComponent implements OnInit {
  @Input() data: any;
  @Input() playerColorLocal: any;
  @Input() heroes: IheroLocal;

  @ViewChild(MatSort) set matSort(mp: MatSort) {
    this.sort = mp;
    this.setDataSourceAttributes();
  }

  dataSource = new MatTableDataSource();
  displayedColumns: string[] = [
    'player_slot',
    'cosmetics'
  ];
  sort;
  finalData = [];

  // comesti modal dafault hidden
  pageXY = [];
  showCosmeticModal = false;
  currentMouseOverCosmetic: ICosmetic = null;

  constructor() { }

  ngOnInit(): void {
    // extract the data
    this.dataSource.data = this.extractData(this.data);
  }

  extractData(data): any[] {
    data.forEach(z => {
      const { hero_id, player_slot, pred_vict, account_id, rank_tier, name, personaname,
        cosmetics
      } = z;

      this.finalData.push({
        hero_id,
        pred_vict,
        player_slot,
        account_id,
        rank_tier,
        name,
        personaname,
        // above is common data for player
        cosmetics
      });

    });
    console.log(this.finalData);
    return this.finalData;
  }

  // set table sort
  setDataSourceAttributes(): any {
    this.dataSource.sort = this.sort;
  }

  showComesticModalFn(e, comestic): any {
    this.pageXY = [e.pageX - 50, e.pageY - 100];
    this.showCosmeticModal = true;
    this.currentMouseOverCosmetic = comestic;
  }
}
