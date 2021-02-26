import * as fromRoot from '../../../model/app';

export interface IAppState extends fromRoot.IAppState {
  IRecord: IRecord;
}

export interface IRecordData {
  isLoading: boolean;
  records: IRecord[];
}

export interface IRecord {
  hero_id: string;
  match_id: string;
  score: string;
  start_time: string;
}
