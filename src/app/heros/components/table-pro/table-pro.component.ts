import { Component, OnInit, ViewChild } from '@angular/core';

// material
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { orderBy } from 'lodash';

// ngrx
import { Store } from '@ngrx/store';
import * as herosActions from '../../store/heros.actions';

// model
import { IHeroStatsData } from '../../model/heroStats';
import { IheroLocal } from '../../model/heroLocal';

// dotacontants
import heroes from 'dotaconstants/build/heroes.json';

@Component({
  selector: 'app-table-pro',
  templateUrl: './table-pro.component.html',
  styleUrls: ['./table-pro.component.scss']
})
export class TableProComponent implements OnInit {
  displayedColumns: string [] = ['localized_name', 'pro_pick_ban', 'pro_pick', 'pro_ban', 'pro_win'];
  dataSource = new MatTableDataSource();
  totalMatch = 0;
  @ViewChild(MatSort) set matSort(mp: MatSort) {
    this.sort = mp;
    this.setDataSourceAttributes();
  }

  sort;
  isLoading = true;

  // hero modal dafault hidden
  currentMouseOverHero: IheroLocal = null;
  // User for hero modal to mapping
  heroes: any = heroes;
  pageXY = [];

  // hero modal default hidden
  showHeroModal = false;

  constructor(
    private store: Store<{ heroStats: IHeroStatsData }>
  ) { }

  ngOnInit(): void {
    this.store.dispatch(new herosActions.LoadHerosStats());
    this.store.select('heroStats').subscribe(data => {
      this.isLoading = data.isLoading;
      if (!data.isLoading) {
        const herosStatsData = [...data.heros];

        // cal total match for pro_pick
        this.totalMatch = herosStatsData.map(i => i.pro_pick ?? 0)
        .reduce((cur, total) => {
          return cur + total;
        }, 0);
        let dataNew = [];
        for (const i in herosStatsData) {
          if (herosStatsData.hasOwnProperty(i)) {
            const { pro_pick, pro_ban  } = herosStatsData[i];
            dataNew.push({
                ...herosStatsData[i],
                pro_pick_ban: (pro_pick + pro_ban) / this.totalMatch
              }
            );
          }
        }
        // default the list is sort via id, we need update them sort with localized_name
        dataNew = orderBy(dataNew, 'localized_name', 'asc');
        this.isLoading = data.isLoading;
        return this.dataSource.data = dataNew;
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
