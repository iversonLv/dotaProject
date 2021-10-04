import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Observable } from 'rxjs';
// ngrx
import { Store } from '@ngrx/store';
import * as playersActions from '../../store/players.actions';

// model
import { IPeerData, IPeer } from '../../model/peer';
import { IHeroesPlayed, IHeroesPlayedData } from '../../model/hero-played';
import { IheroLocal } from 'src/app/heros/model/heroLocal';
import { ICount, ICountData } from '../../model/count';

import { IMatch, IMatchData } from 'src/app/matches/model/match';
import { IRecentMatch, IRecentMatchData } from 'src/app/matches/model/recent-match';

// service
import { LaneRoleService } from 'src/app/services/lane-role.service';
import { SkillService } from 'src/app/services/skill.service';

// dotaconstans
import patch from 'dotaconstants/build/patch.json';
import gameMode from 'dotaconstants/build/game_mode.json';
import region from 'dotaconstants/build/region.json';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {  // table sort

  playersPeers: IPeer[];
  playersHeroesPlayed: IHeroesPlayed[];
  playersRecentMatches: IRecentMatch[];

  playersCountsDestructData: any = {};
  isLoading = true;
  dataSourceRecentMatchesIsLoading = false;
  dataSourcePeersIsLoading = false;
  dataSourceHeroesPlayedIsLoading = false;

  playersPeers$: Observable<IPeerData>;
  playersHeroesPlayed$: Observable<IHeroesPlayedData>;
  playersRecentMatches$: Observable<IRecentMatchData>;

  avgMaxData$: Observable<IRecentMatchData | IMatchData>;

  playersCounts$: Observable<ICountData>;

  queryParams;
  enableTurbo = true;
  queryParamsHasValue = false;

  // cal top one ranking for base to calculate percentage the bar
  playersPeerWithGameLargest: any;
  playersHeroesWithGameLargest: any;

  // User for hero modal to mapping
  lobbyTypeLocal: any;
  gameMode: any = gameMode;
  region: any = region;
  patch: any = patch;
  laneRoleLocal: any;
  skillLocal: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private laneRoleService: LaneRoleService,
    private skillService: SkillService,
    private store: Store<{
      playersMatches: IMatchData,
      playersRecentMatches: IRecentMatchData,
      playersCounts: ICountData,
    }>,
  ) {
    this.playersCounts$ = store.select('playersCounts');
  }

  ngOnInit(): any {
    const currentUrl = this.router.url;
    const accountId = +currentUrl.split('/')[2];
    this.activatedRoute.queryParamMap.subscribe(data => this.queryParams = data);

    // load player counts
    this.store.dispatch(new playersActions.LoadPlayersCounts(accountId, this.queryParams));
    this.store.select('playersCounts').subscribe(data => {
      this.isLoading = data.isLoading;
      if (!data.isLoading) {
        this.isLoading = data.isLoading;
        const dataIn = {...data.counts};
        const countDataKeyArr = Object.keys(dataIn);
        for (const value of countDataKeyArr) {
          this.playersCountsDestructData[value] = [];
          for (const key in dataIn[value]){
            if (dataIn[value].hasOwnProperty(key)){
              this.playersCountsDestructData[value].push({id: key, ...dataIn[value][key]});
              // is_radiant and patch are not sort via games number
              if (value !== 'is_radiant' && value !== 'patch') {
                // tslint:disable-next-line:max-line-length
                this.playersCountsDestructData[value] = this.playersCountsDestructData[value].sort((a, b) => b.games - a.games);
              }
              // patch only show latest patch
              if (value === 'patch') {
                // tslint:disable-next-line:max-line-length
                this.playersCountsDestructData[value] = this.playersCountsDestructData[value].sort((a, b) => b.id - a.id);
              }
              this.playersCountsDestructData[value] = this.playersCountsDestructData[value].splice(0, 2);
              // game_mode and lane_role won't count unknow data as chart
              if (value === 'game_mode' || value === 'lane_role' || value === 'region') {
                // tslint:disable-next-line:max-line-length
                this.playersCountsDestructData[value] = this.playersCountsDestructData[value].filter(item => item.id !== '0');
              }
            }
          }
        }
      }
    }, err => {
      console.log(err);
    });

    this.checkQueryParams(accountId);
    // get all heroes local data
    this.getLaneRoleLocal();
  }

  async checkQueryParams(accountId): Promise<any> {
    // during select the filter dropdown or click clear button
    this.router.events
    .subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // example url is http://localhost:4200/players/128741677/overview?hero_id=102&is_radiant=1
        // split the event.url separator as '?' and validate whether [1] is undefinded or not
        const currentRoute = event.url.split('?')[1]; // grab 'hero_id=102&is_radiant=1'
        if (currentRoute === undefined) {
          this.queryParamsHasValue = false;
          this.store.dispatch(new playersActions.LoadPlayersRecentMatches(accountId));
          this.avgMaxData$ = this.store.select('playersRecentMatches');

        } else {
          this.queryParamsHasValue = true;
          this.store.dispatch(new playersActions.LoadPlayersMatches(accountId, this.queryParams));
          this.avgMaxData$ = this.store.select('playersMatches');
          this.enableTurbo = true;
        }
      }
    });

    // this is for reload the browser
    if (Object.keys(this.queryParams.params).length > 0) {
      this.queryParamsHasValue = true;
      this.store.dispatch(new playersActions.LoadPlayersMatches(accountId, this.queryParams));
      this.avgMaxData$ = this.store.select('playersMatches');
      this.enableTurbo = true;
    } else {
      this.queryParamsHasValue = false;
      this.store.dispatch(new playersActions.LoadPlayersRecentMatches(accountId));
      this.avgMaxData$ = this.store.select('playersRecentMatches');
    }
  }

  filterMatchesLobbyMode(matches: IMatch[] | IRecentMatch[], enableTurbo): IMatch[] | IRecentMatch[] {
    matches = matches.filter(i => i.lobby_type !== 4);
    if (!enableTurbo) {
      matches = matches.filter(i => i.game_mode !== 23);
    }
    return matches;
    // co op bot = 4
    // turbo = 23
  }

  getLaneRoleLocal(): any {
    this.isLoading = false;
    this.laneRoleService.getLaneRoleLocal().subscribe(data => {
      this.laneRoleLocal = data;
      this.isLoading = true;
    }, err => {
      console.log(err);
    });
  }

  getSkillLocal(): any {
    this.isLoading = false;
    this.skillService.getSkillLocal().subscribe(data => {
      this.skillLocal = data;
      this.isLoading = true;
    }, err => {
      console.log(err);
    });
  }

}
