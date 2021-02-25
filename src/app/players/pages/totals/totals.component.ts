import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

// ngrx
import { Store } from '@ngrx/store';
import * as playersActions from '../../store/players.actions';

// modal
import { ITotalData } from '../../model/total';

@Component({
  selector: 'app-totals',
  templateUrl: './totals.component.html',
  styleUrls: ['./totals.component.scss']
})
export class TotalsComponent implements OnInit {
  playersTotals$: Observable<ITotalData>;

  queryParams;

  constructor(
    private store: Store<{playersTotals: ITotalData}>,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) {
    this.playersTotals$ = this.store.select('playersTotals');
  }

  ngOnInit(): void {
    const currentUrl = this.router.url;
    const accountId = +currentUrl.split('/')[2];
    this.activatedRoute.queryParamMap.subscribe(data => this.queryParams = data);
    this.getPlayerTotals(accountId, this.queryParams);
  }

  getPlayerTotals(accountId: number, queryParams): any {
    this.store.dispatch(new playersActions.LoadPlayersTotals(accountId, queryParams));
  }

}
