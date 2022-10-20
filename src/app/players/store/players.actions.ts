import { Action } from '@ngrx/store';
// model
import { IWinlose } from '../model/winlose';
import { IPlayer } from '../model/general';
import { IPeer } from '../model/peer';
import { IHeroesPlayed } from '../model/hero-played';
import { IMatch } from 'src/app/matches/model/match';
import { IRecentMatch } from 'src/app/matches/model/recent-match';
import { ICount } from '../model/count';
import { ITotal } from '../model/total';
import { IRanking } from '../model/ranking';
import { IPro } from '../model/pro';
import { IHistogram } from '../model/histogram';
import { IRecord } from '../model/record';
import { ITrend } from '../model/trend';
import { IRating } from '../model/rating';

export enum PlayersActionTypes {
  // for player general (top hero part)
  LOAD_PLAYERS_GENERAL = '[Players] Load General',
  LOAD_PLAYERS_GENERAL_SUCCESS = '[Players] Load General Success',

  // for player wl
  LOAD_PLAYERS_WIN_LOSE_COUNT = '[Players] Load Win Lose Count',
  LOAD_PLAYERS_WIN_LOSE_COUNT_SUCCESS = '[Players] Load Win Lose Count Success',

  // for player 'my record with' wl
  LOAD_PLAYERS_MY_RECORD_WITH_WIN_LOSE_COUNT = '[Players] Load My Record With Win Lose Count',
  LOAD_PLAYERS_MY_RECORD_WITH_WIN_LOSE_COUNT_SUCCESS = '[Players] Load My Record With Win Lose Count Success',

  // for player recent matches
  LOAD_PLAYERS_RECENT_MATCHES = '[Players] Load Recent Matches',
  LOAD_PLAYERS_RECENT_MATCHES_SUCCESS = '[Players] Load Recent Matches Success',

  // for player matches
  LOAD_PLAYERS_MATCHES = '[Players] Load Matches',
  LOAD_PLAYERS_MATCHES_SUCCESS = '[Players] Load Matches Success',

  // for player heroes played
  LOAD_PLAYERS_HEROES_PLAYED = '[Players] Load Heroes Played',
  LOAD_PLAYERS_HEROES_PLAYED_SUCCESS = '[Players] Load Heroes Played Success',

  // for player peers
  LOAD_PLAYERS_PEERS = '[Players] Load Peers',
  LOAD_PLAYERS_PEERS_SUCCESS = '[Players] Load Peers Success',

  // for player pros
  LOAD_PLAYERS_PROS = '[Players] Load Pros',
  LOAD_PLAYERS_PROS_SUCCESS = '[Players] Load Pros Success',

  // for player records
  LOAD_PLAYERS_RECORDS = '[Players] Load Records',
  LOAD_PLAYERS_RECORDS_SUCCESS = '[Players] Load Records Success',

  // for player totals
  LOAD_PLAYERS_TOTALS = '[Players] Load Totals',
  LOAD_PLAYERS_TOTALS_SUCCESS = '[Players] Load Totals Success',

  // for player counts
  LOAD_PLAYERS_COUNTS = '[Players] Load Counts',
  LOAD_PLAYERS_COUNTS_SUCCESS = '[Players] Load Counts Success',

  // for player histograms
  LOAD_PLAYERS_HISTOGRAMS = '[Players] Load Histograms',
  LOAD_PLAYERS_HISTOGRAMS_SUCCESS  = '[Players] Load Histograms Success',

  // for player trends
  LOAD_PLAYERS_TRENDS = '[Players] Load Trends',
  LOAD_PLAYERS_TRENDS_SUCCESS  = '[Players] Load Trends Success',

  // for player wardmap
  LOAD_PLAYERS_WARDMAP = '[Players] Load Wardmap',
  LOAD_PLAYERS_WARDMAP_SUCCESS  = '[Players] Load Wardmap Success',

  // for player wordcloud
  LOAD_PLAYERS_WORDCLOUD = '[Players] Load Wordcloud',
  LOAD_PLAYERS_WORDCLOUD_SUCCESS  = '[Players] Load Wordcloud Success',

  // for player ratings
  LOAD_PLAYERS_RATINGS = '[Players] Load Ratings',
  LOAD_PLAYERS_RATINGS_SUCCESS  = '[Players] Load Ratings Success',

  // for player rankings
  LOAD_PLAYERS_RANKINGS = '[Players] Load Rankings',
  LOAD_PLAYERS_RANKINGS_SUCCESS  = '[Players] Load Rankings Success',

  // for player filter
  LOAD_PLAYERS_PEERS_FILTER = '[Players] Load Peers Filter',
  LOAD_PLAYERS_PEERS_FILTER_SUCCESS = '[Players] Load Peers Filter Success',

  // for pro player
  LOAD_PRO_PLAYERS = '[Players] Load Pro Players',
  LOAD_PRO_PLAYERS_SUCCESS = '[Players] Load Pro Players Success',

  // for rank tier distribution
  LOAD_RANK_TIER_DISTRIBUTION = '[Medals] Load rank tier distribution',
  LOAD_RANK_TIER_DISTRIBUTION_SUCCESS = '[Medals] Load rank tier distribution Success',
}

// load player general data
// GET /players/{account_id}
export class LoadPlayersGeneral implements Action {
  readonly type = PlayersActionTypes.LOAD_PLAYERS_GENERAL;
  constructor(public accountId) {}
}

export class LoadPlayersGeneralSuccess implements Action {
  readonly type = PlayersActionTypes.LOAD_PLAYERS_GENERAL_SUCCESS;

  constructor(public accountId, public payload?: IPlayer ) {}
}

// load players win lose
// GET /players/{account_id}/wl
export class LoadPlayersWinLoseCount implements Action {
  readonly type = PlayersActionTypes.LOAD_PLAYERS_WIN_LOSE_COUNT;
  constructor(public accountId, public queryParams? ) {}
}

export class LoadPlayersWinLoseCountSuccess implements Action {
  readonly type = PlayersActionTypes.LOAD_PLAYERS_WIN_LOSE_COUNT_SUCCESS;

  constructor(public accountId, public queryParams, public payload?: IWinlose ) {}
}

// load players win lose
// GET /players/{logined_user_account_id}/wl
export class LoadPlayersMyRecordWithWinLoseCount implements Action {
  readonly type = PlayersActionTypes.LOAD_PLAYERS_MY_RECORD_WITH_WIN_LOSE_COUNT;
  constructor(public accountId, public queryParams? ) {}
}

export class LoadPlayersMyRecordWithWinLoseCountSuccess implements Action {
  readonly type = PlayersActionTypes.LOAD_PLAYERS_MY_RECORD_WITH_WIN_LOSE_COUNT_SUCCESS;

  constructor(public accountId, public queryParams, public payload?: IWinlose ) {}
}

// load players peers
// GET /players/{account_id}/peers
export class LoadPlayersPeers implements Action {
  readonly type = PlayersActionTypes.LOAD_PLAYERS_PEERS;
  constructor(public accountId, public queryParams? ) {}
}

export class LoadPlayersPeersSuccess implements Action {
  readonly type = PlayersActionTypes.LOAD_PLAYERS_PEERS_SUCCESS;

  constructor(public accountId, public queryParams?, public payload?: IPeer[] ) {}
}

// load players peers
// GET /players/{account_id}/peers
// TODO: could we only use one action to get both?
export class LoadPlayersPeersFilter implements Action {
  readonly type = PlayersActionTypes.LOAD_PLAYERS_PEERS_FILTER;
  constructor(public accountId ) {}
}

export class LoadPlayersPeersFilterSuccess implements Action {
  readonly type = PlayersActionTypes.LOAD_PLAYERS_PEERS_FILTER_SUCCESS;

  constructor(public accountId, public payload?: IPeer[] ) {}
}

// load players heroes played
// GET /players/{account_id}/heroes
// TODO: could we only use one action to get both?
export class LoadPlayersHeroesPlayed implements Action {
  readonly type = PlayersActionTypes.LOAD_PLAYERS_HEROES_PLAYED;

  constructor(public accountId, public queryParams? ) {}
}

export class LoadPlayersHeroesPlayedSuccess implements Action {
  readonly type = PlayersActionTypes.LOAD_PLAYERS_HEROES_PLAYED_SUCCESS;

  constructor(public accountId, public queryParams?, public payload?: IHeroesPlayed[] ) {}
}

// load player matches
export class LoadPlayersMatches implements Action {
  readonly type = PlayersActionTypes.LOAD_PLAYERS_MATCHES;

  constructor(public accountId, public queryParams?) {}
}

export class LoadPlayersMatchesSuccess implements Action {
  readonly type = PlayersActionTypes.LOAD_PLAYERS_MATCHES_SUCCESS;

  constructor(public accountId, public queryParams?, public payload?: IMatch[]) {}
}

// load player recent matches
export class LoadPlayersRecentMatches implements Action {
  readonly type = PlayersActionTypes.LOAD_PLAYERS_RECENT_MATCHES;

  constructor(public accountId) {}
}

export class LoadPlayersRecentMatchesSuccess implements Action {
  readonly type = PlayersActionTypes.LOAD_PLAYERS_RECENT_MATCHES_SUCCESS;

  constructor(public accountId, public payload?: IRecentMatch[]) {}
}

// load player counts
export class LoadPlayersCounts implements Action {
  readonly type = PlayersActionTypes.LOAD_PLAYERS_COUNTS;

  constructor(public accountId, public queryParams?) {}
}

export class LoadPlayersCountsSuccess implements Action {
  readonly type = PlayersActionTypes.LOAD_PLAYERS_COUNTS_SUCCESS;

  constructor(public accountId, public queryParams?, public payload?: ICount) {}
}

// Players total
export class LoadPlayersTotals implements Action {
  readonly type = PlayersActionTypes.LOAD_PLAYERS_TOTALS;

  constructor(public accountId, public queryParams?) {}
}

export class LoadPlayersTotalsSuccess implements Action {
  readonly type = PlayersActionTypes.LOAD_PLAYERS_TOTALS_SUCCESS;

  constructor(public accountId, public queryParams?, public payload?: ITotal[]) {}
}

// Players rankings
export class LoadPlayersRankings implements Action {
  readonly type = PlayersActionTypes.LOAD_PLAYERS_RANKINGS;

  constructor(public accountId) {}
}

export class LoadPlayersRankingsSuccess implements Action {
  readonly type = PlayersActionTypes.LOAD_PLAYERS_RANKINGS_SUCCESS;

  constructor(public accountId, public payload?: IRanking[]) {}
}

// Players props
export class LoadPlayersPros implements Action {
  readonly type = PlayersActionTypes.LOAD_PLAYERS_PROS;

  constructor(public accountId, public queryParams?) {}
}

export class LoadPlayersProsSuccess implements Action {
  readonly type = PlayersActionTypes.LOAD_PLAYERS_PROS_SUCCESS;

  constructor(public accountId, public queryParams?, public payload?: IPro[]) {}
}

// Players records
export class LoadPlayersRecords implements Action {
  readonly type = PlayersActionTypes.LOAD_PLAYERS_RECORDS;

  constructor(public accountId, public field?, public queryParams? ) {}
}

export class LoadPlayersRecordsSuccess implements Action {
  readonly type = PlayersActionTypes.LOAD_PLAYERS_RECORDS_SUCCESS;

  constructor(public accountId, public field?, public queryParams?, public payload?: IRecord[]) {}
}

// Players histograms
export class LoadPlayersHistograms implements Action {
  readonly type = PlayersActionTypes.LOAD_PLAYERS_HISTOGRAMS;

  constructor(public accountId, public field?, public queryParams? ) {}
}

export class LoadPlayersHistogramsSuccess implements Action {
  readonly type = PlayersActionTypes.LOAD_PLAYERS_HISTOGRAMS_SUCCESS;

  constructor(public accountId, public field?, public queryParams?, public payload?: IHistogram[]) {}
}

// Players trends
export class LoadPlayersTrends implements Action {
  readonly type = PlayersActionTypes.LOAD_PLAYERS_TRENDS;

  constructor(public accountId, public field?, public queryParams? ) {}
}

export class LoadPlayersTrendsSuccess implements Action {
  readonly type = PlayersActionTypes.LOAD_PLAYERS_TRENDS_SUCCESS;

  constructor(public accountId, public field?, public queryParams?, public payload?: ITrend[]) {}
}

// Players wardmap
export class LoadPlayersWardMaps implements Action {
  readonly type = PlayersActionTypes.LOAD_PLAYERS_WARDMAP;

  constructor(public accountId, public queryParams? ) {}
}
export class LoadPlayersWardMapsSuccess implements Action {
  readonly type = PlayersActionTypes.LOAD_PLAYERS_WARDMAP_SUCCESS;

  constructor(public accountId, public queryParams?, public payload?: any) {}
}

// Players wordcloud
export class LoadPlayersWordClouds implements Action {
  readonly type = PlayersActionTypes.LOAD_PLAYERS_WORDCLOUD;

  constructor(public accountId, public queryParams? ) {}
}
export class LoadPlayersWordCloudsSuccess implements Action {
  readonly type = PlayersActionTypes.LOAD_PLAYERS_WORDCLOUD_SUCCESS;

  constructor(public accountId, public queryParams?, public payload?: any) {}
}


// Players ratings
export class LoadPlayersRatings implements Action {
  readonly type = PlayersActionTypes.LOAD_PLAYERS_RATINGS;
  constructor(public accountId) {}
}

export class LoadPlayersRatingsSuccess implements Action {
  readonly type = PlayersActionTypes.LOAD_PLAYERS_RATINGS_SUCCESS;
  constructor(public accountId, public payload?: IRating[]) {}
}

// Pro Players
export class LoadProPlayers implements Action {
  readonly type = PlayersActionTypes.LOAD_PRO_PLAYERS;

  constructor() {}
}

export class LoadProPlayersSuccess implements Action {
  readonly type = PlayersActionTypes.LOAD_PRO_PLAYERS_SUCCESS;

  constructor(public payload?: IPro[]) {}
}

// Rank tier distribution
export class LoadRankTierDistribution implements Action {
  readonly type = PlayersActionTypes.LOAD_RANK_TIER_DISTRIBUTION;

  constructor() {}
}

export class LoadRankTierDistributionSuccess implements Action {
  readonly type = PlayersActionTypes.LOAD_RANK_TIER_DISTRIBUTION_SUCCESS;

  constructor(public payload?: any) {}
}

// TODO: Fail?


export type PlayersActions =
  LoadPlayersGeneral | LoadPlayersGeneralSuccess
  | LoadPlayersWinLoseCount | LoadPlayersWinLoseCountSuccess
  | LoadPlayersMyRecordWithWinLoseCount | LoadPlayersMyRecordWithWinLoseCountSuccess
  | LoadPlayersPeers | LoadPlayersPeersSuccess
  | LoadPlayersPeersFilter | LoadPlayersPeersFilterSuccess
  | LoadPlayersHeroesPlayed | LoadPlayersHeroesPlayedSuccess
  | LoadPlayersMatches | LoadPlayersMatchesSuccess
  | LoadPlayersRecentMatches | LoadPlayersRecentMatchesSuccess
  | LoadPlayersCounts | LoadPlayersCountsSuccess
  | LoadPlayersTotals | LoadPlayersTotalsSuccess
  | LoadPlayersRankings | LoadPlayersRankingsSuccess
  | LoadPlayersPros | LoadPlayersProsSuccess
  | LoadProPlayers | LoadProPlayersSuccess
  | LoadPlayersRecords | LoadPlayersRecordsSuccess
  | LoadPlayersTrends | LoadPlayersTrendsSuccess
  | LoadPlayersRatings | LoadPlayersRatingsSuccess
  | LoadPlayersWardMaps | LoadPlayersWardMapsSuccess
  | LoadPlayersWordClouds | LoadPlayersWordCloudsSuccess
  | LoadPlayersHistograms | LoadPlayersHistogramsSuccess
  | LoadRankTierDistribution | LoadRankTierDistributionSuccess;
