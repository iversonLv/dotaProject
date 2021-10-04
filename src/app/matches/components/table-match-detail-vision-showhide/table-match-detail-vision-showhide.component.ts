import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { IheroLocal } from 'src/app/heros/model/heroLocal';

@Component({
  selector: 'app-table-match-detail-vision-showhide',
  templateUrl: './table-match-detail-vision-showhide.component.html',
  styleUrls: ['./table-match-detail-vision-showhide.component.scss']
})
export class TableMatchDetailVisionShowhideComponent implements OnInit {
  @Input() data: any;
  @Input() playerColorLocal: any;
  @Input() heroes: IheroLocal;

  @Output() emitShowHideVisionPlayersData: EventEmitter<any> = new EventEmitter();

  dataSource = new MatTableDataSource();
  displayedColumns: string[] = [
    'showHideAll',
  ];
  finalData = [];
  players = {};

  allType = true;
  allOneType = {
    obs_log : true,
    sen_log : true,
  };
  constructor() { }

  ngOnInit(): void {
    // extract the data
    this.dataSource.data = [
      {
        type: 'obs_log',
        data: [true, true, true, true, true]
      },
      {
        type: 'sen_log',
        data: [true, true, true, true, true]
      }
    ];
    this.extractData(this.data);
    // after push all hero id, we still need a column for all to show hide one type of wards
    this.displayedColumns.push('all');
  }
  // extract matches players[] to less data to meet for this page table
  extractData(data): any {
    data.forEach(i => {
      const { hero_id, player_slot } = i;
      this.finalData.push({
        hero_id,
        player_slot,
        // above is common data for player
      });
      this.displayedColumns.push(hero_id + '');
      this.players[hero_id] = { hero_id, player_slot, obs_log: true, sen_log: true };
    });
    console.log(this.players);
    // this.emitShowHideVisionPlayersData.emit(this.players);
    return this.players;
  }

  // showHideAll
  showHideAll(e): any {
    this.allType = e.checked;
    if (e.checked) {
      this.allOneType.obs_log = true;
      this.allOneType.sen_log = true;
      for (const i in this.players) {
        if (this.players.hasOwnProperty(i)) {
          this.players[i].obs_log = true;
          this.players[i].sen_log = true;
        }
      }
    } else {
      this.allOneType.obs_log = false;
      this.allOneType.sen_log = false;
      for (const i in this.players) {
        if (this.players.hasOwnProperty(i)) {
          this.players[i].obs_log = false;
          this.players[i].sen_log = false;
        }
      }
    }
    console.log(`all ${e.checked}`, this.players);
    this.emitShowHideVisionPlayersData.emit(this.players);
  }
  // check specific ward show hide
  showHideAllOneType([e, type]): any {
    this.allOneType[type] = e.checked;
    if (e.checked) {
      for (const i in this.players) {
        if (this.players.hasOwnProperty(i)) {
          this.players[i][type] = true;
        }
      }
    } else {
      for (const i in this.players) {
        if (this.players.hasOwnProperty(i)) {
          this.players[i][type] = false;
        }
      }
    }
    // if both type are true, then all type checkbox will checked, otherwise will unchecked
    this.checkAllType();

    console.log(`all ${type} ${e.checked}`, this.players);
    this.emitShowHideVisionPlayersData.emit(this.players);
  }

  // show hide specific hero
  showHide([e, type, heroId]): any {
    this.players[heroId][type] = e.checked;

    const checkCheckedLength = Object.values(this.players).filter(i => i[type] === true).length;
    const playerLength = Object.values(this.players).length;
    if (checkCheckedLength === playerLength) {
      this.allOneType[type] = true;
    } else {
      this.allOneType[type] = false;
    }

    this.checkAllType();

    console.log(`${heroId} ${type} ${e.checked}`, this.players);
    this.emitShowHideVisionPlayersData.emit(this.players);
  }

  // check all type
  checkAllType(): any {
    if (this.allOneType.obs_log && this.allOneType.sen_log) {
      this.allType = true;
    } else {
      this.allType = false;
    }
  }

}
