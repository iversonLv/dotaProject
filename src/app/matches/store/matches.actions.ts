import { Action } from '@ngrx/store';
import { IQueryParams } from 'src/app/shared/model/query-params';

// model
import { IMatch } from '../model/match';
import { IRecentMatch } from '../model/recent-match';

export enum MatchesActionTypes {

  // load pro matches
  LOAD_PRO_MATCHES = '[Matches] Load Pro Matches',
  LOAD_PRO_MATCHES_SUCCESS = '[Matches] Load Pro Matches Success',

  // load public matches
  LOAD_PUBLIC_MATCHES = '[Matches] Load Public Matches',
  LOAD_PUBLIC_MATCHES_SUCCESS = '[Matches] Load Public Matches Success',

  // load single match
  LOAD_MATCH = '[Matches] Load Match',
  LOAD_MATCH_SUCCESS = '[Matches] Load Match Success',

  // request match
  REQUEST_MATCH = '[Matches] Request Match',
  REQUEST_MATCH_SUCCESS = '[Matches] Request Match Success',
}

// load pro matches
export class LoadProMatches implements Action {
  readonly type = MatchesActionTypes.LOAD_PRO_MATCHES;

  constructor(public queryParams?) {}
}

export class LoadProMatchesSuccess implements Action {
  readonly type = MatchesActionTypes.LOAD_PRO_MATCHES_SUCCESS;

  constructor(public queryParams?, public payload?) {}
}

// load public matches
export class LoadPublicMatches implements Action {
  readonly type = MatchesActionTypes.LOAD_PUBLIC_MATCHES;

  constructor(public queryParams?) {}
}

export class LoadPublicMatchesSuccess implements Action {
  readonly type = MatchesActionTypes.LOAD_PUBLIC_MATCHES_SUCCESS;

  constructor(public queryParams?, public payload?) {}
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

// request match
export class RequestMatch implements Action {
  readonly type = MatchesActionTypes.REQUEST_MATCH;

  constructor(public matchId) {}
}

export class RequestMatchSuccess implements Action {
  readonly type = MatchesActionTypes.REQUEST_MATCH_SUCCESS;

  constructor(public matchId, public payload?) {}
}


export type MatchesActions =
  | LoadMatch | LoadMatchSuccess
  | LoadProMatches | LoadProMatchesSuccess
  | LoadPublicMatches | LoadPublicMatchesSuccess
  | RequestMatch | RequestMatchSuccess;
