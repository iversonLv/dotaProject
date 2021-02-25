import * as fromRoot from '../../../model/app';

export interface IAppState extends fromRoot.IAppState {
  IHeroAbility: IHeroAbility;
}

export interface IHeroAbility {
  abilities: string[];
  talents: ITalent[];
}

export interface ITalent {
  name: string;
  level: number;
}
