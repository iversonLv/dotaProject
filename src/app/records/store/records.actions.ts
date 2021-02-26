import { Action } from '@ngrx/store';
import { IRecord } from '../model/record';

// enum for actions
export enum RecordsActionTypes {
  LOAD_RECORDS = '[Records] Load Records',
  LOAD_RECORDS_SUCCESS = '[Records] Load Records Success',
}

// actions

// get records
export class LoadRecords implements Action {
  readonly type = RecordsActionTypes.LOAD_RECORDS;

  constructor(public field) {}
}

export class LoadRecordsSuccess implements Action {
  readonly type = RecordsActionTypes.LOAD_RECORDS_SUCCESS;

  constructor(public field, public payload?: IRecord[]) {}
}

export type RecordsActions =
  LoadRecords | LoadRecordsSuccess;
