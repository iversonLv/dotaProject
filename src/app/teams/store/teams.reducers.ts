import { TeamsActionTypes, TeamsActions } from './teams.actions';

// model
import { ITeamsData, ITeamData } from '../model/team';
import { IMatchData } from '../model/match';
import { IHeroData } from '../model/hero';
import { IPlayerData } from '../model/player';

// init state for teams list
export const initialStateTeams: ITeamsData = {
  isLoading: false,
  teams: [],
};

// init state for team general
export const initialStateGeneral: ITeamData = {
  isLoading: false,
  team: null,
};

// init state for teams matches
export const initialStateMatches: IMatchData = {
  isLoading: false,
  matches: [],
};

// init state for team heroes
export const initialStateHeroes: IHeroData = {
  isLoading: false,
  heroes: [],
};

// init state for team players
export const initialStatePlayers: IPlayerData = {
  isLoading: false,
  players: [],
};

// teams list data
export function teamsGeneral(state = initialStateGeneral, action: TeamsActions): ITeamData {
  switch (action.type) {
    case TeamsActionTypes.LOAD_TEAMS_GENERAL:
      return { ...state, isLoading: true };
    case TeamsActionTypes.LOAD_TEAMS_GENERAL_SUCCESS:
      return { ...state, isLoading: false, team: action.payload };
    default:
      return state;
  }
}

// teams list data
export function teamsList(state = initialStateTeams, action: TeamsActions): ITeamsData {
  switch (action.type) {
    case TeamsActionTypes.LOAD_TEAMS:
      return { ...state, isLoading: true };
    case TeamsActionTypes.LOAD_TEAMS_SUCCESS:
      return { ...state, isLoading: false, teams: [...(action.payload || [])] };
    default:
      return state;
  }
}

// teams matches data
export function teamsMatches(state = initialStateMatches, action: TeamsActions): IMatchData {
  switch (action.type) {
    case TeamsActionTypes.LOAD_TEAMS_MATCHES:
      return { ...state, isLoading: true };
      case TeamsActionTypes.LOAD_TEAMS_MATCHES_SUCCESS:
        return { ...state, isLoading: false, matches: [...(action.payload || [])] };
    default:
      return state;
  }
}

// teams heroes data
export function teamsHeroes(state = initialStateHeroes, action: TeamsActions): IHeroData {
  switch (action.type) {
    case TeamsActionTypes.LOAD_TEAMS_HEROES:
      return { ...state, isLoading: true };
      case TeamsActionTypes.LOAD_TEAMS_HEROES_SUCCESS:
        return { ...state, isLoading: false, heroes: [...(action.payload || [])] };
    default:
      return state;
  }
}

// teams players data
export function teamsPlayers(state = initialStatePlayers, action: TeamsActions): IPlayerData {
  switch (action.type) {
    case TeamsActionTypes.LOAD_TEAMS_PLAYERS:
      return { ...state, isLoading: true };
      case TeamsActionTypes.LOAD_TEAMS_PLAYERS_SUCCESS:
        return { ...state, isLoading: false, players: [...(action.payload || [])] };
    default:
      return state;
  }
}

