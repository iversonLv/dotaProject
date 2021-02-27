import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { IPlayer, IPlayerData } from '../../model/player';

import * as teamsActions from '../../store/teams.actions';

@Component({
  selector: 'app-table-teams-players',
  templateUrl: './table-teams-players.component.html',
  styleUrls: ['./table-teams-players.component.scss']
})
export class TableTeamsPlayersComponent implements OnInit {
  @Input() isCurrentTeamMember = true; // current team member only 5 won't show paginator

  displayedColumns: string[] = ['account_id', 'games_played', 'win_pecentage_hero'];
  dataSource = new MatTableDataSource();
  @ViewChild(MatSort) set matSort(mp: MatSort) {
    this.sort = mp;
  }
  // material table bottom paginator
  // officaly, material table only support one paginator
  @ViewChild(MatPaginator) set matPaginator(mp: MatPaginator) {
    this.paginator = mp;
    this.setDataSourceAttributes();
  }
  sort;
  paginator;

  isLoading = true;

  // cal top one ranking for base to calculate percentage the bar
  playersHeroesWithGameLargest: any = {
    games_played: null,
  };


  constructor(
    private router: Router,
    private store: Store<{teamsPlayers: IPlayerData}>,
  ) { }

  ngOnInit(): void {
    const currentUrl = this.router.url;
    const accountId = +currentUrl.split('/')[2];

    // load heroes played
    this.store.dispatch(new teamsActions.LoadTeamsPlayers(accountId));
    this.store.select('teamsPlayers').subscribe(data => {
      this.isLoading = data.isLoading;
      if (!data.isLoading) {
        const dataPlayers = [...data.players];
        // this.playersHeroesWithGameLargest = data.heroesPlayed[0];
        this.getLargestData(dataPlayers);
        const dataNew = [];
        for (const i in dataPlayers) {
          if (dataPlayers.hasOwnProperty(i)) {
            const {account_id, games_played, is_current_team_member, wins, name  } = dataPlayers[i];
            // restructure peers data to match the design, in order to sort correctly
            dataNew.push(
              {
                account_id,
                name,
                games_played,
                win_pecentage_hero: wins / games_played,
                is_current_team_member
              }
              );
            }
          }
        this.isLoading = data.isLoading;
        if (this.isCurrentTeamMember) {
          return this.dataSource.data = dataNew.filter(player => player.is_current_team_member);
        } else {
          return this.dataSource.data = dataNew.filter(player => !player.is_current_team_member);
        }
      }
    }, err => {
      console.log(err);
    });
  }

  // cal the highest numbers of games, with_games and against_games for pages bar data
  getLargestData(data: IPlayer[]): any {
    let { games_played } = this.playersHeroesWithGameLargest;
    games_played = Math.max(...data.map(item => item.games_played));
    return this.playersHeroesWithGameLargest = {games_played};
  }

  setDataSourceAttributes(): any {
    this.dataSource.sort = this.sort;
    if (!this.isCurrentTeamMember) {
      this.dataSource.paginator = this.paginator;
    }
  }

  // material table bottom paginator
  syncPrimaryPaginator(event: PageEvent): any {
    if (!this.isCurrentTeamMember) {
      this.paginator.pageIndex = event.pageIndex;
      this.paginator.pageSize = event.pageSize;
      this.paginator.page.emit(event);
    }
  }

}
