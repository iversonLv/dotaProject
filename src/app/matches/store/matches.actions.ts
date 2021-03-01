import { Action } from '@ngrx/store';

// model
import { IMatch } from '../model/match';
import { IRecentMatch } from '../model/recent-match';

export enum MatchesActionTypes {
  LOAD_MATCHES_PLAYER = '[Matches] Load Matches',

  // load single match
  LOAD_MATCH = '[Matches] Load Match',
  LOAD_MATCH_SUCCESS = '[Matches] Load Match Success',
}

// load player matches
export class LoadMatchesPlayer implements Action {
  readonly type = MatchesActionTypes.LOAD_MATCHES_PLAYER;

  constructor(public accountId, public queryParams?) {}
}

// load match
export class LoadMatch implements Action {
  readonly type = MatchesActionTypes.LOAD_MATCH;

  constructor(public matchId) {}
}

export class LoadMatchSuccess implements Action {
  readonly type = MatchesActionTypes.LOAD_MATCH_SUCCESS;

  constructor(public matchId, public payload?) {}
}

export type MatchesActions =
  LoadMatchesPlayer
  | LoadMatch | LoadMatchSuccess;
