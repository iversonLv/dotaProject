import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ICountItem } from '../../model/count';

@Component({
  selector: 'app-table-counts',
  templateUrl: './table-counts.component.html',
  styleUrls: ['./table-counts.component.scss']
})
export class TableCountsComponent implements OnInit {
  @Input() data;
  @Input() countType = '';
  displayedColumns = ['category', 'games', 'winP'];
  @Input() countTypeLocalData;
  largestGames = 0;
  @ViewChild(MatSort) set matSort(mp: MatSort) {
    this.sort = mp;
    this.setDataSourceAttributes();
  }
  dataSource = new MatTableDataSource();

  sort;
  constructor() { }

  ngOnInit(): void {
    this.parseData(this.data, this.countTypeLocalData);
  }

  // set table sort
  setDataSourceAttributes(): any {
    this.dataSource.sort = this.sort;
  }

  parseData(data: any[], countTypeLocalData): any {
    const newData = [];
    this.largestGames = Math.max(...data.map(item => item.games));
    for (const i of data) {
      newData.push({
        id: i.id,
        category: this.countType !== 'region' ? countTypeLocalData[i.id].name : countTypeLocalData[i.id],
        games: i.games,
        win: i.win,
        winP: i.win / i.games
      });
    }
    return this.dataSource.data = newData;
  }

}
