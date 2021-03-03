import { MatchesActionTypes, MatchesActions } from './matches.actions';

// model
import { ISingleMatchData } from '../model/onematch';
import { IProMatchData } from '../model/pro-match';
import { IPublicMatchData } from '../model/public-match';

// Pro matches initialState
export const initialStateProMatches: IProMatchData = {
  isLoading: false,
  matches: [],
};

// Public matches initialState
export const initialStatePublicMatches: IPublicMatchData = {
  isLoading: false,
  matches: [],
};


// Single match initialState
export const initialStateMatch: ISingleMatchData = {
  isLoading: false,
  match: [],
};


// Load pro matches
export function proMatches(state = initialStateProMatches, action: MatchesActions): IProMatchData {
  switch (action.type) {
    case MatchesActionTypes.LOAD_PRO_MATCHES:
      return { ...state, isLoading: true };
    case MatchesActionTypes.LOAD_PRO_MATCHES_SUCCESS:
      return { ...state, isLoading: false, matches: [ ...(action.payload || []) ] };
    default:
      return state;
  }
}

// Load public matches
export function publicMatches(state = initialStatePublicMatches, action: MatchesActions): IPublicMatchData {
  switch (action.type) {
    case MatchesActionTypes.LOAD_PUBLIC_MATCHES:
      return { ...state, isLoading: true };
    case MatchesActionTypes.LOAD_PUBLIC_MATCHES_SUCCESS:
      return { ...state, isLoading: false, matches: [ ...(action.payload || []) ] };
    default:
      return state;
  }
}

// Load single match
export function singleMatch(state = initialStateMatch, action: MatchesActions): ISingleMatchData {
  switch (action.type) {
    case MatchesActionTypes.LOAD_MATCH:
      return { ...state, isLoading: true };
    case MatchesActionTypes.LOAD_MATCH_SUCCESS:
      return { ...state, isLoading: false, match: [ {...action.payload} ] };
    default:
      return state;
  }
}
