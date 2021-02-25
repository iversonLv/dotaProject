import * as fromRoot from '../../../model/app';

export interface IAppState extends fromRoot.IAppState {
  IHero: IHero;
}

export interface IHeroData {
  heroes: IHero[];
  isLoading: boolean;
}

export interface IHero {
  games_played: number;
  hero_id: number;
  localized_name: string;
  wins: number;
}
