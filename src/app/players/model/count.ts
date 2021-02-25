import * as fromRoot from '../../../model/app';

export interface IAppState extends fromRoot.IAppState {
  ICount: ICount;
}

export interface ICountData {
  isLoading: boolean;
  counts: ICount;
}

export interface ICountItem {
  games: number;
  win: number;
}

export interface ICount {
  leaver_status: ICountItem[];
  game_mode: ICountItem[];
  lobby_type: ICountItem[];
  lane_role: ICountItem[];
  region: ICountItem[];
  patch: ICountItem[];
  is_radiant: ICountItem[];
}
