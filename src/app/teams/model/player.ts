import * as fromRoot from '../../../model/app';

export interface IAppState extends fromRoot.IAppState {
  IPlayer: IPlayer;
}

export interface IPlayerData {
  players: IPlayer[];
  isLoading: boolean;
}

export interface IPlayer {
  account_id: number;
  games_played: number;
  is_current_team_member: boolean;
  name: string;
  wins: number;
}
