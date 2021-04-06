import { Component, Input, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { IheroLocal } from 'src/app/heros/model/heroLocal';

@Component({
  selector: 'app-table-match-detail-ward-log',
  templateUrl: './table-match-detail-ward-log.component.html',
  styleUrls: ['./table-match-detail-ward-log.component.scss']
})
export class TableMatchDetailWardLogComponent implements OnInit {
  @Input() data: any;
  @Input() playerColorLocal: any;
  @Input() heroesLocal: IheroLocal;

  dataSource = new MatTableDataSource();
  displayedColumns: string[] = [
    'player_slot',
  ];
  finalData = [];
  constructor() { }

  ngOnInit(): void {
    // extract the data
    this.dataSource.data = this.extractData(this.data);
  }
  // extract matches players[] to less data to meet for this page table
  extractData(data: any): any[] {
    data.forEach((d, i) => {
      const { hero_id, player_slot, pred_vict, account_id, rank_tier, name, personaname,
        } = data[i];
      this.finalData.push({
        hero_id,
        pred_vict,
        player_slot,
        account_id,
        rank_tier,
        name,
        personaname,
        // above is common data for player
      });
    });
    return this.finalData;
  }

}
