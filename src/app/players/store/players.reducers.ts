import { PlayersActionTypes, PlayersActions } from './players.actions';

// model
import { IPlayerData } from '../model/general';
import { IWinloseData } from '../model/winlose';
import { IPeerData } from '../model/peer';
import { IHeroesPlayedData } from '../model/hero-played';
import { IMatchData } from 'src/app/matches/model/match';
import { IRecentMatchData } from 'src/app/matches/model/recent-match';
import { ICountData } from '../model/count';
import { ITotalData } from '../model/total';
import { IRankingData } from '../model/ranking';
import { IProData } from '../model/pro';
import { IHistogramData } from '../model/histogram';
import { IRecordData } from '../model/record';
import { ITrendData } from '../model/trend';
import { IRatingData } from '../model/rating';

// init state for player win lose
export const initialStateWinLose: IWinloseData = {
    isLoading: false,
    winlose: null
};

// init state for player my record with win lose
export const initialStateMyRecordWithWinLose: IWinloseData = {
  isLoading: false,
  winlose: null
};

// init state for player general data
export const initialStateGeneral: IPlayerData = {
  isLoading: false,
  player: null
};

// init state for player peers
export const initialStatePeers: IPeerData = {
  isLoading: false,
  peers: []
};

// init state for player heroes played
export const initialStateHeroesPlayed: IHeroesPlayedData = {
  isLoading: false,
  heroesPlayed: []
};

// init state for player matches
export const initialStatePlayerMatches: IMatchData = {
  isLoading: false,
  matches: []
};

// init state for player recent matches
export const initialStatePlayerRecentMatches: IRecentMatchData =  {
  isLoading: false,
  matches: []
};

// init state for player recent matches
export const initialStatePlayerCounts: ICountData =  {
  isLoading: false,
  counts: null,
};

// init state for player total
export const initialStatePlayerTotals: ITotalData = {
  isLoading: false,
  totals: []
};

// init state for player rankings
export const initialStatePlayerRanks: IRankingData = {
  isLoading: false,
  rankings: []
};

// init state for player props
export const initialStatePlayerProps: IProData = {
  isLoading: false,
  pros: []
};

// init state for players records
export const initialStatePlayerRecords: IRecordData = {
  isLoading: false,
  records: [],
};

// init state for players histograms
export const initialStatePlayerHistograms: IHistogramData = {
  isLoading: false,
  histograms: [],
};

// init state for players trends
export const initialStatePlayerTrends: ITrendData = {
  isLoading: false,
  trends: [],
};

// init state for players wardmap

// init state for players wordcloud

// init state for players ratings
export const initialStatePlayerRatings: IRatingData = {
  isLoading: false,
  ratings: [],
};

// init state for prop players
export const initialStateProPlayers: IProData = {
  isLoading: false,
  pros: []
};

// players win lose reducer
export function playersWinLoseCount(state = initialStateWinLose, action: PlayersActions): IWinloseData {
  switch (action.type) {
    case PlayersActionTypes.LOAD_PLAYERS_WIN_LOSE_COUNT:
      return { ...state, isLoading: true };
    case PlayersActionTypes.LOAD_PLAYERS_WIN_LOSE_COUNT_SUCCESS:
      console.log(JSON.stringify(state));
      console.log(action.payload);
      return { ...state, winlose: { ...action.payload }, isLoading: false };
    default:
      return state;
  }
}

// players 'my record with' win lose reducer
export function playersMyRecordWithWinLoseCount(state = initialStateMyRecordWithWinLose, action: PlayersActions): IWinloseData {
  switch (action.type) {
    case PlayersActionTypes.LOAD_PLAYERS_MY_RECORD_WITH_WIN_LOSE_COUNT:
      return { ...state, isLoading: true };
    case PlayersActionTypes.LOAD_PLAYERS_MY_RECORD_WITH_WIN_LOSE_COUNT_SUCCESS:
      console.log(JSON.stringify(state));
      console.log(action.payload);
      return { ...state, winlose: { ...action.payload }, isLoading: false };
    default:
      return state;
  }
}

// players general reducer
export function playersGeneral(state = initialStateGeneral, action: PlayersActions): IPlayerData {
    switch (action.type) {
      case PlayersActionTypes.LOAD_PLAYERS_GENERAL:
        return { ...state, isLoading: true };
      case PlayersActionTypes.LOAD_PLAYERS_GENERAL_SUCCESS:
        return { ...state, player: { ...action.payload }, isLoading: false };
    default:
      return state;
  }
}

// players peers reducer
export function playersPeers(state = initialStatePeers, action: PlayersActions): IPeerData {
  switch (action.type) {
    case PlayersActionTypes.LOAD_PLAYERS_PEERS:
      return { ...state, isLoading: true };
    case PlayersActionTypes.LOAD_PLAYERS_PEERS_SUCCESS:
      return { ...state, peers: [...(action.payload || [])], isLoading: false };
    default:
      return state;
  }
}

// players peers reducer
export function playersPeersFilter(state = initialStatePeers, action: PlayersActions): IPeerData {
  switch (action.type) {
    case PlayersActionTypes.LOAD_PLAYERS_PEERS_FILTER:
      return { ...state, isLoading: true };
    case PlayersActionTypes.LOAD_PLAYERS_PEERS_FILTER_SUCCESS:
      return { ...state, peers: [...(action.payload || [])], isLoading: false };
    default:
      return state;
  }
}

// players heroes played
export function playersHeroesPlayed(state = initialStateHeroesPlayed, action: PlayersActions): IHeroesPlayedData {
  switch (action.type) {
    case PlayersActionTypes.LOAD_PLAYERS_HEROES_PLAYED:
        return { ...state, isLoading: true };
    case PlayersActionTypes.LOAD_PLAYERS_HEROES_PLAYED_SUCCESS:
        return { ...state, heroesPlayed: [...(action.payload || [])], isLoading: false };
    default:
      return state;
  }
}

// player matches reducer
export function playersMatches(state = initialStatePlayerMatches, action: PlayersActions): IMatchData {
  switch (action.type) {
    case PlayersActionTypes.LOAD_PLAYERS_MATCHES:
      return { ...state, isLoading: true };
    case PlayersActionTypes.LOAD_PLAYERS_MATCHES_SUCCESS:
      return { ...state, isLoading: false, matches: [...(action.payload || [])] };
    default:
      return state;
  }
}

// player recnet matches reducer
export function playersRecentMatches(state = initialStatePlayerRecentMatches, action: PlayersActions): IRecentMatchData {
  switch (action.type) {
    case PlayersActionTypes.LOAD_PLAYERS_RECENT_MATCHES:
      return { ...state, isLoading: true };
    case PlayersActionTypes.LOAD_PLAYERS_RECENT_MATCHES_SUCCESS:
      return { ...state, isLoading: false, matches: [...(action.payload || [])] };
    default:
      return state;
  }
}

// player counts reducer
export function playersCounts(state = initialStatePlayerCounts, action: PlayersActions): ICountData {
  switch (action.type) {
    case PlayersActionTypes.LOAD_PLAYERS_COUNTS:
      return { ...state, isLoading: true };
    case PlayersActionTypes.LOAD_PLAYERS_COUNTS_SUCCESS:
      return { ...state, isLoading: false, counts: { ...action.payload } };
    default:
      return state;
  }
}

// player total reducer
export function playersTotals(state = initialStatePlayerTotals, action: PlayersActions): ITotalData {
  switch (action.type) {
    case PlayersActionTypes.LOAD_PLAYERS_TOTALS:
      return { ...state, isLoading: true };
    case PlayersActionTypes.LOAD_PLAYERS_TOTALS_SUCCESS:
      return { ...state, isLoading: false, totals: [ ...(action.payload || [])] };
    default:
      return state;
  }
}

// player rankings
export function playersRankings(state = initialStatePlayerRanks, action: PlayersActions): IRankingData {
  switch (action.type) {
    case PlayersActionTypes.LOAD_PLAYERS_RANKINGS:
      return { ...state, isLoading: true };
    case PlayersActionTypes.LOAD_PLAYERS_RANKINGS_SUCCESS:
      return { ...state, isLoading: false, rankings: [...(action.payload || [])] };
    default:
      return state;
  }
}

// Players records
export function playersRecords(state = initialStatePlayerRecords, action: PlayersActions): IRecordData {
  switch (action.type) {
    case PlayersActionTypes.LOAD_PLAYERS_RECORDS:
      return { ...state, isLoading: true };
      case PlayersActionTypes.LOAD_PLAYERS_RECORDS_SUCCESS:
        return { ...state, isLoading: false, records: [...(action.payload || [])] };
    default:
      return state;
  }
}

// player pros
export function playersPros(state = initialStatePlayerProps, action: PlayersActions): IProData {
  switch (action.type) {
    case PlayersActionTypes.LOAD_PLAYERS_PROS:
      return { ...state, isLoading: true };
    case PlayersActionTypes.LOAD_PLAYERS_PROS_SUCCESS:
      return { ...state, isLoading: false, pros: [...(action.payload || [])] };
    default:
      return state;
  }
}

// Players histograms
export function playersHistograms(state = initialStatePlayerHistograms, action: PlayersActions): IHistogramData {
  switch (action.type) {
    case PlayersActionTypes.LOAD_PLAYERS_HISTOGRAMS:
      return { ...state, isLoading: true };
      case PlayersActionTypes.LOAD_PLAYERS_HISTOGRAMS_SUCCESS:
        return { ...state, isLoading: false, histograms: [...(action.payload || [])] };
    default:
      return state;
  }
}

// Players trends
export function playersTrends(state = initialStatePlayerTrends, action: PlayersActions): ITrendData {
  switch (action.type) {
    case PlayersActionTypes.LOAD_PLAYERS_TRENDS:
      return { ...state, isLoading: true };
      case PlayersActionTypes.LOAD_PLAYERS_TRENDS_SUCCESS:
        return { ...state, isLoading: false, trends: [...(action.payload || [])] };
    default:
      return state;
  }
}

// Players wardmap

// Players wordcloud

// Players ratings
export function playersRatings(state = initialStatePlayerRatings, action: PlayersActions): IRatingData {
  switch (action.type) {
    case PlayersActionTypes.LOAD_PLAYERS_RATINGS:
      return { ...state, isLoading: true };
    case PlayersActionTypes.LOAD_PLAYERS_RATINGS_SUCCESS:
      return { ...state, isLoading: false, ratings: [...(action.payload || [])] };
    default:
      return state;
  }
}

// Pros players
export function proPlayers(state = initialStateProPlayers, action: PlayersActions): IProData {
  switch (action.type) {
    case PlayersActionTypes.LOAD_PRO_PLAYERS:
      return { ...state, isLoading: true };
    case PlayersActionTypes.LOAD_PRO_PLAYERS_SUCCESS:
      return { ...state, isLoading: false, pros: [...(action.payload || [])] };
    default:
      return state;
  }
}
