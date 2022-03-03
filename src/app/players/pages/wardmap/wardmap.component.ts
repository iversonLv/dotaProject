import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

// ngrx
import { Store } from '@ngrx/store';
import * as playersAction from '../../store/players.actions';

@Component({
  selector: 'app-wardmap',
  templateUrl: './wardmap.component.html',
  styleUrls: ['./wardmap.component.scss']
})
export class WardmapComponent implements OnInit {
  accountId;
  isLoading: false;
  queryParams;
  showLarge = false;
  selectedMap;
  wardMaps: any = [];
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private store: Store<{ playersWardMaps: any }>
  ) { }

  ngOnInit(): void {
    this.activatedRoute.queryParamMap.subscribe(data => this.queryParams = data);
    this.accountId = this.router.url.split('/')[2];

    this.store.dispatch(new playersAction.LoadPlayersWardMaps(this.accountId, this.queryParams));
    this.store.select('playersWardMaps').subscribe(data => {
      this.isLoading = data.isLoading;
      if (!data.isLoading) {
        const warmMpasData = {...data.wardMaps};
        this.wardMaps.push({ ...this.calSeriesData(warmMpasData.obs, 900), title: 'Observer'});
        this.wardMaps.push({ ...this.calSeriesData(warmMpasData.sen, 900), title: 'Sentry'});
        this.isLoading = data.isLoading;
        return this.wardMaps;
      }
    }, err => {
      console.log(err);
    });
  }

  showLargeMap(map): any {
    // if (this.selectedMap === map) {
    //   this.selectedMap = null;
    // } else {
    //   this.selectedMap = map;
    // }
  }

  // if map is 900*900, data should be *7
  // if map is 579*579, data should be *4.5

  /*
   * Unpacks position data from hash format to array format
   * 64 is the offset of x and y values
   * subtracting y from 127 inverts from bottom/left origin to top/left origin
  **/
 /**
  * input example:
  * {
  *   "140": {
  *       "152": 1
  *   },
  * }
  * output example:
  * [{
  *   value: 1
  *   x: 534.375
  *   y: 281.25
  * }]
  */
 // use this format https://github.com/odota/web/blob/d94cc9693ad866a1d833876623de839e01b49531/src/utility/index.jsx#L311
 calSeriesData(data, mapSize): any {
    if (typeof data === 'object' && !Array.isArray(data)) {
      const value = [];
      const result = {
        data: [],
        min: null,
        max: null
      };

      Object.keys(data).forEach((x) => {
        Object.keys(data[x]).forEach((y) => {
          value.push(data[x][y]);
          result.data.push([
            (Number(x) - 64) * mapSize / 128,
            (128 - (Number(y) - 64)) * mapSize / 128,
            data[x][y],
          ]);
        });
      });
      result.min = Math.min(...value);
      result.max = Math.max(...value);
      return result;
    }
  }
}
