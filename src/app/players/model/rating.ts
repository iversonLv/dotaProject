import * as fromRootApp from '../../../model/app';

export interface IAppState extends fromRootApp.IAppState {
  IRating: IRating;
}

export interface IRatingData {
  isLoading: boolean;
  ratings: IRating[];
}

export interface IRating {
  account_id: number;
  competitive_rank: number;
  match_id: number;
  solo_competitive_rank: number;
  time: string;
}
