import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';

// model
import { IMatch, IMatchData } from 'src/app/matches/model/match';

// ngrx
import { Store } from '@ngrx/store';
import * as playersActions from '../../store/players.actions';

// services
import { HerosService } from 'src/app/heros/services/heros.service';
import { LobbyTypeService } from 'src/app/services/lobby-type.service';
import { GameModeService } from 'src/app/services/game-mode.service';
import { SkillService } from 'src/app/services/skill.service';
import { IheroLocal } from 'src/app/heros/model/heroLocal';

@Component({
  selector: 'app-actvity',
  templateUrl: './actvity.component.html',
  styleUrls: ['./actvity.component.scss']
})
export class ActvityComponent implements OnInit {
  playersMatches: IMatch[];
  playersMatchesParseData: any[];
  queryParams;
  isLoading = false;

  currentDate;

  heroesLocal: IheroLocal;
  lobbyTypeLocal: any;
  gameModeLocal: any;
  skillLocal: any;

  constructor(
    private herosService: HerosService,
    private lobbyTypeService: LobbyTypeService,
    private gameModeService: GameModeService,
    private skillService: SkillService,
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
      console.log(newData);
      return this.playersMatchesParseData = newData;
    }, err => {
      console.log(err);
    });

    // get all heroes local data
    this.getHeroesLocal();
    this.getLobbyTypeLocal();
    this.getGameModeLocal();
    this.getSkillLocal();
  }

  getHeroesLocal(): any {
    this.herosService.getHeroesLocal().subscribe(data => {
      this.heroesLocal = data;
    }, err => {
      console.log(err);
    });
  }

  getLobbyTypeLocal(): any {
    this.lobbyTypeService.getLobbyTypeLocal().subscribe(data => {
      this.lobbyTypeLocal = data;
    }, err => {
      console.log(err);
    });
  }

  getGameModeLocal(): any {
    this.gameModeService.getGameModeLocal().subscribe(data => {
      this.gameModeLocal = data;
    }, err => {
      console.log(err);
    });
  }

  getSkillLocal(): any {
    this.skillService.getSkillLocal().subscribe(data => {
      this.skillLocal = data;
    }, err => {
      console.log(err);
    });
  }

  emitClickSymble(date): any {
    if (this.currentDate !== date) {
      this.currentDate = date;
    } else if (this.currentDate === date) {
      this.currentDate = '';
    }
  }
}
