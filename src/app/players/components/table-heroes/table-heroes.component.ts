import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';

// material
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator, PageEvent } from '@angular/material/paginator';

// ngrx
import * as playersActions from '../../store/players.actions';
import { Store } from '@ngrx/store';

// model
import { IHeroesPlayed, IHeroesPlayedData } from '../../model/hero-played';
import { IheroLocal } from 'src/app/heros/model/heroLocal';

// service
import { HerosService } from 'src/app/heros/services/heros.service';

@Component({
  selector: 'app-table-heroes',
  templateUrl: './table-heroes.component.html',
  styleUrls: ['./table-heroes.component.scss']
})
export class TableHeroesComponent implements OnInit {
  // this is to check whether it's playersHeroes page or overview page
  @Input() isOverviewPage = false;
  @Input() displayedColumns: string[] = ['hero_id', 'games', 'win_pecentage_hero'];
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

  playersHeroesPlayed: IHeroesPlayed[];
  // hero modal dafault hidden
  playersHeroesPlayed$: Observable<IHeroesPlayedData>;
  currentMouseOverHero: IheroLocal = null;
  pageXY = [];

  // cal top one ranking for base to calculate percentage the bar
  playersHeroesWithGameLargest: any = {
    games: null,
    with_games: null,
    against_games: null
  };

  // User for hero modal to mapping
  heroesLocal: IheroLocal;

  // hero modal default hidden
  showHeroModal = false;
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private herosService: HerosService,
    private store: Store<{playersHeroesPlayed: IHeroesPlayedData}>
  ) { }

  ngOnInit(): void {
    const currentUrl = this.router.url;
    const accountId = +currentUrl.split('/')[2];
    this.activatedRoute.queryParamMap.subscribe(data => this.queryParams = data);

    // load heroes played
    this.store.dispatch(new playersActions.LoadPlayersHeroesPlayed(accountId, this.queryParams));
    this.store.select('playersHeroesPlayed').subscribe(data => {
      const dataHeroesPlayed = [...data.heroesPlayed];
      // this.playersHeroesWithGameLargest = data.heroesPlayed[0];
      this.getLargestData(dataHeroesPlayed);
      const dataNew = [];
      for (const i in dataHeroesPlayed) {
        if (dataHeroesPlayed.hasOwnProperty(i)) {
          const {hero_id, last_played, games, win, with_games, with_win, against_games, against_win  } = dataHeroesPlayed[i];
          // restructure peers data to match the design, in order to sort correctly
          dataNew.push(
            {
              hero_id,
              last_played,
              win_pecentage_hero: win / games,
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
      if (this.isOverviewPage) {
        return this.dataSource.data = dataNew.splice(0, 10);
      } else {
        return this.dataSource.data = dataNew;
      }
    });

    // get all heroes local data
    this.getHeroesLocal();
  }

  // cal the highest numbers of games, with_games and against_games for pages bar data
  getLargestData(data: IHeroesPlayed[]): any {
    let {games, with_games, against_games} = this.playersHeroesWithGameLargest;
    games = Math.max(...data.map(item => item.games));
    with_games = Math.max(...data.map(item => item.with_games));
    against_games = Math.max(...data.map(item => item.against_games));
    return this.playersHeroesWithGameLargest = {games, with_games, against_games};
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

  getHeroesLocal(): any {
    this.herosService.getHeroesLocal().subscribe(data => {
      this.heroesLocal = data;
    }, err => {
      console.log(err);
    });
  }

  showHeroModalFn(e, id): any {
    this.pageXY = [e.pageX + 50, e.pageY - 120];
    this.showHeroModal = true;
    this.currentMouseOverHero = this.heroesLocal[id];
  }

}
