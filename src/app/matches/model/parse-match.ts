import * as fromRoot from '../../../model/app';

export interface IAppState extends fromRoot.IAppState {
  IParseMatch: IParseMatch;
}

export interface IParseMatchData {
  isLoading: boolean;
  parseMatchData: any;
}

export interface IParseMatch {
  id: number;
  type: string;
  timestamp: string;
  attempts: number;
  data: {
      match_id: number;
      game_mode: number;
      radiant_win: boolean;
      start_time: number;
      duration: number;
      pgroup: {
          0: {
              account_id: number;
              hero_id: number;
              player_slot: number;
          };
          1: {
            account_id: number;
            hero_id: number;
            player_slot: number;
          };
          2: {
            account_id: number;
            hero_id: number;
            player_slot: number;
          };
          3: {
            account_id: number;
            hero_id: number;
            player_slot: number;
          };
          4: {
            account_id: number;
            hero_id: number;
            player_slot: number;
          };
          128: {
            account_id: number;
            hero_id: number;
            player_slot: number;
          };
          129: {
            account_id: number;
            hero_id: number;
            player_slot: number;
          };
          130: {
            account_id: number;
            hero_id: number;
            player_slot: number;
          };
          131: {
            account_id: number;
            hero_id: number;
            player_slot: number;
          };
          132: {
            account_id: number;
            hero_id: number;
            player_slot: number;
          }
      };
      doLogParse: boolean;
      ability_upgrades: [];
  };
  next_attempt_time: string;
  priority: number;
  jobId: number;
}
