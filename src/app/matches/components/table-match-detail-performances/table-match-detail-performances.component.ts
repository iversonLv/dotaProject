import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { IheroLocal } from 'src/app/heros/model/heroLocal';

@Component({
  selector: 'app-table-match-detail-performances',
  templateUrl: './table-match-detail-performances.component.html',
  styleUrls: ['./table-match-detail-performances.component.scss']
})
export class TableMatchDetailPerformancesComponent implements OnInit {
  @Input() data: any;
  @Input() playerColors: any;
  @Input() heroes: IheroLocal;
  @Input() heroNames: IheroLocal;
  @Input() abilities: any;
  @Output() showAbilityModalFn: any = new EventEmitter();
  @Output() hideAbilityModalFn: any = new EventEmitter();

  @ViewChild(MatSort) set matSort(mp: MatSort) {
    this.sort = mp;
    this.setDataSourceAttributes();
  }

  dataSource = new MatTableDataSource();
  displayedColumns: string[] = [
    'player_slot',
    'multi_kills',
    'kill_streaks',
    'stuns',
    'camps_stacked',
    'life_state_dead',
    'buyback_count',
    'pings',
    'max_hero_hit_value',
    'performance_others'
  ];
  sort;
  finalData = [];
  // call largest data for bar chart
  teamsLargest: any = {
    multi_kills: null,
    kill_streaks: null,
    stuns: null,
    life_state_dead: null,
    buyback_count: null,
    camps_stacked: null,
    pings: null,
  };
  constructor() { }

  ngOnInit(): void {
    // extract the data
    this.dataSource.data = this.extractData(this.data);
  }

  // extract matches players[] to less data to meet for this page table
  extractData(data): any[] {
    this.getLargestData(data);
    data.forEach(z => {
      const { hero_id, player_slot, pred_vict, account_id, rank_tier, name, personaname,
        stuns, life_state_dead, randomed,buyback_count, camps_stacked, pings, performance_others, max_hero_hit } = z;

      this.finalData.push({
        hero_id,
        pred_vict,
        player_slot,
        account_id,
        rank_tier,
        randomed,
        name,
        personaname,
        multi_kills: this.getLargeNumberOfObj(z, 'multi_kills'),
        kill_streaks: this.getLargeNumberOfObj(z, 'kill_streaks'),
        stuns,
        life_state_dead,
        buyback_count,
        camps_stacked,
        pings,
        performance_others: this.extractAblitiesForPerformanceOther(performance_others),
        max_hero_hit_value: max_hero_hit.value,
        max_hero_hit
        // above is common data for player
      });
    });

    return this.finalData;
  }

  // set table sort
  setDataSourceAttributes(): any {
    this.dataSource.sort = this.sort;
  }
  getLargestData(data: any): any {
    this.getNotUndefinedData(data, 'multi_kills');
    this.getNotUndefinedData(data, 'kill_streaks');
    this.teamsLargest.stuns = Math.max(...data.map(item => item.stuns));
    this.teamsLargest.life_state_dead = Math.max(...data.map(item => item.life_state_dead));
    this.teamsLargest.buyback_count = Math.max(...data.map(item => item.buyback_count));
    this.teamsLargest.camps_stacked = Math.max(...data.map(item => item.camps_stacked));
    this.teamsLargest.pings = Math.max(...data.map(item => item.pings));

    return this.teamsLargest;
  }
  // some data is not there will show NaN that will broken above function, so first of all need filter all undefined data
  getNotUndefinedData(data: any, field: string): number {
    const arr = [];
    // first we need get rid of no such field data or will break the cal
    const dataFilterNoSuchField = data.filter(i => Object.keys(i[field]).length !== 0);
    // map all such field to a new array
    const dataMapField = dataFilterNoSuchField.map(item => item[field]);
    // push such field keys to a new arr
    dataMapField.forEach(i => arr.push(...Object.keys(i)));
    // cal max the new arr to get the max number
    return this.teamsLargest[field] = Math.max(...arr.map(i => +i));

  }

  getLargeNumberOfObj(data: any, field: string): string | number {
    if (Object.keys(data[field]).length !== 0) {
      // first grab multi kills keys, because keys are the number of kills, value is numbers of such kills
      // second as the keys are string, we need to transform to number with map()
      return Math.max(...Object.keys(data[field]).map(i => +i));
    } else {
      return '-';
    }
  }

  calTotal(data: any, field: string): any {
    if (data.filter(i => i[field] !== '-').length !== 0) {
      const totalNum =  data.filter(i => i[field] !== undefined)
                            .filter(i => i[field] !== '-')
                            .map(i => i[field])
                            .reduce((cur, total) => cur + total, 0);
      return totalNum === 0 ? '-' : totalNum;
    } else {
      return '-';
    }

  }

  // extract ablitities
  // extractAblities(ablilities: any): any {
  //   let finalObj = {};
  //   Object.keys(ablilities).forEach(x => {
  //     // console.log(ablilities[x].dname)
  //     const { img, dname } = ablilities[x];
  //     const obj = {};
  //     if (dname) {
  //       obj[dname] = { img, dname };
  //       finalObj = {...obj};
  //     }
  //   });
  //   console.log(finalObj);
  //   return finalObj;
  // }

  extractAblitiesForPerformanceOther(data: any): any {
    if (!data) {
      return '-';
    } else {
      const arr = [];
      let trackArr = [];
      Object.keys(data).forEach(x => {
        const obj = {
          img: null,
          tooltip: null,
          value: null,
        };
        if (x.includes('track')){
          obj.img = '/apps/dota2/images/abilities/bounty_hunter_track_md.png';
          obj[x] = data[x];
          trackArr.push(obj);
        } else if (x.includes('greed')) {
          obj.img = '/apps/dota2/images/abilities/alchemist_goblins_greed_md.png';
          obj[x] = data[x];
          obj.tooltip = `${data[x]} gold earned from Greevil's Greed`;
          obj.value = data[x];
          arr.push(obj);
        }
      });

      if (trackArr.length > 0 ) {
        trackArr = trackArr.filter(i => i.img === '/apps/dota2/images/abilities/bounty_hunter_track_md.png');
        let trackArrA = { ...trackArr[0], ...trackArr[1]};
        trackArrA = {
          ...trackArrA,
          value: trackArrA.tracked_deaths,
          tooltip: `${trackArrA.tracked_deaths} tracked deaths, ${trackArrA.track_gold} gold earned from Track`
        };
        arr.push(trackArrA);
      }
      console.log(arr);
      return arr;
    }
  }


}
