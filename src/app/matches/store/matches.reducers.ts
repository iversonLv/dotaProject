import { MatchesActionTypes, MatchesActions } from './matches.actions';

// model
import { ISingleMatchData } from '../model/onematch';
import { IProMatchData } from '../model/pro-match';
import { IPublicMatchData } from '../model/public-match';
import { IParseMatchJobData } from '../model/parse-match-job';
import { IParseMatchData } from '../model/parse-match';

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

// Parse match jobid initialState
export const initialStateParseMatchJob: IParseMatchJobData = {
  isLoading: false,
  job: {},
};

// Parse match initialState
export const initialStateParseMatch: IParseMatchData = {
  isLoading: false,
  parseMatchData: {}
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

// Parse match job
export function parseMatchJob(state = initialStateParseMatchJob, action: MatchesActions): IParseMatchJobData {
  switch (action.type) {
    case MatchesActionTypes.PARSE_MATCH_JOB:
      return { ...state, isLoading: true };
    case MatchesActionTypes.PARSE_MATCH_JOB_SUCCESS:
      return { ...state, isLoading: false, job: {...action.payload.job} };
    default:
      return state;
  }
}

// Parse match
export function parseMatch(state = initialStateParseMatch, action: MatchesActions): IParseMatchData {
  switch (action.type) {
    case MatchesActionTypes.PARSE_MATCH:
      return { ...state, isLoading: true };
    case MatchesActionTypes.PARSE_MATCH_SUCCESS:
      return { ...state, isLoading: false, parseMatchData: {...action.payload} };
    default:
      return state;
  }
}

