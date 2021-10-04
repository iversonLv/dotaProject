import { Component, Input, OnInit, ViewChild } from '@angular/core';

// material
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

// model
import { IheroLocal } from 'src/app/heros/model/heroLocal';
import { IRecord } from '../../model/record';


// dotaconstants
import heroes from 'dotaconstants/build/heroes.json';
import lobbyType from 'dotaconstants/build/lobby_type.json';

@Component({
  selector: 'app-table-players-records',
  templateUrl: './table-players-records.component.html',
  styleUrls: ['./table-players-records.component.scss']
})
export class TablePlayersRecordsComponent implements OnInit {
  @Input() field: string;
  @Input() data: IRecord[];
  @Input() displayedColumns: string[] = ['hero_id', 'lobby_type', 'durations', 'kills'];
  @ViewChild(MatSort) set matSort(mp: MatSort) {
    this.sort = mp;
    this.setDataSourceAttributes();
  }
  dataSource = new MatTableDataSource();

  // hero modal default hidden
  showHeroModal = false;
  currentMouseOverHero: IheroLocal = null;
  pageXY = [];

  // User for hero modal to mapping
  heroes: any = heroes;
  lobbyType: any = lobbyType;

  largestData;

  sort;
  constructor(
  ) { }

  ngOnInit(): void {
    this.dataSource.data = this.data;
    // this.getLargestData(this.data, this.field);
    // get all heroes local data
    this.largestData = Math.max(...this.data.map(item => item[this.field]));
  }

  setDataSourceAttributes(): any {
    this.dataSource.sort = this.sort;
  }

  showHeroModalFn(e, id): any {
    this.pageXY = [e.pageX + 50, e.pageY - 120];
    this.showHeroModal = true;
    this.currentMouseOverHero = this.heroes[id];
  }

}
