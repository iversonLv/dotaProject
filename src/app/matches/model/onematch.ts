import * as fromRoot from '../../../model/app';
import { IMatch } from './match';

export interface IAppState extends fromRoot.IAppState {
  ISingleMatch: any;
}

export interface ISingleMatchData {
  isLoading: boolean;
  match: any;
}
