import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { IheroLocal } from 'src/app/heros/model/heroLocal';

@Component({
  selector: 'app-table-activities',
  templateUrl: './table-activities.component.html',
  styleUrls: ['./table-activities.component.scss']
})
export class TableActivitiesComponent implements OnInit {
  @Input() data;
  @ViewChild(MatSort) set matSort(mp: MatSort) {
    this.sort = mp;
    this.setDataSourceAttributes();
  }

  displayedColumns: string[] = ['hero_id', 'lobby_type', 'game_mode', 'duration', 'kills', 'deaths', 'assists'];
  sort;
  dataSource = new MatTableDataSource();

  // User for hero modal to mapping
  @Input() heroesLocal: IheroLocal;
  @Input() lobbyTypeLocal: any;
  @Input() gameModeLocal: any;
  @Input() skillLocal: any;

  constructor(

  ) { }

  ngOnInit(): void {
    this.dataSource.data = this.data;
  }

  setDataSourceAttributes(): any {
    this.dataSource.sort = this.sort;
  }

}
