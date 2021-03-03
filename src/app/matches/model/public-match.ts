import * as fromRoot from '../../../model/app';

export interface IAppState extends fromRoot.IAppState {
  IPublicMatch: IPublicMatch;
}

export interface IPublicMatchData {
  isLoading: boolean;
  matches: IPublicMatch[];
}

export interface IPublicMatch {
  match_id: number;
  match_seq_num: number;
  radiant_win: boolean;
  start_time: number;
  duration: number;
  avg_mmr: number;
  num_mmr: number;
  lobby_type: number;
  game_mode: number;
  avg_rank_tier: number;
  num_rank_tier: number;
  cluster: number;
  radiant_team: string;
  dire_team: string;
}
