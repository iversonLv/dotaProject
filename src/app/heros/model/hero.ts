import * as fromRoot from '../../../model/app';

export interface IAppState extends fromRoot.IAppState {
  IHero: IHero;
}

export interface IHeroData {
  isLoading: boolean;
  heros: IHero[];
}

export interface IHero {
  id: number;
  name: string;
  localized_name: string;
  primary_attr: string;
  attack_type: string;
  roles: string[];
  legs: number;
}
