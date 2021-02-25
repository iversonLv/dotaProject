import { Action } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
// service
import { TeamsService } from '../services/teams.service';
import { Observable, EMPTY } from 'rxjs';

// ngrx
import * as teamsActions from '../store/teams.actions';
import { map, switchMap, catchError } from 'rxjs/operators';

// model
import { ITeam } from '../model/team';
import { IMatch } from '../model/match';
import { IHero } from '../model/hero';
import { IPlayer } from '../model/player';

@Injectable()
export class TeamsEffects {
  constructor(
    private teamService: TeamsService,
    private actions$: Actions
  ) {}

  // get team data
  getGeneral$: Observable<Action> = createEffect(() =>
  this.actions$.pipe(
    ofType(teamsActions.TeamsActionTypes.LOAD_TEAMS_GENERAL),
    switchMap(({ teamId }) =>
      this.teamService.getTeamData(teamId)
        .pipe(
          map((teamsGeneral: ITeam) =>
            new teamsActions.LoadTeamsGeneralSuccess(teamId, teamsGeneral)
          ),
          catchError(() =>
            EMPTY
          )
        )
      )
    ),
  );

  // get teams list
  getTeamsList$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(teamsActions.TeamsActionTypes.LOAD_TEAMS),
      switchMap(() =>
        this.teamService.getTeamsList()
        .pipe(
          map((teamsList: ITeam[]) =>
            new teamsActions.LoadTeamsSuccess(teamsList)
          ),
          catchError(() =>
            EMPTY
          )
        )
      )
    ),
  );

  // get teams match
  getTeamsMatches$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(teamsActions.TeamsActionTypes.LOAD_TEAMS_MATCHES),
      switchMap(({ teamId }) =>
        this.teamService.getTeamsMatches(teamId)
        .pipe(
          map((teamsMatches: IMatch[]) =>
            new teamsActions.LoadTeamsMatchesSuccess(teamId, teamsMatches)
          ),
          catchError(() =>
            EMPTY
          )
        )
      )
    )
  );

  // get teams heroes
  getTeamsHeroes$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(teamsActions.TeamsActionTypes.LOAD_TEAMS_HEROES),
      switchMap(({ teamId }) =>
        this.teamService.getTeamsHeroes(teamId)
        .pipe(
          map((teamsHeroes: IHero[]) =>
            new teamsActions.LoadTeamsHeroesSuccess(teamId, teamsHeroes)
          ),
          catchError(() =>
            EMPTY
          )
        )
      )
    )
  );

  // get teams players
  getTeamsPlayers$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(teamsActions.TeamsActionTypes.LOAD_TEAMS_PLAYERS),
      switchMap(({ teamId }) =>
        this.teamService.getTeamsPlayers(teamId)
        .pipe(
          map((teamsPlayers: IPlayer[]) =>
            new teamsActions.LoadTeamsPlayersSuccess(teamId, teamsPlayers)
          ),
          catchError(() =>
            EMPTY
          )
        )
      )
    )
  );
}
