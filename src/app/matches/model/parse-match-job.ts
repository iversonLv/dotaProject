import * as fromRoot from '../../../model/app';

export interface IAppState extends fromRoot.IAppState {
  IParseMatchJob: IParseMatchJob;
}

export interface IParseMatchJobData {
  isLoading: boolean;
  job: any;
}

export interface IParseMatchJob {
  jobId: number;
}
