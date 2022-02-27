import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

// model
import { IMatch, IMatchData } from 'src/app/matches/model/match';
import { IheroLocal } from 'src/app/heros/model/heroLocal';

// ngrx
import { Store } from '@ngrx/store';
import * as playersActions from '../../store/players.actions';

// dotaconstatns
import heroes from 'dotaconstants/build/heroes.json';
import lobbType from 'dotaconstants/build/lobby_type.json';
import gameMode from 'dotaconstants/build/game_mode.json';

@Component({
  selector: 'app-actvity',
  templateUrl: './actvity.component.html',
  styleUrls: ['./actvity.component.scss']
})
export class ActvityComponent implements OnInit {
  playersMatches: IMatch[];
  playersMatchesParseData: any[];
  queryParams;
  isLoading = true;

  currentDate;

  heroes: any = heroes;
  lobbType: any = lobbType;
  gameMode: any = gameMode;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private store: Store<{ playersMatches: IMatchData }>
  ) {
    // this.playersMatches$ = this.store.select('playersMatches');
  }

  ngOnInit(): void {

    const currentUrl = this.router.url;
    const accountId = +currentUrl.split('/')[2];
    this.activatedRoute.queryParamMap.subscribe(data => this.queryParams = data);

    this.store.dispatch(new playersActions.LoadPlayersMatches(accountId, this.queryParams));
    this.store.select('playersMatches').subscribe(data => {
      this.isLoading = data.isLoading;
      if (!data.isLoading) {

        const newData = [];
        const objTotal = {};
        const objRange = {};
        const playersMatchesData = [...data.matches];

        for (const i of playersMatchesData) {
          const item = new Date(i.start_time *　1000).toISOString().slice(0, 10);
          const range = new Date(i.start_time *　1000).toISOString().slice(0, 4);
          objTotal[item] = (objTotal[item] + 1) || 1;
          objRange[range] = (objRange[range] + 1) || 1;
        }

        // list all unique date[]
        // ["2021-02-22", "2021-02-21", "2021-02-20", "2021-02-19"]
        const objTotalKeys = Object.keys(objTotal);
        // ["2021", "2020", "2019"] sort the range from now to past
        const objRangekeys = Object.keys(objRange).sort((a, b) =>  +b - +a);
        // find out all matches mapping unique date and push to new arr
        /*
        [
          {
            range: '2021',
            data: [
              date: '2021-02-22',
              matches: [] // here matches data is same with playersMatchesData
            ]
          }
        ]
        */
        for (const i of objRangekeys) {
          const subData = {};
          for (const k of objTotalKeys) {
            if (k.slice(0, 4) === i) {
              subData[k] = playersMatchesData.filter(item => new Date(item.start_time *　1000).toISOString().slice(0, 10) === k);
              // subData.push({
              //     date: k,
              //     matches: playersMatchesData.filter(item => new Date(item.start_time *　1000).toISOString().slice(0, 10) === k)
              // });
            }
          }
          newData.push({
            range: i,
            subData
          });
        }
        this.isLoading = data.isLoading;
        // console.log(newData);
        return this.playersMatchesParseData = newData;
      }
    }, err => {
      console.log(err);
    });

    // get all heroes local data
  }

  emitClickSymble(date): any {
    console.log(date);
    if (this.currentDate !== date) {
      this.currentDate = date;
    } else if (this.currentDate === date) {
      this.currentDate = '';
    }
  }
}
