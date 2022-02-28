import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';

import { EMPTY, Observable } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';

// service
import { MatchesService } from '../services/matches.service';

// ngrx
import * as matchesActions from './matches.actions';

// model
import { IProMatch } from '../model/pro-match';
import { IPublicMatch } from '../model/public-match';

@Injectable()
export class MatchesEffects {
  constructor(
    private matchesService: MatchesService,
    private actions$: Actions
  ) {}

  // Get pro matches
  getProMatches$: Observable<Action> = createEffect(() =>
  this.actions$.pipe(
    ofType(matchesActions.MatchesActionTypes.LOAD_PRO_MATCHES),
    switchMap(({ queryParams }) =>
      this.matchesService.getProMatches(queryParams)
      .pipe(
        map((matches: IProMatch[]) =>
          new matchesActions.LoadProMatchesSuccess(queryParams, matches)
        ),
        catchError(() =>
          EMPTY
        )
      )
    )
  )
);

  // Get public matches
  getPublicMatches$: Observable<Action> = createEffect(() =>
  this.actions$.pipe(
    ofType(matchesActions.MatchesActionTypes.LOAD_PUBLIC_MATCHES),
    switchMap(({ queryParams }) =>
      this.matchesService.getPublicMatches(queryParams)
      .pipe(
        map((matches: IPublicMatch[]) =>
          new matchesActions.LoadPublicMatchesSuccess(queryParams, matches)
        ),
        catchError(() =>
          EMPTY
        )
      )
    )
  )
);

  // Get single match
  getSingleMatch$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(matchesActions.MatchesActionTypes.LOAD_MATCH),
      switchMap(({ matchId }) =>
        this.matchesService.getSingleMatch(matchId)
        .pipe(
          map((match: any) =>
            new matchesActions.LoadMatchSuccess(matchId, match)
          ),
          catchError(() =>
            EMPTY
          )
        )
      )
    )
  );

  // parse match job
  parseMatchJob$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(matchesActions.MatchesActionTypes.PARSE_MATCH_JOB),
      switchMap(({ matchId }) =>
        this.matchesService.parseMatchJob(matchId)
        .pipe(
          map((job: any) =>
            new matchesActions.ParseMatchJobSuccess(matchId, job)
          ),
          catchError(() =>
            EMPTY
          )
        )
      )
    )
  );

  // parse match
  parseMatch$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(matchesActions.MatchesActionTypes.PARSE_MATCH),
      switchMap(({ jobId }) =>
        this.matchesService.parseMatch(jobId)
        .pipe(
          map((parseMatchData: any) =>
            new matchesActions.ParseMatchSuccess(jobId, parseMatchData)
          ),
          catchError(() =>
            EMPTY
          )
        )
      )
    )
  );

}
