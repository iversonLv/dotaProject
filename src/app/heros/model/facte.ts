import * as fromRoot from '../../../model/app';

export interface IAppState extends fromRoot.IAppState {
  IFacte: IFacte;
}

export interface IFacte {
  name: string;
  icon: string;
  color: string;
  gradient_id: number;
  title: string;
  description: string;
}
