import * as fromRoot from '../../../model/app';

export interface IAppState extends fromRoot.IAppState {
  IHistogram: IHistogram;
}

export interface IHistogramData {
  isLoading: boolean;
  histograms: IHistogram[];
}

export interface IHistogram {
  games: number;
  win: number;
  x: number;
}
