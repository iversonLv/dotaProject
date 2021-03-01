import * as fromRoot from '../../../model/app';
import { IMatch } from './match';

export interface IAppState extends fromRoot.IAppState {
  IRecentMatch: IRecentMatch;
}

export interface IRecentMatchData {
  isLoading: boolean;
  matches: IRecentMatch[];
}

export interface IRecentMatch extends IMatch {
  xp_per_min: number;
  gold_per_min: number;
  hero_damage: number;
  tower_damage: number;
  hero_healing: number;
  last_hits: number;
  lane: number;
  lane_role: number;
  is_roaming: boolean;
  cluster: number;
}
