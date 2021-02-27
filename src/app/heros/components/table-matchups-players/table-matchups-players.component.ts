import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

// material
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';

// model
import { IMatchupsDurationPlayer, IMatchupsDurationPlayerData } from '../../model/matchup-duration-player';

// ngrx
import { Store } from '@ngrx/store';
import * as herosActions from '../../store/heros.actions';

// service
import { HerosService } from '../../services/heros.service';
import { IheroLocal } from '../../model/heroLocal';

@Component({
  selector: 'app-table-matchups-players',
  templateUrl: './table-matchups-players.component.html',
  styleUrls: ['./table-matchups-players.component.scss']
})
export class TableMatchupsPlayersComponent implements OnInit {
  @Input() isHeroPlayersPage = false;
  @Input() displayedColumns: string[];
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

  currentMouseOverHero: IheroLocal;
  heroesLocal: IheroLocal;
  pageXY = [];

  dataSource = new MatTableDataSource();
  isLoading = true;

  showHeroModal = false;

  // cal top one ranking for base to calculate percentage the bar
  playersHeroesWithGameLargest: any = {
    games_played: null,
    win_pecentage: null,
  };

  constructor(
    private router: Router,
    private herosService: HerosService,
    private store: Store<{
      herosMatchups: IMatchupsDurationPlayerData,
      herosPlayers: IMatchupsDurationPlayerData,
    }>
  ) { }

  ngOnInit(): void {
    const currentUrl = this.router.url;
    const heroId = +currentUrl.split('/')[2];
    const currentPage = currentUrl.split('/')[3];
    if (currentPage === 'matchups')  {
      this.store.dispatch(new herosActions.LoadHerosMatchups(heroId));
      this.store.select('herosMatchups').subscribe(data => {
        this.isLoading = data.isLoading;
        if (!data.isLoading) {
            const dataHerosMatchups = [...data.markup_duration_player];
            this.getLargestData(dataHerosMatchups);
            const dataNew = [];
            for (const i in dataHerosMatchups) {
              if (dataHerosMatchups.hasOwnProperty(i)) {
                const { wins, games_played } = dataHerosMatchups[i];
                dataNew.push({
                  ...dataHerosMatchups[i],
                  win_pecentage: wins / games_played,
                });
              }
            }
            this.isLoading = data.isLoading;
            return this.dataSource.data = dataNew.splice(0, 100);
          }
      });
    } else if (currentPage === 'players') {
      this.isHeroPlayersPage = true;
      this.store.dispatch(new herosActions.LoadHerosPlayers(heroId));
      this.store.select('herosPlayers').subscribe(data => {
        this.isLoading = data.isLoading;
        if (!data.isLoading) {
            const dataHerosPlayers = [...data.markup_duration_player];
            this.getLargestData(dataHerosPlayers);
            const dataNew = [];
            for (const i in dataHerosPlayers) {
              if (dataHerosPlayers.hasOwnProperty(i)) {
                const { wins, games_played } = dataHerosPlayers[i];
                dataNew.push({
                  ...dataHerosPlayers[i],
                  win_pecentage: wins / games_played,
                });
              }
            }
            this.isLoading = data.isLoading;
            return this.dataSource.data = dataNew;
          }
      });
    }

    this.getHeroesLocal();
  }

  getHeroesLocal(): any {
    this.herosService.getHeroesLocal().subscribe(data => {
      this.heroesLocal = data;
    }, err => {
      console.log(err);
    });
  }

  goPage(heroId): any {
    this.router.navigate([`/heroes/${heroId}`])
    .then(() => {
      this.store.dispatch(new herosActions.LoadHerosRankings({ params: { hero_id: heroId } }));
      window.location.reload();
    });
  }

  getLargestData(data: IMatchupsDurationPlayer[]): any {
    let { games_played, win_pecentage} = this.playersHeroesWithGameLargest;
    games_played = Math.max(...data.map(item => item.games_played));
    win_pecentage = Math.max(...data.map(item => item.wins / item.games_played));
    return this.playersHeroesWithGameLargest = { games_played, win_pecentage };
  }

  setDataSourceAttributes(): any {
    this.dataSource.sort = this.sort;
    if (this.isHeroPlayersPage) {
      this.dataSource.paginator = this.paginator;
    }
  }

   // material table bottom paginator
   syncPrimaryPaginator(event: PageEvent): any {
    if (this.isHeroPlayersPage) {
      this.paginator.pageIndex = event.pageIndex;
      this.paginator.pageSize = event.pageSize;
      this.paginator.page.emit(event);
    }
  }

  showHeroModalFn(e, id): any {
    this.pageXY = [e.pageX + 50, e.pageY - 120];
    this.showHeroModal = true;
    this.currentMouseOverHero = this.heroesLocal[id];
  }
}
