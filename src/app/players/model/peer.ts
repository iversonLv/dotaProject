import * as fromRoot from '../../../model/app';

export interface IAppState extends fromRoot.IAppState {
  IPeer: IPeer;
}

export interface IPeerData {
  isLoading: boolean;
  peers: IPeer[];
}

export interface IPeer {
    account_id: number;
    last_played: number;
    win: number;
    games: number;
    with_win: number;
    with_games: number;
    against_win: number;
    against_games: number;
    with_gpm_sum: number;
    with_xpm_sum: number;
    personaname: string;
    name: string;
    is_contributor: boolean;
    last_login: string;
    avatar: string;
    avatarfull: string;
}
