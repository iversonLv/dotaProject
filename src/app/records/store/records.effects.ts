import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { EMPTY, Observable } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';

// model
import { IRecord } from '../model/record';

// services
import { RecordsService } from '../services/records.service';

// model

// ngrx
import * as recordsActions from './records.actions';

@Injectable()
export class RecordsEffects {
  constructor(
    private actions$: Actions,
    private recordsService: RecordsService
  ) {}

  // get records data
  getRecores$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(recordsActions.RecordsActionTypes.LOAD_RECORDS),
      switchMap(({ field }) =>
        this.recordsService.getRecoresData(field)
        .pipe(
          map((records: IRecord[]) =>
            new recordsActions.LoadRecordsSuccess(field, records)
          ),
          catchError(() =>
            EMPTY
          )
        )
      )
    ),
  );
}
