import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
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

// material for table
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';

// service
import { HerosService } from 'src/app/heros/services/heros.service';
import { LobbyTypeService } from 'src/app/services/lobby-type.service';
import { GameModeService } from 'src/app/services/game-mode.service';
import { PatchService } from 'src/app/services/patch.service';
import { LaneRoleService } from 'src/app/services/lane-role.service';
import { RegionService } from 'src/app/services/region.service';
import { SkillService } from 'src/app/services/skill.service';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit, AfterViewInit {  // table sort
  @ViewChild(MatSort) matSortPeers: MatSort;
  @ViewChild(MatSort) matSortHeroesPlayed: MatSort;
  @ViewChild(MatSort) matSortRecentMatches: MatSort;

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

  playersCounts$: Observable<ICountData>;

  queryParams;

  // hero modal default hidden
  // showHeroModal = false;
  queryParamsHasValue = false;
  // currentMouseOverHero: IheroLocal = null;
  // pageXY = [];

  // cal top one ranking for base to calculate percentage the bar
  playersPeerWithGameLargest: any;
  playersHeroesWithGameLargest: any;

  // User for hero modal to mapping
  heroesLocal: IheroLocal;
  lobbyTypeLocal: any;
  gameModeLocal: any;
  regionLocal: any;
  patchLocal: any;
  laneRoleLocal: any;
  skillLocal: any;

  // table for peers
  // displayedColumnsPeers: string[] = ['personaname', 'with_games_peer', 'win_pecentage'];
  // dataSourcePeers = new MatTableDataSource();
  // table for heroes played
  // displayedColumnsHeroesPlayed: string[] = ['hero_id_list', 'with_games_hero', 'win_pecentage_hero'];
  // dataSourceHeroesPlayed = new MatTableDataSource();

  // table for recentMatches
  displayedColumnsRecentMatches: string[] = ['hero_id', 'result', 'game_mode', 'duration', 'kills', 'deaths', 'assists'];
  dataSourceRecentMatches = new MatTableDataSource();




  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,

    // private herosService: HerosService,
    // private lobbyTypeService: LobbyTypeService,
    private gameModeService: GameModeService,
    private patchService: PatchService,
    private laneRoleService: LaneRoleService,
    private regionService: RegionService,
    private skillService: SkillService,

    private store: Store<{
      // playersPeers: IPeerData,
      // playersHeroesPlayed: IHeroesPlayedData,
      // playersRecentMatches: IRecentMatchData,
      playersCounts: ICountData,
    }>,
  ) {
    // this.playersPeers$ = store.select('playersPeers');
    // this.playersHeroesPlayed$ = store.select('playersHeroesPlayed');
    // this.playersRecentMatches$ = store.select('playersRecentMatches');
    this.playersCounts$ = store.select('playersCounts');
  }

  ngOnInit(): any {
    const currentUrl = this.router.url;
    const accountId = +currentUrl.split('/')[2];
    this.activatedRoute.queryParamMap.subscribe(data => this.queryParams = data);
    console.log(Object.keys(this.queryParams.params));

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
    // // load player peers
    // this.store.dispatch(new playersActions.LoadPlayersPeers(accountId, this.queryParams));
    // this.store.select('playersPeers').subscribe(data => {
    //   const dataPeers = [...data.peers];
    //   this.playersPeerWithGameLargest = data.peers[0];
    //   const dataNew = [];
    //   for (const i in dataPeers) {
    //     if (dataPeers.hasOwnProperty(i)) {
    //       const {account_id, avatar, last_played, with_win, with_games, personaname } = dataPeers[i];
    //       // restructure peers data to match the design, in order to sort correctly
    //       dataNew.push(
    //         {
    //           account_id,
    //           avatar,
    //           last_played,
    //           win_pecentage: with_win / with_games,
    //           personaname,
    //           with_games_peer: with_games
    //         }
    //         );
    //       }
    //     }
    //   this.dataSourcePeersIsLoading = data.isLoading;
    //   return this.dataSourcePeers.data = dataNew.splice(0, 5);
    // });

    // load heroes played
    // this.store.dispatch(new playersActions.LoadPlayersHeroesPlayed(accountId, this.queryParams));
    // this.store.select('playersHeroesPlayed').subscribe(data => {
    //   const dataHeroesPlayed = [...data.heroesPlayed];
    //   this.playersHeroesWithGameLargest = data.heroesPlayed[0];
    //   const dataNew = [];
    //   for (const i in dataHeroesPlayed) {
    //     if (dataHeroesPlayed.hasOwnProperty(i)) {
    //       const {hero_id, last_played, games, win } = dataHeroesPlayed[i];
    //       // restructure peers data to match the design, in order to sort correctly
    //       dataNew.push(
    //         {
    //           hero_id_list: hero_id,
    //           last_played,
    //           win_pecentage_hero: win / games,
    //           with_games_hero: games
    //         }
    //         );
    //       }
    //     }
    //   this.dataSourceHeroesPlayedIsLoading = data.isLoading;
    //   return this.dataSourceHeroesPlayed.data = dataNew.splice(0, 10);
    // });

    this.checkQueryParams();
    // get all heroes local data
    // this.getHeroesLocal();
    // this.getLobbyTypeLocal();
    this.getGameModeLocal();
    this.getRegionLocal();
    this.getPatchLocal();
    this.getLaneRoleLocal();
     // this.getSkillLocal();
  }

  ngAfterViewInit(): void {
    // this.dataSourcePeers.sort = this.matSortPeers;
    // this.dataSourceHeroesPlayed.sort = this.matSortHeroesPlayed;
    this.dataSourceRecentMatches.sort = this.matSortRecentMatches;

  }

  async checkQueryParams(): Promise<any> {
    // during select the filter dropdown or click clear button
    this.router.events
    .subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // example url is http://localhost:4200/players/128741677/overview?hero_id=102&is_radiant=1
        // split the event.url separator as '?' and validate whether [1] is undefinded or not
        const currentRoute = event.url.split('?')[1]; // grab 'hero_id=102&is_radiant=1'
        if (currentRoute === undefined) {
          this.queryParamsHasValue = false;
        } else {
          this.queryParamsHasValue = true;
        }
      }
    });

    // this is for reload the browser
    if (Object.keys(this.queryParams.params).length > 0) {
      this.queryParamsHasValue = true;
    } else {
      this.queryParamsHasValue = false;
    }


  }

  // getHeroesLocal(): any {
  //   this.herosService.getHeroesLocal().subscribe(data => {
  //     this.heroesLocal = data;
  //   }, err => {
  //     console.log(err);
  //   });
  // }

  // getLobbyTypeLocal(): any {
  //   this.lobbyTypeService.getLobbyTypeLocal().subscribe(data => {
  //     this.lobbyTypeLocal = data;
  //   }, err => {
  //     console.log(err);
  //   });
  // }

  getGameModeLocal(): any {
    this.isLoading = false;
    this.gameModeService.getGameModeLocal().subscribe(data => {
      this.gameModeLocal = data;
      this.isLoading = true;
    }, err => {
      console.log(err);
    });
  }

  getRegionLocal(): any {
    this.isLoading = false;
    this.regionService.getRegionLocal().subscribe(data => {
      this.regionLocal = data;
      this.isLoading = true;
    }, err => {
      console.log(err);
    });
  }

  getPatchLocal(): any {
    this.isLoading = false;
    this.patchService.getPatchLocal().subscribe(data => {
      this.patchLocal = data;
      this.isLoading = true;
    }, err => {
      console.log(err);
    });
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

  // showHeroModalFn(e, id): any {
  //   this.pageXY = [e.pageX + 50, e.pageY - 120];
  //   this.showHeroModal = true;
  //   this.currentMouseOverHero = this.heroesLocal[id];
  // }

}
