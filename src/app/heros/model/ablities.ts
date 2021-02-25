import * as fromRoot from '../../../model/app';

export interface IAppState extends fromRoot.IAppState {
  IAbility: IAbility;
}

export interface IAttrib {
  key: string;
  header: string;
  value: string | string[];
  generated?: boolean;
}

export interface ITalent {
  name: string;
  level: number;
}

export interface IAbility {
  dname: string;
  behavior: string;
  dmg_type: string;
  bkbpierce?: string;
  desc: string;
  attrib: IAttrib[];
  mc: string | string[];
  cd: string | string[];
  img: string;
}
