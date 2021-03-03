import * as fromRoot from '../../../model/app';

export interface IAppState extends fromRoot.IAppState {
  IQueryParams: IQueryParams;
}

export interface IQueryParams {
  mmr_ascending?: number;
  mmr_descending?: number;
  less_than_match_id?: number;
}

