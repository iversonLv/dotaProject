import * as fromRoot from '../../../model/app';

export interface IAppState extends fromRoot.IAppState {
  IItemColorLocal: IItemColorLocal;
}

export interface IItemColorLocal {
  'rare': string;
  'artifact': string;
  'secret_shop': string;
  'consumable': string;
  'common': string;
  'epic': string;
  'component': string;
}
