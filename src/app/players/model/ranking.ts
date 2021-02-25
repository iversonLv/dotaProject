import * as fromRootApp from '../../../model/app';

export interface IAppState extends fromRootApp.IAppState {
  IRanking: IRanking;
}

export interface IRankingData {
  isLoading: boolean;
  rankings: IRanking[];
}

export interface IRanking {
  hero_id: number;
  score: number;
  percent_rank: number;
  card: number;
}
