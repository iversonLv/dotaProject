import { Injectable } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';

// ngrx
import { Action } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as searchActions from './search.actions';

// service
import { SearchService } from '../services/search.service';
import { ISearch } from '../model/search';

@Injectable()
export class SearchEffects {
  constructor(
    private actions$: Actions,
    private searchService: SearchService,
  ) {}

  // get search results list
  getSearchList$: Observable<Action> = createEffect(() =>
  this.actions$.pipe(
    ofType(searchActions.SearchActionTypes.LOAD_SEARCH),
    switchMap(({ searchQuery }) =>
      this.searchService.getSearchList(searchQuery)
        .pipe(
          map((results: ISearch[] )  =>
              new searchActions.LoadSearchSuccess(searchQuery, results)
          ),
          catchError(() =>
            EMPTY
          )
        )
      )
    ),
  );
}
