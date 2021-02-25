import * as fromRoot from '../../../model/app';

export interface IAppState extends fromRoot.IAppState {
  IMatchupsDurationPlayer: IMatchupsDurationPlayer;
}

export interface IMatchupsDurationPlayerData {
  isLoading: boolean;
  markup_duration_player: IMatchupsDurationPlayer[];
}

export interface IMatchupsDurationPlayer {
  games_played: number;
  duration_bin?: string;
  hero_id?: number;
  account_id?: number;
  wins: number;
}
