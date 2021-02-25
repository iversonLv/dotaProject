import * as fromRoot from '../../../model/app';

export interface IAppState extends fromRoot.IAppState {
  IMatch: IMatch;
}

export interface IMatchData {
  matches: IMatch[];
  isLoading: boolean;
}

export interface IMatch {
  cluster: number;
  duration: number;
  league_name: string;
  leagueid: number;
  match_id: number;
  opposing_team_id: number;
  opposing_team_logo: string;
  opposing_team_name: string;
  radiant: boolean;
  radiant_win: boolean;
  start_time: number;
}
