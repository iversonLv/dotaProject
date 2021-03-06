import * as fromRootApp from '../../../model/app';

export interface IAppState extends fromRootApp.IAppState {
  IRecord: IRecord;
}

export interface IRecordData {
  isLoading: boolean;
  records: IRecord[];
}

export interface IRecord {
  assists: number;
  deaths: number;
  game_mode: number;
  hero_id: number;
  kills: number;
  leaver_status: number;
  lobby_type: number;
  match_id: number;
  party_size: number;
  player_slot: number;
  radiant_win: boolean;
  skill: number;
  start_time: number;
  version: number;

  kda?: number;
  actions_per_min?: number;
  comeback?: number;
  courier_kills?: number;
  denies?: number;
  duration?: number;
  lane_efficiency_pct?: number;
  purchase_gem?: number;
  gold_per_min?: number;
  hero_damage?: number;
  hero_healing?: number;
  last_hits?: number;
  loss?: number;
  pings?: number;
  neutral_kills?: number;
  purchase_ward_observer?: number;
  purchase_rapier?: number;
  purchase_ward_sentry?: number;
  stomp?: number;
  stuns?: number;
  throw?: number;
  tower_damage?: number;
  tower_kills?: number;
  purchase_tpscroll?: number;
  xp_per_min?: number;
}
