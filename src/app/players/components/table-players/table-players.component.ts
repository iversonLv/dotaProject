import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

// material
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

// ngrx
import * as playersActions from '../../store/players.actions';
import { Store } from '@ngrx/store';

// model
import { IPro, IProData } from '../../model/pro';
import { IPeer, IPeerData } from '../../model/peer';

@Component({
  selector: 'app-table-players',
  templateUrl: './table-players.component.html',
  styleUrls: ['./table-players.component.scss']
})
export class TablePlayersComponent implements OnInit {
  // normal players, example peers table
  @Input() isOverviewPage = false;
  @Input() displayedColumns: string[] = ['personaname', 'games', 'with_games', 'win_pecentage_with', 'against_games', 'win_pecentage_against'];
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

  isLoading = false;
  queryParams;

  playersPros: IPro[];

  playersWithGameLargest: any = {
    games: null,
    with_games: null,
    against_games: null,
    with_gpm_avarage: null,
    with_xpm_avarage: null,
  };

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private store: Store<{playersPros: IProData, playersPeers: IPeerData}>
  ) { }

  ngOnInit(): void {
    const currentUrl = this.router.url;
    const accountId = +currentUrl.split('/')[2];
    this.activatedRoute.queryParamMap.subscribe(data => this.queryParams = data);

    // TODO: pros and peers are use common structure, might need use url to force dispatch
    // load player pros
    if (this.router.url.split('/')[3].split('?')[0] === 'pros') {
      this.store.dispatch(new playersActions.LoadPlayersPros(accountId, this.queryParams));
      this.store.select('playersPros').subscribe(data => {
        const dataPros = [...data.pros];
        this.getLargestData(dataPros);
        const dataNew = [];
        for (const i in dataPros) {
          if (dataPros.hasOwnProperty(i)) {
            const  {account_id, name, is_pro, avatar, last_played, games, with_games, with_win, against_games, against_win } = dataPros[i];
            dataNew.push(
              {
                account_id,
                name,
                is_pro,
                avatar,
                last_played,
                games,
                with_games,
                win_pecentage_with: with_win / with_games,
                against_games,
                win_pecentage_against: against_win / against_games,
              }
            );
          }
        }
        this.isLoading = data.isLoading;
        return this.dataSource.data = dataNew;
      });
    } else if (this.router.url.split('/')[3].split('?')[0] === 'peers' || this.isOverviewPage) {
      this.store.dispatch(new playersActions.LoadPlayersPeers(accountId, this.queryParams));
      this.store.select('playersPeers').subscribe(data => {
        const dataPeers = [...data.peers];
        this.getLargestDataA(dataPeers);
        const dataNew = [];
        for (const i in dataPeers) {
          if (dataPeers.hasOwnProperty(i)) {
            const  {
              account_id,
              personaname,
              avatar,
              last_played,
              games,
              with_games,
              with_win,
              against_games,
              against_win,
              with_gpm_sum,
              with_xpm_sum
            } = dataPeers[i];
            dataNew.push(
              {
                account_id,
                personaname,
                avatar,
                last_played,
                games,
                with_games,
                win_pecentage_with: with_win / with_games,
                against_games,
                win_pecentage_against: against_win / against_games,
                with_gpm_avarage: with_gpm_sum / with_games,
                with_xpm_avarage: with_xpm_sum / with_games
              }
            );
          }
        }
        this.isLoading = data.isLoading;
        if (this.isOverviewPage) {
          return this.dataSource.data = dataNew.splice(0, 5);
        } else {
          return this.dataSource.data = dataNew;
        }
      });
    }
  }

  async goAccountOverviewPage(accountId: number): Promise<any> {
    await this.router.navigate([`/players/${accountId}/overview`]);
    // TODO: after router navigate, we need dispatch all data again to refetch new data
    this.store.dispatch(new playersActions.LoadPlayersGeneral(accountId));
    this.store.dispatch(new playersActions.LoadPlayersPeers(accountId));
    this.store.dispatch(new playersActions.LoadPlayersWinLoseCount(accountId));
    this.store.dispatch(new playersActions.LoadPlayersHeroesPlayed(accountId));
    this.store.dispatch(new playersActions.LoadPlayersRecentMatches(accountId));
    this.store.dispatch(new playersActions.LoadPlayersCounts(accountId));
  }

    // cal the highest numbers of games, with_games and against_games for pages bar data
    getLargestData(data: IPro[]): any {
      let { games, with_games, against_games, with_xpm_avarage, with_gpm_avarage } = this.playersWithGameLargest;
      games = Math.max(...data.map(item => item.games));
      with_games = Math.max(...data.map(item => item.with_games));
      against_games = Math.max(...data.map(item => item.against_games));
      with_gpm_avarage = Math.max(...data.map(item => item.with_gpm_sum / item.with_games));
      with_xpm_avarage = Math.max(...data.map(item => item.with_xpm_sum / item.with_games));
      return this.playersWithGameLargest = { games, with_games, against_games, with_xpm_avarage, with_gpm_avarage };
    }

    getLargestDataA(data: IPeer[]): any {
      let { games, with_games, against_games, with_xpm_avarage, with_gpm_avarage } = this.playersWithGameLargest;
      games = Math.max(...data.map(item => item.games));
      with_games = Math.max(...data.map(item => item.with_games));
      against_games = Math.max(...data.map(item => item.against_games));
      with_gpm_avarage = Math.max(...data.map(item => item.with_games !== 0 ? (item.with_gpm_sum / item.with_games) : 0));
      with_xpm_avarage = Math.max(...data.map(item => item.with_games !== 0 ? (item.with_xpm_sum / item.with_games) : 0));
      return this.playersWithGameLargest = { games, with_games, against_games, with_xpm_avarage, with_gpm_avarage };
    }

  setDataSourceAttributes(): any {
    this.dataSource.sort = this.sort;
    if (!this.isOverviewPage && this.paginator) {
      this.dataSource.paginator = this.paginator;
    }
  }

  // material table bottom paginator
  syncPrimaryPaginator(event: PageEvent): any {
    if (!this.isOverviewPage && this.paginator) {
      this.paginator.pageIndex = event.pageIndex;
      this.paginator.pageSize = event.pageSize;
      this.paginator.page.emit(event);
    }
  }
}
