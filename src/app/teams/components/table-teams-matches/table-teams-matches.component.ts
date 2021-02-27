import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

// material
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

// ngrx
import { Store } from '@ngrx/store';
import * as teamsActions from '../../store/teams.actions';

// model
import { IMatchData } from '../../model/match';

@Component({
  selector: 'app-table-teams-matches',
  templateUrl: './table-teams-matches.component.html',
  styleUrls: ['./table-teams-matches.component.scss']
})
export class TableTeamsMatchesComponent implements OnInit {
  @Input() isOverviewPage = false;
  @Input() displayedColumns: string[] = ['match_id', 'duration', 'radiant_win', 'opposing_team_name'];
  @ViewChild(MatSort) set matSort(mp: MatSort) {
    this.sort = mp;
  }
// material table bottom paginator
  // officaly, material table only support one paginator
  @ViewChild(MatPaginator) set matPaginator(mp: MatPaginator) {
    this.paginator = mp;
    this.setDataSourceAttributes();
  }
  paginator;
  sort;
  isLoading = true;
  dataSource = new MatTableDataSource();


  constructor(
    private router: Router,
    private store: Store<{
      teamsMatches: IMatchData,
    }>
  ) {
  }

  ngOnInit(): void {
    // get url team Id
    const currentUrl = this.router.url;
    const teamId = +currentUrl.split('/')[2];
    // dispatch teams matches
    this.store.dispatch(new teamsActions.LoadTeamsMatches(teamId));
    this.store.select('teamsMatches').subscribe(data => {
      this.isLoading = data.isLoading;
      if (!data.isLoading) {
        const dataMatches = [...data.matches];
        this.isLoading = data.isLoading;
        if (this.isOverviewPage) {
          return this.dataSource.data = dataMatches.splice(0, 20);
        } else {
          return this.dataSource.data = dataMatches;
        }
      }
    }, err => {
      console.log(err);
    });
  }

  setDataSourceAttributes(): any {
    this.dataSource.sort = this.sort;
    if (!this.isOverviewPage) {
      this.dataSource.paginator = this.paginator;
    }
  }

  // material table bottom paginator
  syncPrimaryPaginator(event: PageEvent): any {
    if (!this.isOverviewPage) {
      this.paginator.pageIndex = event.pageIndex;
      this.paginator.pageSize = event.pageSize;
      this.paginator.page.emit(event);
    }
  }

  async goPage(teamId): Promise<any> {
    await this.router.navigate([`/teams/${teamId}`]);
    // TODO: after router navigate, we need dispatch all data again to refetch new data
    this.store.dispatch(new teamsActions.LoadTeamsGeneral(teamId));
    this.store.dispatch(new teamsActions.LoadTeamsMatches(teamId));
    this.store.dispatch(new teamsActions.LoadTeamsHeroes(teamId));
    this.store.dispatch(new teamsActions.LoadTeamsPlayers(teamId));
  }
}
