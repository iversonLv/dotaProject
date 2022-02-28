import { Component, Input, OnInit } from '@angular/core';

// dotaconstatns
import region from 'dotaconstants/build/region.json';
import gameMode from 'dotaconstants/build/game_mode.json';

// ngrx
import * as matchesActions from '../../store/matches.actions';

// services
import { Store } from '@ngrx/store';

// model
import { IParseMatchData } from '../../model/parse-match';
import { IParseMatchJobData } from '../../model/parse-match-job';

@Component({
  selector: 'app-match-hero',
  templateUrl: './match-hero.component.html',
  styleUrls: ['./match-hero.component.scss']
})
export class MatchHeroComponent implements OnInit {
  @Input() data: any;

  gameMode: any = gameMode;
  region: any = region;

  constructor(
    private store: Store<{ parseMatchJob: IParseMatchJobData, parseMatch: IParseMatchData, }>
  ) { }

  ngOnInit(): void {
  }

  // reparse match
  parseMatch(matchId): any {
    this.store.dispatch(new matchesActions.ParseMatchJob(matchId));
    this.store.select('parseMatchJob').subscribe(jobData => {
      if (!jobData.isLoading) {
        if (!!jobData.job.jobId) {
          this.store.dispatch(new matchesActions.ParseMatch(jobData.job.jobId));
          this.store.select('parseMatch').subscribe(state => {
            if (!state.isLoading) {
              setTimeout(() => {
                window.location.reload();
              }, 3000);
            }
          });
        }
      }
    }, err => {
      console.log(err);
    });
  }

  // cal score
  calScore(data: any): any {
    return data.map(i => i.kills).reduce((cur, total) => cur + total, 0);
  }


}
