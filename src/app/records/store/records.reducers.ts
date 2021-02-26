import { RecordsActions, RecordsActionTypes } from './records.actions';

// model
import { IRecordData } from '../model/record';

// init state for records
export const initialStateRecords: IRecordData = {
  isLoading: false,
  records: []
};

// record data
export function recordsList(state = initialStateRecords, action: RecordsActions): IRecordData {
  switch (action.type) {
    case RecordsActionTypes.LOAD_RECORDS:
      return { ...state, isLoading: true };
    case RecordsActionTypes.LOAD_RECORDS_SUCCESS:
      return { ...state, isLoading: false, records: [...(action.payload || [])] };
    default:
      return state;
  }
}
