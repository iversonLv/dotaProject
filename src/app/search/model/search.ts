import * as fromRoot from '../../../model/app';

export interface IAppState extends fromRoot.IAppState {
  ISearch: ISearch;
}

export interface ISearchData {
  isLoading: boolean;
  results: ISearch[];
}

export interface ISearch {
  account_id: number;
  avatarfull: string;
  personaname: string;
  similarity: number;
  last_match_time?: string;
}

