import { Component, OnInit, ViewChild } from '@angular/core';

import { orderBy } from 'lodash';

// material
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

// ngrx
import { Store } from '@ngrx/store';
import * as herosActions from '../../store/heros.actions';

// model
import { IheroLocal } from '../../model/heroLocal';
import { IHeroStatsData } from '../../model/heroStats';

import heroes from 'dotaconstants/build/heroes.json';

@Component({
  selector: 'app-table-public',
  templateUrl: './table-public.component.html',
  styleUrls: ['./table-public.component.scss']
})
export class TablePublicComponent implements OnInit {
  displayedColumns: string [] = ['localized_name', '8_pick', '8_win', '7_pick', '7_win', '6_pick', '6_win', '5_pick', '5_win', '4_pick', '4_win', '3_pick', '3_win', '2_pick', '2_win', '1_pick', '1_win'];
  dataSource = new MatTableDataSource();
  totalMatch = {
    '8_pick': null,
    '7_pick': null,
    '6_pick': null,
    '5_pick': null,
    '4_pick': null,
    '3_pick': null,
    '2_pick': null,
    '1_pick': null,
  };

  TotalMatches = 0;

  @ViewChild(MatSort) set matSort(mp: MatSort) {
    this.sort = mp;
    this.setDataSourceAttributes();
  }

  // hero modal dafault hidden
  currentMouseOverHero: IheroLocal = null;
  // User for hero modal to mapping
  heroes: any = heroes;
  pageXY = [];

  // hero modal default hidden
  showHeroModal = false;
  sort;
  isLoading = true;

  constructor(
    private store: Store<{ heroStats: IHeroStatsData }>
  ) { }

  ngOnInit(): void {
    this.store.dispatch(new herosActions.LoadHerosStats());
    this.store.select('heroStats').subscribe(data => {
      this.isLoading = data.isLoading;
      if (!data.isLoading) {
        let herosStatsData = [...data.heros];
        // default the list is sort via id, we need update them sort with localized_name
        herosStatsData = orderBy(herosStatsData, 'localized_name', 'asc');
        this.isLoading = data.isLoading;

        // cal total ppick for every
        for (let k = 1; k < 9; k++) {
          this.totalMatch[k + '_pick'] = herosStatsData.map(i => i[k + '_pick'])
          .reduce((cur, total) => {
            return cur + total;
          }, 0);
        }

        // Titlte 'Heroes in Public Matches (Sampled) 1.7m matches in last 30 days'
        // 1.7m matches is all pick number for every rank sum
        // const totalMatchesForEveryRankPick = [];
        // for (let k = 1; k < 9; k++) {
        //   totalMatchesForEveryRankPick.push(herosStatsData.map(i => i[k + '_pick'])
        // .reduce((cur, total) => {
        //   return cur + total;
        // }, 0));
        // }
        this.TotalMatches = Object.values(this.totalMatch).reduce((cur, total) => {
          return cur + total;
        }, 0);

        return this.dataSource.data = herosStatsData;
      }
    }, err => {
      console.log(err);
    });

  }

  setDataSourceAttributes(): any {
    this.dataSource.sort = this.sort;
  }

  showHeroModalFn(e, id): any {
    this.pageXY = [e.pageX + 50, e.pageY - 120];
    this.showHeroModal = true;
    this.currentMouseOverHero = this.heroes[id];
  }

}
