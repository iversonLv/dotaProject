import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';

// material
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

// ngrx
import { Store } from '@ngrx/store';
import * as playerActions from '../../store/players.actions';
// service
import { HerosService } from 'src/app/heros/services/heros.service';
// model
import { IRanking, IRankingData } from '../../model/ranking';
import { Router } from '@angular/router';
import { IheroLocal } from 'src/app/heros/model/heroLocal';

@Component({
  selector: 'app-rankings',
  templateUrl: './rankings.component.html',
  styleUrls: ['./rankings.component.scss']
})
export class RankingsComponent implements OnInit, AfterViewInit {
  @ViewChild(MatSort) set matSort(mp: MatSort) {
    this.sort = mp;
    this.setDataSourceAttributes();
  }

  sort;

  playersRankings$: Observable<IRankingData>;

  playersRankings: IRanking[];

  // hero modal default hidden
  showHeroModal = false;
  currentMouseOverHero: IheroLocal = null;
  // hero modal XY position
  pageXY = [];

  // cal top one ranking for base to calculate percentage the bar
  playersRankingsLargest: any;

  // before loading data
  isLoading = false;

  // User for hero modal to mapping
  heroesLocal: IheroLocal;

  // Table for rankings
  displayedColumnsRankings: string[] = ['hero_id', 'score', 'percent_rank'];
  public dataSourceRankings = new MatTableDataSource();

  constructor(
    private router: Router,
    private herosService: HerosService,
    private store: Store<{ playersRankings: IRankingData }>
  ) {
    // this.playerRankings$ = this.store.select('playerRankings');
  }

  ngOnInit(): void {
    this.dataSourceRankings.sort = this.sort;

    const currentUrl = this.router.url;
    const accountId = +currentUrl.split('/')[2];

    this.getHeroesLocal();
    this.getPlayerRankings(accountId);

  }

  ngAfterViewInit(): void {
  }

  setDataSourceAttributes(): any {
    this.dataSourceRankings.sort = this.sort;
  }

  // table sort

  getPlayerRankings(accountId: number): any {
    this.store.dispatch(new playerActions.LoadPlayersRankings(accountId));
    this.store.select('playersRankings').subscribe(data => {
      this.isLoading = data.isLoading;
      this.playersRankingsLargest = data.rankings[0];
      return this.dataSourceRankings.data = data.rankings;
    });

  }

  getHeroesLocal(): any {
    this.herosService.getHeroesLocal().subscribe(data => this.heroesLocal = data);
  }

  showHeroModalFn(e, id): any {
    this.pageXY = [e.pageX + 50, e.pageY - 120];
    this.showHeroModal = true;
    this.currentMouseOverHero = this.heroesLocal[id];
  }

}
