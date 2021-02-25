import * as fromRootApp from '../../../model/app';

export interface IAppState extends fromRootApp.IAppState {
  ITotal: ITotal;
}

export interface ITotalData {
  isLoading: boolean;
  totals: ITotal[];
}

export interface ITotal {
  field: string;
  n: number;
  sum: number;
}
