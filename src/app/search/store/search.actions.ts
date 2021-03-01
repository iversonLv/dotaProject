import { Action } from '@ngrx/store';

// model
import { ISearch } from '../model/search';

export enum SearchActionTypes {
  LOAD_SEARCH = '[Search] Load Search',
  LOAD_SEARCH_SUCCESS = '[Search Load Search Success]',
}

export class LoadSearch implements Action {
  readonly type = SearchActionTypes.LOAD_SEARCH;

  constructor(public searchQuery) {}
}

export class LoadSearchSuccess implements Action {
  readonly type = SearchActionTypes.LOAD_SEARCH_SUCCESS;

  constructor(public searchQuery, public payload?: ISearch[]) {}
}

export type SearchActions =
  LoadSearch | LoadSearchSuccess;
