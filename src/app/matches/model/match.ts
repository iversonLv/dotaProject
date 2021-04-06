import * as fromRoot from '../../../model/app';

export interface IAppState extends fromRoot.IAppState {
  IMatch: IMatch;
}

export interface IMatchData {
  isLoading: boolean;
  matches: IMatch[];
}

export interface IHeroes {
  account_id: number;
  hero_id: number;
  player_slot: number;
}

export interface IObsSenLeftLog extends IObsSenLog {
  attackername: string;
}

export interface IObsSenLog {
    time: number;
    type: string;
    key: string;
    slot: number;
    x: number;
    y: number;
    z: number;
    entityleft: boolean;
    ehandle: number;
    player_slot: number;
}

export interface IMatch {
  match_id: number;
  heroes?: any;
  player_slot?: number;
  radiant_win: boolean;
  duration: number;
  game_mode: number;
  lobby_type: number;
  hero_id: number;
  start_time: number;
  version: number;
  kills: number;
  deaths: number;
  assists: number;
  skill: number;
  leaver_status: number;
  party_size: number;
}
