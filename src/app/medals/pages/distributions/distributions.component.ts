import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

// ngrx
import { Store } from '@ngrx/store';
import * as playersActions from '../../../players/store/players.actions';

@Component({
  selector: 'app-distributions',
  templateUrl: './distributions.component.html',
  styleUrls: ['./distributions.component.scss']
})
export class DistributionsComponent implements OnInit {
  rankTierDistribution$: Observable<any>;
  constructor(
    private store: Store<{ rankTierDistribution: any }>
  ) {
    this.rankTierDistribution$ = this.store.select('rankTierDistribution');
  }

  ngOnInit(): void {
    this.store.dispatch(new playersActions.LoadRankTierDistribution());
  }

}
