import { Component, Input, OnInit, ViewChild } from '@angular/core';

// material
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

// model
import { IheroLocal } from 'src/app/heros/model/heroLocal';

// service
import { RunesService } from 'src/app/services/runes.service';
import { MapItemsService } from 'src/app/services/map-items.service';


@Component({
  selector: 'app-table-log',
  templateUrl: './table-log.component.html',
  styleUrls: ['./table-log.component.scss']
})
export class TableLogComponent implements OnInit {
  @Input() playerColorLocal: any;
  @Input() heroesLocal: IheroLocal;
  @Input() heroesNameLocal: IheroLocal;
  @Input() data: any[];
  @Input() objectives: any[];
  @Input() mapItemLocal: any;
  @ViewChild(MatSort) set matSort(mp: MatSort) {
    this.sort = mp;
    this.setDataSourceAttributes();
  }
  dataSource = new MatTableDataSource();

  runesLocal: any;

  sort;
  displayedColumns: string[] = ['time', 'isRadiant', 'player_slot', 'delta'];

  constructor(
    private runesService: RunesService,
  ) { }

  ngOnInit(): void {
    this.getRunesLocal();
    // extract the data
    this.dataSource.data = this.extractData();
  }

  // extract matches players[] to less data to meet for this page table
  extractData(): any[] {
    const killsLogData = this.extractSpecificLogData(this.data, 'kills_log');
    const runesLogData = this.extractSpecificLogData(this.data, 'runes_log');
    const objectivesLogData = this.extractObjectiveLogData(this.objectives, 'objectives');
    const finalData = [];
    finalData.push(...killsLogData, ...runesLogData, ...objectivesLogData);
    console.log(finalData.sort((a, b) => a.time - b.time));
    return finalData.sort((a, b) => a.time - b.time);
  }

  extractObjectiveLogData(objectives: any[], field: string): any[] {
    const specificLogData = [];
    objectives.forEach(i => {
      if (i.player_slot && i.player_slot >= 0) {
        const playerOverallData = this.data.find(x => x.player_slot === i.player_slot);
        const {
          hero_id, player_slot, pred_vict, account_id, rank_tier, name, personaname,
          isRadiant,
              } = playerOverallData;
        const player = {
          hero_id, player_slot, pred_vict, account_id, rank_tier, name, personaname
        };
        specificLogData.push({
          ...i,
          player_slot,
          player,
          isRadiant,
          log_type: field
        });
      } else if (!i.player_slot && i.unit) {
        specificLogData.push({
          ...i,
          player_slot: -1,
          player: null,
          isRadiant: i.unit?.includes('badguys') ? false : true,
          log_type: field
        });
      }  else if (!i.player_slot && !i.unit) {
        specificLogData.push({
          ...i,
          player_slot: -1,
          player: null,
          isRadiant: true,
          log_type: field
        });
      }
    });
    console.log(specificLogData.sort((a, b) => a.time - b.time));
    return specificLogData.sort((a, b) => a.time - b.time);
  }

  extractSpecificLogData(data: any[], field: string): any[] {
    const specificLogData = [];
    data.forEach(i => {
      const {
        hero_id, player_slot, pred_vict, account_id, rank_tier, name, personaname,
        isRadiant,
            } = i;
      const log = [];
      const player = {
        hero_id, player_slot, pred_vict, account_id, rank_tier, name, personaname
      };
      i[field].forEach(l => {
        log.push({
          player_slot,
          player,
          isRadiant,
          ...l,
          log_type: field
        });
      });
      specificLogData.push(...log);
    });
    return specificLogData.sort((a, b) => a.time - b.time);
  }

  setDataSourceAttributes(): any {
    this.dataSource.sort = this.sort;
  }

  getRunesLocal(): any {
    this.runesService.getRunesLocal().subscribe(data => {
      this.runesLocal = data;
    }, err => {
      console.log(err);
    });
  }

}
