import { HerosActionTypes, HerosActions } from './heros.actions';

// model
import { IHeroData } from '../model/hero';
import { IHeroStatsData } from '../model/heroStats';
import { IRankingData } from '../model/ranking';
import { IBenchmarkData } from '../model/benchmark';
import { IMatchData } from '../model/match';
import { IMatchupsDurationPlayerData } from '../model/matchup-duration-player';

// init state
export const initialStateGneral: IHeroData = {
  isLoading: false,
  heros: []
};

export const initialStateStats: IHeroStatsData = {
  isLoading: false,
  heros: []
};

// init state for heros rankings
export const initialStateHerosRankings: IRankingData = {
  isLoading: false,
  ranking: null,
};

// init state for heros benchmark
export const initialStateHerosBenchmarks: IBenchmarkData = {
  isLoading: false,
  benchmark: null,
};

// init state for heros matches
export const initialStateHerosMatches: IMatchData = {
  isLoading: false,
  matches: [],
};

// init state for matchup durations players
export const initialStateHerosMatchupsDurationsPlayers: IMatchupsDurationPlayerData = {
  isLoading: false,
  markup_duration_player: [],
};

// init state for itemPopularity
export const initialStateHerosItemPopularity: any = {
  isLoading: false,
  itemPopularity: null,
};


// hero general data
export function heroGeneral(state = initialStateGneral, action: HerosActions): IHeroData {
  switch (action.type) {
    case HerosActionTypes.LOAD_HEROS_GENERAL:
      return { ...state, isLoading: true };
    case HerosActionTypes.LOAD_HEROS_GENERAL_SUCCESS:
      return { ...state, heros: [...(action.payload || [])], isLoading: false };
    default:
      return state;
  }
}

export function heroStats(state = initialStateStats, action: HerosActions): any {
  switch (action.type) {
    case HerosActionTypes.LOAD_HEROS_STATS:
      return { ...state, isLoading: true };
    case HerosActionTypes.LOAD_HEROS_STATS_SUCCESS:
      return { ...state, heros: [...(action.payload || [])], isLoading: false };
    default:
      return state;
  }
}

// hero rankings
export function herosRankings(state = initialStateHerosRankings, action: HerosActions): IRankingData {
  switch (action.type) {
    case HerosActionTypes.LOAD_HEROS_RANKINGS:
      return { ...state, isLoading: true };
    case HerosActionTypes.LOAD_HEROS_RANKINGS_SUCCESS:
      return { ...state, isLoading: false, ranking: { ...action.payload } };
    default:
      return state;
  }
}

// hero benchmarks
export function herosBenchmarks(state = initialStateHerosBenchmarks, action: HerosActions): IBenchmarkData {
  switch (action.type) {
    case HerosActionTypes.LOAD_HEROS_BENCHMARKS:
      return { ...state, isLoading: true };
    case HerosActionTypes.LOAD_HEROS_BENCHMARKS_SUCCESS:
      return { ...state, isLoading: false, benchmark: action.payload };
    default:
      return state;
  }
}

// hero matches
export function herosMatches(state = initialStateHerosMatches, action: HerosActions): IMatchData {
  switch (action.type) {
    case HerosActionTypes.LOAD_HEROS_MATCHES:
      return { ...state, isLoading: true };
    case HerosActionTypes.LOAD_HEROS_MATCHES_SUCCESS:
      return { ...state, isLoading: false, matches: [...(action.payload || [])] };
    default:
      return state;
  }
}

// hero matchups
export function herosMatchups(state = initialStateHerosMatchupsDurationsPlayers, action: HerosActions): IMatchupsDurationPlayerData {
  switch (action.type) {
    case HerosActionTypes.LOAD_HEROS_MATCHUPS:
      return { ...state, isLoading: true };
    case HerosActionTypes.LOAD_HEROS_MATCHUPS_SUCCESS:
      return { ...state, isLoading: false, markup_duration_player: [...(action.payload || [])] };
    default:
      return state;
  }
}

// hero durations
export function herosDurations(state = initialStateHerosMatchupsDurationsPlayers, action: HerosActions): IMatchupsDurationPlayerData {
  switch (action.type) {
    case HerosActionTypes.LOAD_HEROS_DURATIONS:
      return { ...state, isLoading: true };
    case HerosActionTypes.LOAD_HEROS_DURATIONS_SUCCESS:
      return { ...state, isLoading: false, markup_duration_player: [...(action.payload || [])] };
    default:
      return state;
  }
}

// hero players
export function herosPlayers(state = initialStateHerosMatchupsDurationsPlayers, action: HerosActions): IMatchupsDurationPlayerData {
  switch (action.type) {
    case HerosActionTypes.LOAD_HEROS_PLAYERS:
      return { ...state, isLoading: true };
    case HerosActionTypes.LOAD_HEROS_PLAYERS_SUCCESS:
      return { ...state, isLoading: false, markup_duration_player: [...(action.payload || [])] };
    default:
      return state;
  }
}

// hero itemPopularity
export function herosItemPopularity(state = initialStateHerosItemPopularity, action: HerosActions): any {
  switch (action.type) {
    case HerosActionTypes.LOAD_HEROS_ITEMPOPULARITY:
      return { ...state, isLoading: true };
    case HerosActionTypes.LOAD_HEROS_ITEMPOPULARITY_SUCCESS:
      return { ...state, isLoading: false, itemPopularity: {...action.payload} };
    default:
      return state;
  }
}
