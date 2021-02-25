import * as fromRoot from '../../../model/app';

export interface IAppState extends fromRoot.IAppState {
  IQuery: IQuery;
}

export interface IQuery {
  limit?: number;
  offset?: number;
  win?: number;
  patch?: number;
  game_mode?: number;
  lobby_type?: number;
  region?: number;
  date?: number;
  lane_role?: number;
  hero_id?: number;
  is_radiant?: number;
  included_account_id?: number;
  excluded_account_id?: number;
  with_hero_id?: number;
  against_hero_id?: number;
  significant?: number;
  having?: number;
  sort?: string;
}

// - name: limit
//   in: query
//   description: Number of matches to limit to
//   required: false
//   type: integer
// - name: offset
//   in: query
//   description: Number of matches to offset start by
//   required: false
//   type: integer
// - name: win
//   in: query
//   description: Whether the player won
//   required: false
//   type: integer
// - name: patch
//   in: query
//   description: Patch ID
//   required: false
//   type: integer
// - name: game_mode
//   in: query
//   description: Game Mode ID
//   required: false
//   type: integer
// - name: lobby_type
//   in: query
//   description: Lobby type ID
//   required: false
//   type: integer
// - name: region
//   in: query
//   description: Region ID
//   required: false
//   type: integer
// - name: date
//   in: query
//   description: Days previous
//   required: false
//   type: integer
// - name: lane_role
//   in: query
//   description: Lane Role ID
//   required: false
//   type: integer
// - name: hero_id
//   in: query
//   description: Hero ID
//   required: false
//   type: integer
// - name: is_radiant
//   in: query
//   description: Whether the player was radiant
//   required: false
//   type: integer
// - name: included_account_id
//   in: query
//   description: Account IDs in the match (array)
//   required: false
//   type: integer
// - name: excluded_account_id
//   in: query
//   description: Account IDs not in the match (array)
//   required: false
//   type: integer
// - name: with_hero_id
//   in: query
//   description: Hero IDs on the player's team (array)
//   required: false
//   type: integer
// - name: against_hero_id
//   in: query
//   description: Hero IDs against the player's team (array)
//   required: false
//   type: integer
// - name: significant
//   in: query
// tslint:disable-next-line:max-line-length
//   description: 'Whether the match was significant for aggregation purposes. Defaults to 1 (true), set this to 0 to return data for non-standard modes/matches.'
//   required: false
//   type: integer
// - name: having
//   in: query
//   description: 'The minimum number of games played, for filtering hero stats'
//   required: false
//   type: integer
// - name: sort
//   in: query
//   description: The field to return matches sorted by in descending order
//   required: false
//   type: string
