import * as fromRoot from '../../../model/app';
import { IMatch } from './match';

export interface IAppState extends fromRoot.IAppState {
  ISingleMatch: any;
}

export interface ISingleMatchData {
  isLoading: boolean;
  match: any;
}

export interface ISingleMatchDraftTimings {
    order: number;
    pick: boolean;
    active_team: number;
    hero_id: number;
    player_slot: number;
    extra_time: number;
    total_time_taken: number;
}

export interface ISingleMatchPickBand {
  hero_id: number;
  is_pick: boolean;
  match_id: number;
  ord: number;
  order: number;
  team: number;
}

export interface IChat {
    time: number;
    type: string;
    key: number;
    slot: number;
    player_slot: number;
}

export interface IShownChat {
  chat: IChat;
  targetType: string;
  chatType: string;
  spam: boolean;
  side: string;
}

export interface ISingleMatchTeam {
  logo_url: string;
  name: string;
  tag: string;
  team_id: number;
}

