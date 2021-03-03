import { Component, OnInit, ViewChild } from '@angular/core';

// material
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

// ngrx
import * as matchesActions from '../../store/matches.actions';
import { Store } from '@ngrx/store';

// model
import { IProMatchData } from '../../model/pro-match';

@Component({
  selector: 'app-table-matches-pro',
  templateUrl: './table-matches-pro.component.html',
  styleUrls: ['./table-matches-pro.component.scss']
})
export class TableMatchesProComponent implements OnInit {
  displayedColumns: string[] = ['start_time', 'duration', 'radiant_name', 'dire_name'];
  dataSource = new MatTableDataSource();
  @ViewChild(MatSort) set matSort(mp: MatSort) {
    this.sort = mp;
    this.setDataSourceAttributes();
  }

  sort;
  isLoading = true;

  constructor(
    private stroe: Store<{
      proMatches: IProMatchData,
    }>
  ) { }

  ngOnInit(): void {
    this.stroe.dispatch(new matchesActions.LoadProMatches());
    this.stroe.select('proMatches').subscribe(data => {
      this.isLoading = data.isLoading;
      if (!data.isLoading) {
        const proMatchesData = [...data.matches];
        this.isLoading = data.isLoading;
        return this.dataSource.data = proMatchesData;
      }
    }, err => {
      console.log(err);
    });
  }

  setDataSourceAttributes(): any {
    this.dataSource.sort = this.sort;
  }

}
