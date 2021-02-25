import * as fromRoot from '../../../model/app';

export interface IAppState extends fromRoot.IAppState {
  IPlayer: IPlayer;
}

export interface IPlayerData {
  isLoading: boolean;
  player: IPlayer;
}

export interface IPlayer {
  tracked_until: string;
  solo_competitive_rank: string;
  competitive_rank: string;
  rank_tier: number;
  leaderboard_rank: number;
  mmr_estimate: IMmrEstimate;
  profile: IProfile;
}

export interface IMmrEstimate {
  estimate: number;
  stdDev: number;
  n: number;
}

export interface IProfile {
  account_id: number;
    personaname: string;
    name: string;
    plus: boolean;
    cheese: number;
    steamid: string;
    avatar: string;
    avatarmedium: string;
    avatarfull: string;
    profileurl: string;
    last_login: string;
    loccountrycode: string;
    is_contributor: boolean;
}
