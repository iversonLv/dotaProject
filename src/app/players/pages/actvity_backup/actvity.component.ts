import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';

// model
import { IMatchData } from 'src/app/matches/model/match';

// ngrx
import { Store } from '@ngrx/store';
import * as playersActions from '../../store/players.actions';

@Component({
  selector: 'app-actvity',
  templateUrl: './actvity.component.html',
  styleUrls: ['./actvity.component.scss']
})
export class ActvityComponent implements OnInit {
  playersMatches$: Observable<IMatchData>;
  queryParams;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private store: Store<{ playersMatches: IMatchData }>
  ) { }

  ngOnInit(): void {
    this.playersMatches$ = this.store.select('playersMatches');

    const currentUrl = this.router.url;
    const accountId = +currentUrl.split('/')[2];
    this.activatedRoute.queryParamMap.subscribe(data => this.queryParams = data);

    this.store.dispatch(new playersActions.LoadPlayersMatches(accountId, this.queryParams));

  }

}
