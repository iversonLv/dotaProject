import { Action } from '@ngrx/store';

// model
import { IMatch } from '../model/match';
import { IRecentMatch } from '../model/recent-match';

export enum MatchesActionTypes {
  LOAD_MATCHES_PLAYER = '[Matches] Load Matches',
}

// load player matches
export class LoadMatchesPlayer implements Action {
  readonly type = MatchesActionTypes.LOAD_MATCHES_PLAYER;

  constructor(public accountId, public queryParams?) {}
}

export type MatchesActions =
  LoadMatchesPlayer;
