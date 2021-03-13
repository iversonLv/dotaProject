import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

// ngrx
import { Store } from '@ngrx/store';
import * as matchesActions from '../../store/matches.actions';
import * as teamsActions from 'src/app/teams/store/teams.actions';

// model
import { ISingleMatchData } from '../../model/onematch';
import { ITeamData } from 'src/app/teams/model/team';
import { IheroLocal } from 'src/app/heros/model/heroLocal';
import { HerosService } from 'src/app/heros/services/heros.service';

@Component({
  selector: 'app-match-detail',
  templateUrl: './match-detail.component.html',
  styleUrls: ['./match-detail.component.scss']
})
export class MatchDetailComponent implements OnInit {
  isLoading = false;
  matchData: any;

  // User for hero modal to mapping
  heroesLocal: IheroLocal;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private herosService: HerosService,
    private store: Store<{ singleMatch: ISingleMatchData, teamsGeneral: ITeamData, }>
  ) { }

  ngOnInit(): void {
    const matchId = this.activatedRoute.snapshot.paramMap.get('id');
    this.store.dispatch(new matchesActions.LoadMatch(matchId));
    this.store.select('singleMatch').subscribe(data => {
      this.isLoading = data.isLoading;
      if (!data.isLoading) {
        const singleMatchData = [ ...data.match ];
        this.isLoading = data.isLoading;
        this.matchData = singleMatchData[0];
        return this.matchData;
      }
    }, err => {
      console.log(err);
    });

    // get all heroes local data
    this.getHeroesLocal();
  }


  getHeroesLocal(): any {
    this.herosService.getHeroesLocal().subscribe(data => {
      this.heroesLocal = data;
    }, err => {
      console.log(err);
    });
  }

}
