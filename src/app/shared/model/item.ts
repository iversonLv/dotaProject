import * as fromRoot from '../../../model/app';

export interface IAppState extends fromRoot.IAppState {
  IItemLocal: IItemLocal;
}

export interface IAttrib {
  key: string;
  header: string;
  value: string;
  footer: string;
}

export interface IItemLocal {
  hint: string[];
  id: number;
  img: string;
  dname: string;
  qual: string;
  cost: number;
  notes: string;
  attrib: IAttrib[];
  mc: boolean;
  cd: number;
  lore: string;
  components: string[];
  created: boolean;
  charges: boolean;
}
