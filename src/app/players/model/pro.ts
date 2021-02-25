import * as fromRoot from '../../../model/app';

export interface IAppState extends fromRoot.IAppState {
  IPro: IPro;
}

export interface IProData {
  isLoading: boolean;
  pros: IPro[];

}

export interface IPro {
  account_id: number;
  against_games: number;
  against_win: number;
  avatar: string;
  avatarfull: string;
  avatarmedium: string;
  cheese: number;
  country_code: string;
  fantasy_role: number;
  fh_unavailable: boolean;
  full_history_time: string;
  games: number;
  is_locked: boolean;
  is_pro: boolean;
  last_login: string;
  last_match_time: string;
  last_played: number;
  loccountrycode: string;
  locked_until: number;
  name: string;
  personaname: string;
  plus: boolean;
  profileurl: string;
  steamid: string;
  team_id: number;
  team_name: string;
  team_tag: string;
  win: number;
  with_games: number;
  with_gpm_sum: number;
  with_win: number;
  with_xpm_sum: number;
}
