import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

// ngrx
import { Store } from '@ngrx/store';
import * as herosActions from '../../store/heros.actions';

// model
import { IMatchupsDurationPlayerData } from '../../model/matchup-duration-player';

@Component({
  selector: 'app-durations',
  templateUrl: './durations.component.html',
  styleUrls: ['./durations.component.scss']
})
export class DurationsComponent implements OnInit {
  herosDurations$: Observable<IMatchupsDurationPlayerData>;

  constructor(
    private router: Router,
    private store: Store<{ herosDurations: IMatchupsDurationPlayerData }>
  ) {
    this.herosDurations$ = this.store.select('herosDurations');
  }

  ngOnInit(): void {
    const currentUrl = this.router.url;
    const heroId = +currentUrl.split('/')[2];
    this.store.dispatch(new herosActions.LoadHerosDurations(heroId));
  }

}
