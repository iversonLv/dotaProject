import { Component, Input, OnInit, ViewChild } from '@angular/core';

// material
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

// model
import { IheroLocal } from 'src/app/heros/model/heroLocal';
import { IObsSenLeftLog, IObsSenLog } from '../../model/match';


@Component({
  selector: 'app-table-match-detail-vision',
  templateUrl: './table-match-detail-vision.component.html',
  styleUrls: ['./table-match-detail-vision.component.scss'],
})
export class TableMatchDetailVisionComponent implements OnInit {
  @Input() data: any;
  @Input() playerColors: any;
  @Input() heroes: IheroLocal;
  // above is common player column
  @ViewChild(MatSort) set matSort(mp: MatSort) {
    this.sort = mp;
    this.setDataSourceAttributes();
  }
  dataSource = new MatTableDataSource();
  displayedColumns: string[] = [
    'player_slot',
  ];
  sort;
  finalData = [];

  objCol = {
    purchase_ward_observer: {
      title: 'PUR',
      is: 'ward_observer_lg',
      tooltip: 'Observer Ward purchases'
    },
    obs_placed: {
      title: 'USE',
      is: 'ward_observer_lg',
      tooltip: 'Observer Ward uses'
    },
    observer_duration: {
      title: 'DUR',
      is: 'ward_sentry_lg',
      tooltip: 'Average lifespan of Observer Wards'
    },
    purchase_ward_sentry: {
      title: 'PUR',
      is: 'ward_sentry_lg',
      tooltip: 'Sentry Ward purchases'
    },
    sen_placed: {
      title: 'USE',
      is: 'ward_sentry_lg',
      tooltip: 'Sentry Ward uses'
    },
    sentry_duration: {
      title: 'DUR',
      is: 'ward_sentry_lg',
      tooltip: 'Average lifespan of Sentry Wards'
    },
    dust_purchase: {
      title: 'PUR',
      is: 'dust_lg',
      tooltip: 'Dust of Appearance purchases'
    },
    dust_item_uses: {
      title: 'USE',
      is: 'dust_lg',
      tooltip: 'Number of times Dust of Appearance was used during the game'
    },
    smoke_of_deceit_purchase: {
      title: 'PUR',
      is: 'smoke_of_deceit_lg',
      tooltip: 'Smoke of Deceit purchases'
    },
    smoke_of_deceit_item_uses: {
      title: 'USE',
      is: 'smoke_of_deceit_lg',
      tooltip: 'Number of times Smoke of Deceit was used during the game'
    },
    purchase_gem: {
      title: 'PUR',
      is: 'gem_lg',
      tooltip: 'Gem of True Sight purchases'

    }
  };
  constructor(
  ) { }

  ngOnInit(): void {
    this.displayedColumns.push(...Object.keys(this.objCol));
    // extract the data
    this.dataSource.data = this.extractData(this.data);
  }

  // extract matches players[] to less data to meet for this page table
  extractData(data: any ): any[] {
    data.forEach((d, i) => {
      const { hero_id, player_slot, pred_vict, account_id, rank_tier, name, personaname,
        purchase_ward_observer, purchase_ward_sentry,
        obs_placed, sen_placed,
        purchase_gem, item_uses, purchase, obs_left_log, obs_log, sen_left_log, sen_log, duration } = data[i];
      this.finalData.push({
        hero_id,
        pred_vict,
        player_slot,
        account_id,
        rank_tier,
        name,
        personaname,
        // above is common data for player
        purchase_ward_observer,
        obs_placed,
        purchase_ward_sentry,
        sen_placed,
        purchase_gem,

        dust_purchase: purchase.dust,
        dust_item_uses: item_uses.dust,
        smoke_of_deceit_purchase: purchase.smoke_of_deceit,
        smoke_of_deceit_item_uses: item_uses.smoke_of_deceit,

        observer_duration: this.calAverageDuration(duration, obs_left_log, obs_log),
        sentry_duration: this.calAverageDuration(duration, sen_left_log, sen_log)
      });
    });
    return this.finalData;
  }

  // set table sort
  setDataSourceAttributes(): any {
    this.dataSource.sort = this.sort;
  }

  // call max number of column item
  extractPerfectTotalData(data: any, field: string, subField?: string): any[] {
    const dataField = data.map(item => item[field]).filter(i => i !== undefined);
    const dataWithSubField = dataField
      .map(sub => {
        if (subField) {
          // some field above is same key name under purchase and item_uses,
          // so we need to get rid of the field to match  the key to cal the max number
          // Example: dust_purchase: purchase.dust, dust_item_uses: item_uses.dust, same key 'dust', so with _[field] to distinguish
          // then in calPerfectData, get rid of it with replay()
          subField = subField.replace('_' + field, '');
          return sub[subField];
        }
      })
      .filter(i => i !== undefined);
    if (subField) {
      return dataWithSubField;
    }
    return dataField;
  }

  calPerfectData(data: any, field: string, subField?: string): number {
    const dataSet = this.extractPerfectTotalData(data, field, subField);
    return Math.max(...dataSet);
  }

  calPerfectDataForObsSenDuration(data: any, field: string[]): number {
    const arr = [];
    data.forEach(i => {
      if (this.calAverageDuration(i[field[0]], i[field[1]], i[field[2]]) !== '-') {
        arr.push(this.calAverageDuration(i[field[0]], i[field[1]], i[field[2]]));
      }
    });
    return Math.max(...arr);
  }


  // need cal left or place obs keys, the array are not pair one by one so now use keys to mapping
  calData(leftOrPlace: IObsSenLeftLog[] | IObsSenLog[] ): any {
    const a = {};
    leftOrPlace.forEach((item) => {
      a[item.key] = { ...item };
    });
    return {...a};
  }

  // cal specific average duration
  calAverageDuration(duration: number, left: IObsSenLeftLog[], place: IObsSenLog[]): any {
    const arr = [];
    const leftData = this.calData(left);
    const placeData = this.calData(place);
    const placeDataKey = Object.keys(placeData);
    placeDataKey.forEach(i => {
      if (leftData[i]) {
        arr.push(leftData[i].time - placeData[i].time);
      } else {
        // if left data does not has place key data, then it will be treated that obs is placed and lasts till end of the match
        arr.push(duration - placeData[i].time);
      }
    });
    if (arr.length === 0) {
      return '-';
    } else {
      return (arr.reduce((cur, total) => cur + total, 0)) / place.length;
    }
  }

  // cal table footer bottom total
  calTotal(data: any): any {
    return Object.values(data).reduce((cur, total) => +cur + +total, 0);
  }

  calTotalData(data: any, field: string, subField?: string): number | string {
    const dataSet = this.extractPerfectTotalData(data, field, subField);
    return this.calTotal(dataSet) === 0 ? '-' : this.calTotal(dataSet);
  }

  // cal total averageDuration
  calTotalAverageDuration(data: any[], left: string, place: string): any {
    const arr = [];
    data.forEach(i => {
      if (i[left] && i[place]) {
        const d = this.calAverageDuration(data[0].duration, i[left], i[place]);
        if (d !== '-') {
          arr.push(d);
        }
      }
    });
    if (arr.length === 0) {
      return '-';
    } else {
      // we only cal the average duartion for used player rather than the whole length of the data,
      // Example there are only 3 players used of total 5 players of a team, average will be cal those 3 players
      return (arr.reduce((cur, total) => cur + total, 0)) / arr.length;
    }
  }

}
