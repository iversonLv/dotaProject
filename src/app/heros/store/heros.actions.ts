import { Action } from '@ngrx/store';

// model
import { IHero } from '../model/hero';
import { IRanking } from '../model/ranking';
import { IHeroStats } from '../model/heroStats';
import { IBenchmark } from '../model/benchmark';
import { IMatch } from '../model/match';
import { IMatchupsDurationPlayer } from '../model/matchup-duration-player';

// action enums
export enum HerosActionTypes {
  // top hero part
  LOAD_HEROS_GENERAL = '[Heros] Load General',
  LOAD_HEROS_GENERAL_SUCCESS = '[Heros] Load General Success',

// rankings page/tab
  LOAD_HEROS_RANKINGS = '[Heros] Load Rankings',
  LOAD_HEROS_RANKINGS_SUCCESS = '[Heros] Load Rankings Success',

// benchmarks page/tab
  LOAD_HEROS_BENCHMARKS = '[Heros] Load Benchmarks',
  LOAD_HEROS_BENCHMARKS_SUCCESS = '[Heros] Load Benchmarks Success',

// matches/recent page/tab
  LOAD_HEROS_MATCHES = '[Heros] Load Matches',
  LOAD_HEROS_MATCHES_SUCCESS = '[Heros] Load Matches Success',

// matchups page/tab
  LOAD_HEROS_MATCHUPS = '[Heros] Load Matchups',
  LOAD_HEROS_MATCHUPS_SUCCESS = '[Heros] Load Matchups Success',

// duration page/tab
  LOAD_HEROS_DURATIONS = '[Heros] Load Durations',
  LOAD_HEROS_DURATIONS_SUCCESS = '[Heros] Load Durations Success',

// players page/tab
  LOAD_HEROS_PLAYERS = '[Heros] Load Players',
  LOAD_HEROS_PLAYERS_SUCCESS = '[Heros] Load Players Success',

// itemPopularity page/tab
  LOAD_HEROS_ITEMPOPULARITY = '[Heros] Load ItemPopularity',
  LOAD_HEROS_ITEMPOPULARITY_SUCCESS = '[Heros] Load ItemPopularity Success',

  LOAD_HEROS_STATS = '[Heros] Load Stats',
  LOAD_HEROS_STATS_SUCCESS = '[Heros] Load Stats Success',
}

// load hero general data
// GET /heroes
export class LoadHerosGeneral implements Action {
  readonly type = HerosActionTypes.LOAD_HEROS_GENERAL;
}

export class LoadHerosGeneralSuccess implements Action {
  readonly type = HerosActionTypes.LOAD_HEROS_GENERAL_SUCCESS;

  constructor(public payload?: IHero[]) {}
}

// load hero stats
// GET /heroStats
export class LoadHerosStats implements Action {
  readonly type = HerosActionTypes.LOAD_HEROS_STATS;
}
export class LoadHerosStatsSuccess implements Action {
  readonly type = HerosActionTypes.LOAD_HEROS_STATS_SUCCESS;

  constructor(public payload?: any) {}
}

// load hero ranking
// GET /rankings?{hero_id}=
export class LoadHerosRankings implements Action {
  readonly type = HerosActionTypes.LOAD_HEROS_RANKINGS;

  constructor(public queryParams?) {}
}

export class LoadHerosRankingsSuccess implements Action {
  readonly type = HerosActionTypes.LOAD_HEROS_RANKINGS_SUCCESS;

  constructor(public queryParams, public payload: IRanking) {}
}

// load hero benchmarks
// GET /benchmarks?{hero_id}=
export class LoadHerosBenchmarks implements Action {
  readonly type = HerosActionTypes.LOAD_HEROS_BENCHMARKS;

  constructor(public queryParams?) {}
}

export class LoadHerosBenchmarksSuccess implements Action {
  readonly type = HerosActionTypes.LOAD_HEROS_BENCHMARKS_SUCCESS;

  constructor(public queryParams?, public payload?: IBenchmark) {}
}

// load hero matches/recent
// GET /hero/{hero_id}/matches
export class LoadHerosMatches implements Action {
  readonly type = HerosActionTypes.LOAD_HEROS_MATCHES;

  constructor(public heroId) {}
}

export class LoadHerosMatchesSuccess implements Action {
  readonly type = HerosActionTypes.LOAD_HEROS_MATCHES_SUCCESS;

  constructor(public heroId, public payload: IMatch[]) {}
}

// load hero matchups
// GET /hero/{hero_id}/matchups
export class LoadHerosMatchups implements Action {
  readonly type = HerosActionTypes.LOAD_HEROS_MATCHUPS;

  constructor(public heroId) {}
}

export class LoadHerosMatchupsSuccess implements Action {
  readonly type = HerosActionTypes.LOAD_HEROS_MATCHUPS_SUCCESS;

  constructor(public heroId, public payload: IMatchupsDurationPlayer[]) {}
}

// load hero durations
// GET /hero/{hero_id}/durations
export class LoadHerosDurations implements Action {
  readonly type = HerosActionTypes.LOAD_HEROS_DURATIONS;

  constructor(public heroId) {}
}

export class LoadHerosDurationsSuccess implements Action {
  readonly type = HerosActionTypes.LOAD_HEROS_DURATIONS_SUCCESS;

  constructor(public heroId, public payload: IMatchupsDurationPlayer[]) {}
}

// load hero players
// GET /hero/{hero_id}/players
export class LoadHerosPlayers implements Action {
  readonly type = HerosActionTypes.LOAD_HEROS_PLAYERS;

  constructor(public heroId) {}
}

export class LoadHerosPlayersSuccess implements Action {
  readonly type = HerosActionTypes.LOAD_HEROS_PLAYERS_SUCCESS;

  constructor(public heroId, public payload: IMatchupsDurationPlayer[]) {}
}

// load hero itemPopularity
// GET /heroes/{hero_id}/itemPopularity
export class LoadHerosItemPopularity implements Action {
  readonly type = HerosActionTypes.LOAD_HEROS_ITEMPOPULARITY;

  constructor(public heroId) {}
}

export class LoadHerosItemPopularitySuccess implements Action {
  readonly type = HerosActionTypes.LOAD_HEROS_ITEMPOPULARITY_SUCCESS;

  constructor(public heroId, public payload: any) {}
}

export type HerosActions = LoadHerosGeneral
  | LoadHerosGeneralSuccess
  | LoadHerosRankings
  | LoadHerosRankingsSuccess
  | LoadHerosBenchmarks
  | LoadHerosBenchmarksSuccess
  | LoadHerosMatches
  | LoadHerosMatchesSuccess
  | LoadHerosMatchups
  | LoadHerosMatchupsSuccess
  | LoadHerosDurations
  | LoadHerosDurationsSuccess
  | LoadHerosPlayers
  | LoadHerosPlayersSuccess
  | LoadHerosItemPopularity
  | LoadHerosItemPopularitySuccess
  | LoadHerosStats
  | LoadHerosStatsSuccess;
