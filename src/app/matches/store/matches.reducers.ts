import { MatchesActionTypes, MatchesActions } from './matches.actions';

// model
import { IMatchData } from '../model/match';
import { ISingleMatchData } from '../model/onematch';

// Match initialState
export const initialStateMatch: ISingleMatchData = {
  isLoading: false,
  match: [],
};


// Load match
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
