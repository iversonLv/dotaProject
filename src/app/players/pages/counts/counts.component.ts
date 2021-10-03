import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

// ngrx
import { Store } from '@ngrx/store';
import * as playersActions from '../../store/players.actions';

// service
import { GameModeService } from 'src/app/services/game-mode.service';
import { LaneRoleService } from 'src/app/services/lane-role.service';
import { LobbyTypeService } from 'src/app/services/lobby-type.service';
import { RegionService } from 'src/app/services/region.service';
import { LeaverStatusService } from 'src/app/services/leaver-status.service';
import { SideService } from 'src/app/services/side.service';

// model
import { ICountData } from '../../model/count';

// dotaconstans
import patch from 'dotaconstants/build/patch.json';

@Component({
  selector: 'app-counts',
  templateUrl: './counts.component.html',
  styleUrls: ['./counts.component.scss']
})
export class CountsComponent implements OnInit {
  isLoading = false;
  queryParams;
  leaverStatusLocal: any;
  gameModeLocal: any;
  lobbyTypeLocal: any;
  laneRoleLocal: any;
  regionLocal: any;
  patch: any;
  sidesLocal: any;
  playersCountsDestructData: any = {};

  constructor(
    private leaverStatusService: LeaverStatusService,
    private gameModeService: GameModeService,
    private lobbyTypeService: LobbyTypeService,
    private laneRoleService: LaneRoleService,
    private regionService: RegionService,
    private sideService: SideService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private store: Store<{ playersCounts: ICountData }>
  ) { }

  ngOnInit(): void {
    const currentUrl = this.router.url;
    const accountId = +currentUrl.split('/')[2];
    this.activatedRoute.queryParamMap.subscribe(data => this.queryParams = data);

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
              } else {
                this.playersCountsDestructData[value] = this.playersCountsDestructData[value].sort((a, b) => a.id - b.id);
              }
              // this.playersCountsDestructData[value] = this.playersCountsDestructData[value].splice(0, 2);
              // game_mode and lane_role won't count unknow data as chart
              // if (value === 'game_mode' || value === 'region') {
              //   // tslint:disable-next-line:max-line-length
              //   this.playersCountsDestructData[value] = this.playersCountsDestructData[value].filter(item => item.id !== '0');
              // }
            }
          }
        }
        // console.log(this.playersCountsDestructData);
        return this.playersCountsDestructData;
      }
    }, err => {
      console.log(err);
    });

    // get all heroes local data
    this.getLeaverStatusLocal();
    this.getGameModeLocal();
    this.getLobbyTypeLocal();
    this.getLaneRoleLocal();
    this.getRegionLocal();
    this.patch = patch;
    this.getSidesLocal();
  }

  getLeaverStatusLocal(): any {
    this.leaverStatusService.getLeaverStatusLocal().subscribe(data => {
      return this.leaverStatusLocal = data;
    }, err => {
      console.log(err);
    });
  }

  getSidesLocal(): any {
    this.sideService.getSidesLocal().subscribe(data => {
      return this.sidesLocal = data;
    }, err => {
      console.log(err);
    });
  }

  getRegionLocal(): any {
    this.regionService.getRegionLocal().subscribe(data => {
      this.regionLocal = data;
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


  getLaneRoleLocal(): any {
    this.laneRoleService.getLaneRoleLocal().subscribe(data => {
      this.laneRoleLocal = data;
    }, err => {
      console.log(err);
    });
  }
}
