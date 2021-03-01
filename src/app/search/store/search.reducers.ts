import { SearchActions, SearchActionTypes } from './search.actions';

// model
import { ISearchData } from '../model/search';

export const initialStateSearch: ISearchData = {
  isLoading: false,
  results: [],
};

export function searchList(state = initialStateSearch, action: SearchActions): ISearchData {
  switch (action.type) {
    case SearchActionTypes.LOAD_SEARCH:
      return { ...state, isLoading: true };
    case SearchActionTypes.LOAD_SEARCH_SUCCESS:
      return { ...state, isLoading: false, results: [...(action.payload || [])] };
    default:
      return state;
  }
}
