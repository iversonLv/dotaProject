import * as fromRoot from '../../../model/app';

export interface IAppState extends fromRoot.IAppState {
  IRanking: IRanking;
}

export interface IRankingData {
  isLoading: boolean;
  ranking: IRanking;
}

export interface IRanking {
  hero_id: number;
  rankings: IRankings[];
}

export interface IRankings {
  account_id: number;
  score: number;
  personaname: string;
  name: string;
  avatar: string;
  last_login: string;
  rank_tier: number;
}
