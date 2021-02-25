import { Action } from '@ngrx/store';

// model
import { IHero } from '../model/hero';
import { IMatch } from '../model/match';
import { IPlayer } from '../model/player';
import { ITeam } from '../model/team';

// defind teams action types enum
export enum TeamsActionTypes {
  // For teams list
  LOAD_TEAMS = '[Teams] Load Teams',
  LOAD_TEAMS_SUCCESS = '[Teams] Load Teams Success',

  // For teams general (top hero part)
  LOAD_TEAMS_GENERAL = '[Teams] Load General',
  LOAD_TEAMS_GENERAL_SUCCESS = '[Teams] Load General Success',

  // For teams matches
  LOAD_TEAMS_MATCHES = '[Teams] Load Teams Matches',
  LOAD_TEAMS_MATCHES_SUCCESS = '[Teams Load Teams Matches Success]',

  // For teams heroes
  LOAD_TEAMS_HEROES = '[Teams] Load Teams Heroes',
  LOAD_TEAMS_HEROES_SUCCESS = '[Teams Load Teams Heroes Success]',

  // For teams players
  LOAD_TEAMS_PLAYERS = '[Teams] Load Teams Players',
  LOAD_TEAMS_PLAYERS_SUCCESS = '[Teams Load Teams Players Success]',
}

// load teams list data
// GET /teams
export class LoadTeams implements Action {
  readonly type = TeamsActionTypes.LOAD_TEAMS;

  constructor() {}
}
export class LoadTeamsSuccess implements Action {
  readonly type = TeamsActionTypes.LOAD_TEAMS_SUCCESS;

  constructor(public payload?: ITeam[]) {}
}

// load teams general data
// GET /teams/{team_id}
export class LoadTeamsGeneral implements Action {
  readonly type = TeamsActionTypes.LOAD_TEAMS_GENERAL;

  constructor(public teamId) {}
}
export class LoadTeamsGeneralSuccess implements Action {
  readonly type = TeamsActionTypes.LOAD_TEAMS_GENERAL_SUCCESS;

  constructor(public teamId, public payload?: ITeam) {}
}

// load teams matches
// GET /teams/{team_id}/matches
export class LoadTeamsMatches implements Action {
  readonly type = TeamsActionTypes.LOAD_TEAMS_MATCHES;

  constructor(public teamId) {}
}

export class LoadTeamsMatchesSuccess implements Action {
  readonly type = TeamsActionTypes.LOAD_TEAMS_MATCHES_SUCCESS;

  constructor(public teamId, public payload?: IMatch[]) {}
}

// load teams heroes
// GET /teams/{team_id}/heroes
export class LoadTeamsHeroes implements Action {
  readonly type = TeamsActionTypes.LOAD_TEAMS_HEROES;

  constructor(public teamId) {}
}

export class LoadTeamsHeroesSuccess implements Action {
  readonly type = TeamsActionTypes.LOAD_TEAMS_HEROES_SUCCESS;

  constructor(public teamId, public payload?: IHero[]) {}
}

// load teams players
// GET /teams/{team_id}/players
export class LoadTeamsPlayers implements Action {
  readonly type = TeamsActionTypes.LOAD_TEAMS_PLAYERS;

  constructor(public teamId) {}
}

export class LoadTeamsPlayersSuccess implements Action {
  readonly type = TeamsActionTypes.LOAD_TEAMS_PLAYERS_SUCCESS;

  constructor(public teamId, public payload?: IPlayer[]) {}
}

export type TeamsActions =
  LoadTeamsGeneral | LoadTeamsGeneralSuccess
  | LoadTeams | LoadTeamsSuccess
  | LoadTeamsMatches | LoadTeamsMatchesSuccess
  | LoadTeamsPlayers | LoadTeamsPlayersSuccess
  | LoadTeamsHeroes | LoadTeamsHeroesSuccess;
