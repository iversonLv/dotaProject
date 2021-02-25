import { Component, Input, OnInit, ViewChild } from '@angular/core';

// material
import { MatTableDataSource } from '@angular/material/table';

// model
import { ITeam, ITeamsData } from '../../model/team';

// ngrx
import { Store } from '@ngrx/store';
import * as teamsActions from '../../store/teams.actions';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-table-teams',
  templateUrl: './table-teams.component.html',
  styleUrls: ['./table-teams.component.scss']
})
export class TableTeamsComponent implements OnInit {
  @Input() displayedColumns = ['rank', 'name', 'rating', 'wins', 'losses'];
  @ViewChild(MatSort) set matSort(mp: MatSort) {
    this.sort = mp;
    this.setDataSourceAttributes();
  }

  // table sort
  sort;
  // for loading data validate
  isLoading = false;
  dataSource = new MatTableDataSource();

  // call largest data for bar chart
  teamsLargest: any = {
    rating: null,
    wins: null,
    losses: null,
  };

  constructor(
    private store: Store<{teamsList: ITeamsData}>
  ) { }

  ngOnInit(): void {
    this.store.dispatch(new teamsActions.LoadTeams());
    this.store.select('teamsList').subscribe(data => {
      const dataTeams = [...data.teams];
      this.getLargestData(dataTeams);
      this.isLoading = data.isLoading;
      return this.dataSource.data = dataTeams.splice(0, 100);
    }, err => {
      console.log(err);
    });
  }

  getLargestData(data: ITeam[]): any {
    let { rating, wins, losses } = this.teamsLargest;
    rating = Math.max(...data.map(item => item.rating));
    wins = Math.max(...data.map(item => item.wins));
    losses = Math.max(...data.map(item => item.losses));
    return this.teamsLargest = { rating, wins, losses };
  }

  // set table sort
  setDataSourceAttributes(): any {
    this.dataSource.sort = this.sort;
  }

}
