import * as fromRoot from '../../../model/app';

export interface IAppState extends fromRoot.IAppState {
  IHeroesPlayed: IHeroesPlayed;
}

export interface IHeroesPlayedData {
  isLoading: boolean;
  heroesPlayed: IHeroesPlayed[];
}

export interface IHeroesPlayed {
  hero_id: string;
  last_played: number;
  games: number;
  win: number;
  with_games: number;
  with_win: number;
  against_games: number;
  against_win: number;
}
