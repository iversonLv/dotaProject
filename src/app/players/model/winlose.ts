import * as fromRoot from '../../../model/app';

export interface IAppState extends fromRoot.IAppState {
  IWinlose: IWinlose;
}

export interface IWinloseData {
  isLoading: boolean;
  winlose: IWinlose;
}

export interface IWinlose {
  win: number;
  lose: number;
}
