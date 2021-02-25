import * as fromRoot from '../../../model/app';

export interface IAppState extends fromRoot.IAppState {
  IMatch: IMatch;
}

export interface IMatchData {
  isLoading: boolean;
  matches: IMatch[];
}

export interface IMatch {
  account_id: number;
  assists: number;
  deaths: number;
  duration: number;
  kills: number;
  league_name: string;
  leagueid: number;
  match_id: number;
  player_slot: number;
  radiant: boolean;
  radiant_win: boolean;
  start_time: number;
}



