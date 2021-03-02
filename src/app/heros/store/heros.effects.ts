import { Injectable } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';

// service
import { HerosService } from '../services/heros.service';

// models
import { IHero } from '../model/hero';
import { IHeroStats } from '../model/heroStats';
import { IRanking } from '../model/ranking';

// ngrx
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import * as herosActions from './heros.actions';
import { IMatch } from '../model/match';
import { IMatchupsDurationPlayer } from '../model/matchup-duration-player';
import { IBenchmark } from '../model/benchmark';

@Injectable()
export class HerosEffects {
  constructor(
    private action$: Actions,
    private herosService: HerosService
  ) {}

  getHeros$: Observable<Action> = createEffect(() =>
  this.action$.pipe(
    ofType(herosActions.HerosActionTypes.LOAD_HEROS_GENERAL),
    switchMap(() =>
      this.herosService.getHeros()
        .pipe(
          map((heroGeneral: IHero[]) =>
            new herosActions.LoadHerosGeneralSuccess(heroGeneral)
          ),
          catchError(() =>
            EMPTY
          )
        )
      )
    ),
  );

  getHeroStats$: Observable<Action> = createEffect(() =>
  this.action$.pipe(
    ofType(herosActions.HerosActionTypes.LOAD_HEROS_STATS),
    switchMap(() =>
      this.herosService.getHeroStats()
        .pipe(
          map((heros: any[]) =>
            new herosActions.LoadHerosStatsSuccess(heros)
          ),
          catchError(() =>
            EMPTY
          )
        )
      )
    ),
  );

  // get heros rankings
  getHerosRankings$: Observable<Action> = createEffect(() =>
  this.action$.pipe(
    ofType(herosActions.HerosActionTypes.LOAD_HEROS_RANKINGS),
    switchMap(({ queryParams }) =>
      this.herosService.getHerosRankings(queryParams)
      .pipe(
        map((herosRanking: IRanking) =>
          new herosActions.LoadHerosRankingsSuccess(queryParams, herosRanking)
        ),
        catchError(() =>
          EMPTY
        )
      )
    )
  ),
  );

  // get heros benchmarks
  getHerosBenchmarks$: Observable<Action> = createEffect(() =>
  this.action$.pipe(
    ofType(herosActions.HerosActionTypes.LOAD_HEROS_BENCHMARKS),
    switchMap(({ queryParams }) =>
      this.herosService.getHerosBenchmarks(queryParams)
      .pipe(
        map((benchmark: IBenchmark) =>
          new herosActions.LoadHerosBenchmarksSuccess(queryParams, benchmark)
        ),
        catchError(() =>
          EMPTY
        )
      )
    )
  ),
  );

  // get heros matches
  getHerosMatches$: Observable<Action> = createEffect(() =>
  this.action$.pipe(
    ofType(herosActions.HerosActionTypes.LOAD_HEROS_MATCHES),
    switchMap(({ heroId }) =>
      this.herosService.getHerosMatches(heroId)
      .pipe(
        map((matches: IMatch[]) =>
          new herosActions.LoadHerosMatchesSuccess(heroId, matches)
        ),
        catchError(() =>
          EMPTY
        )
      )
    )
  ),
  );

  // get heros matchups
  getHerosMatchups$: Observable<Action> = createEffect(() =>
  this.action$.pipe(
    ofType(herosActions.HerosActionTypes.LOAD_HEROS_MATCHUPS),
    switchMap(({ heroId }) =>
      this.herosService.getHerosMatchups(heroId)
      .pipe(
        map((matchups: IMatchupsDurationPlayer[]) =>
          new herosActions.LoadHerosMatchupsSuccess(heroId, matchups)
        ),
        catchError(() =>
          EMPTY
        )
      )
    )
  ),
  );

  // get heros durations
  getHerosDurations$: Observable<Action> = createEffect(() =>
  this.action$.pipe(
    ofType(herosActions.HerosActionTypes.LOAD_HEROS_DURATIONS),
    switchMap(({ heroId }) =>
      this.herosService.getHerosDurations(heroId)
      .pipe(
        map((durations: IMatchupsDurationPlayer[]) =>
          new herosActions.LoadHerosDurationsSuccess(heroId, durations)
        ),
        catchError(() =>
          EMPTY
        )
      )
    )
  ),
  );

  // get heros players
  getHerosPlayers$: Observable<Action> = createEffect(() =>
  this.action$.pipe(
    ofType(herosActions.HerosActionTypes.LOAD_HEROS_PLAYERS),
    switchMap(({ heroId }) =>
      this.herosService.getHerosPlayers(heroId)
      .pipe(
        map((players: IMatchupsDurationPlayer[]) =>
          new herosActions.LoadHerosPlayersSuccess(heroId, players)
        ),
        catchError(() =>
          EMPTY
        )
      )
    )
  ),
  );

  // get heros itemPopularity
  getHerosItemPopularity$: Observable<Action> = createEffect(() =>
  this.action$.pipe(
    ofType(herosActions.HerosActionTypes.LOAD_HEROS_ITEMPOPULARITY),
    switchMap(({ heroId }) =>
      this.herosService.getHerosItemPopularity(heroId)
      .pipe(
        map((itemPopularity: any) =>
          new herosActions.LoadHerosItemPopularitySuccess(heroId, itemPopularity)
        ),
        catchError(() =>
          EMPTY
        )
      )
    )
  ),
  );

}
