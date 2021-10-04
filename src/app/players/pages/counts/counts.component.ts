import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

// ngrx
import { Store } from '@ngrx/store';
import * as playersActions from '../../store/players.actions';

// model
import { ICountData } from '../../model/count';

// dotaconstans
import patch from 'dotaconstants/build/patch.json';
import gameMode from 'dotaconstants/build/game_mode.json';
import lobbyType from 'dotaconstants/build/lobby_type.json';
import region from 'dotaconstants/build/region.json';

// assets which do not exist in dotaconstants
import laneRole from '../../../../assets/data/lane_role.json';
import sides from '../../../../assets/data/sides.json';
import leaverStatus from '../../../../assets/data/leaver_status.json';

@Component({
  selector: 'app-counts',
  templateUrl: './counts.component.html',
  styleUrls: ['./counts.component.scss']
})
export class CountsComponent implements OnInit {
  isLoading = false;
  queryParams;
  leaverStatus: any = leaverStatus;
  gameMode: any = gameMode;
  lobbyType: any = lobbyType;
  laneRole: any = laneRole;
  region: any = region;
  patch: any = patch;
  sides: any = sides;
  playersCountsDestructData: any = {};

  constructor(
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
  }

}
