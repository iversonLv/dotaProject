import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

// angular material
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

// ngrx
import { Store } from '@ngrx/store';
import * as teamsActions from '../../store/teams.actions';

// model
import { IHeroData, IHero } from '../../model/hero';
import { IheroLocal } from 'src/app/heros/model/heroLocal';

// service
import { HerosService } from 'src/app/heros/services/heros.service';

@Component({
  selector: 'app-table-teams-heroes',
  templateUrl: './table-teams-heroes.component.html',
  styleUrls: ['./table-teams-heroes.component.scss']
})
export class TableTeamsHeroesComponent implements OnInit {
  @Input() isOverviewPage = false;
  displayedColumns: string[] = ['hero_id', 'games_played', 'win_pecentage_hero'];
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

  currentMouseOverHero: IheroLocal = null;
  pageXY = [];

  // cal top one ranking for base to calculate percentage the bar
  playersHeroesWithGameLargest: any = {
    games_played: null,
  };

  // User for hero modal to mapping
  heroesLocal: IheroLocal;

  // hero modal default hidden
  showHeroModal = false;
  constructor(
    private herosService: HerosService,
    private router: Router,
    private store: Store<{
      teamsHeroes: IHeroData,
    }>
  ) { }

  ngOnInit(): void {
    const currentUrl = this.router.url;
    const teamId = +currentUrl.split('/')[2];

    // load heroes played
    this.store.dispatch(new teamsActions.LoadTeamsHeroes(teamId));
    this.store.select('teamsHeroes').subscribe(data => {
      const dataHeroesPlayed = [...data.heroes];
      // this.playersHeroesWithGameLargest = data.heroesPlayed[0];
      this.getLargestData(dataHeroesPlayed);
      const dataNew = [];
      for (const i in dataHeroesPlayed) {
        if (dataHeroesPlayed.hasOwnProperty(i)) {
          const {hero_id, games_played, localized_name, wins  } = dataHeroesPlayed[i];
          // restructure peers data to match the design, in order to sort correctly
          dataNew.push(
            {
              hero_id,
              games_played,
              win_pecentage_hero: wins / games_played,
              localized_name
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
    }, err => {
      console.log(err);
    });

    // get all heroes local data
    this.getHeroesLocal();
  }

  // cal the highest numbers of games, with_games and against_games for pages bar data
  getLargestData(data: IHero[]): any {
    let { games_played } = this.playersHeroesWithGameLargest;
    games_played = Math.max(...data.map(item => item.games_played));
    return this.playersHeroesWithGameLargest = {games_played};
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
