import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

// material
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

// model
import { IMatchData } from '../../model/match';
import { IPlayerData } from 'src/app/players/model/general';
import { IPro, IProData } from 'src/app/players/model/pro';

// ngrx
import { Store } from '@ngrx/store';
import * as herosActions from '../../store/heros.actions';
import * as playersActions from '../../../players/store/players.actions';


@Component({
  selector: 'app-table-heros-matches',
  templateUrl: './table-heros-matches.component.html',
  styleUrls: ['./table-heros-matches.component.scss']
})
export class TableHerosMatchesComponent implements OnInit {
  @Input() isRecentMatches = false;
  @Input() displayedColumns: string[] = ['account_id', 'duration', 'radiant_win', 'kills', 'deaths', 'assists'];
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

  proPlayersData;
  constructor(
    private router: Router,
    private store: Store<{
      herosMatches: IMatchData,
      playersGeneral: IPlayerData,
      proPlayers: IProData,
    }>
  ) { }
  ngOnInit(): void {

    const currentUrl = this.router.url;
    const heroId = +currentUrl.split('/')[2];

    this.store.dispatch(new playersActions.LoadProPlayers());
    this.store.select('proPlayers').subscribe(data => {
      this.isLoading = data.isLoading;
      if (!data.isLoading) {
        this.isLoading = data.isLoading;
        const proPlayers = [...data.pros];
        return this.proPlayersData = this.extractProplayerData(proPlayers);
      }
    }, err => {
      console.log(err);
    });

    this.store.dispatch(new herosActions.LoadHerosMatches(heroId));
    this.store.select('herosMatches').subscribe(data => {
      this.isLoading = data.isLoading;
      if (!data.isLoading) {
        const dataMatches = [...data.matches];
        // const dataNew = [];
        // for (const i in dataMatches) {
        //   if (dataMatches.hasOwnProperty(i)) {
        //     const accountName = this.getPlayerName(dataMatches[i].account_id);
        //     dataNew.push({ ...dataMatches[i], account_name: accountName });
        //   }
        // }
        this.isLoading = data.isLoading;
        return this.dataSource.data = dataMatches;
      }
    }, err => {
      console.log(err);
    });
  }

  setDataSourceAttributes(): any {
    this.dataSource.sort = this.sort;
    if (!this.isRecentMatches) {
      this.dataSource.paginator = this.paginator;
    }
  }

  // material table bottom paginator
  syncPrimaryPaginator(event: PageEvent): any {
    if (!this.isRecentMatches) {
      this.paginator.pageIndex = event.pageIndex;
      this.paginator.pageSize = event.pageSize;
      this.paginator.page.emit(event);
    }
  }

  getPlayerName(accountId): any {
    this.store.dispatch(new playersActions.LoadPlayersGeneral(accountId));
    this.store.select('playersGeneral').subscribe(data => {
      return data?.player?.profile?.name !== null ? data?.player?.profile?.name : data?.player?.profile?.personaname;
    });
  }

  extractProplayerData(data: IPro[]): any {
    const accountIdList = data.map(i => i.account_id);
    const finalData = {};
    accountIdList.forEach(i => {
      finalData[i] = data.find(x => x.account_id === i);
    });
    return finalData;
  }

}
