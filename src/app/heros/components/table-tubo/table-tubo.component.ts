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
import { HerosService } from '../../services/heros.service';

@Component({
  selector: 'app-table-tubo',
  templateUrl: './table-tubo.component.html',
  styleUrls: ['./table-tubo.component.scss']
})
export class TableTuboComponent implements OnInit {
  displayedColumns: string [] = ['localized_name', 'turbo_picks', 'turbo_wins'];
  dataSource = new MatTableDataSource();
  totalMatch = 0;

  @ViewChild(MatSort) set matSort(mp: MatSort) {
    this.sort = mp;
    this.setDataSourceAttributes();
  }

  // hero modal dafault hidden
  currentMouseOverHero: IheroLocal = null;
  // User for hero modal to mapping
  heroesLocal: IheroLocal;
  pageXY = [];

  // hero modal default hidden
  showHeroModal = false;

  sort;
  isLoading = true;
  constructor(
    private herosService: HerosService,
    private store: Store<{ heroStats: IHeroStatsData }>
  ) { }

  ngOnInit(): void {
    this.store.dispatch(new herosActions.LoadHerosStats());
    this.store.select('heroStats').subscribe(data => {
      this.isLoading = data.isLoading;
      if (!data.isLoading) {
        let herosStatsData = [...data.heros];
        // cal total matches
        this.totalMatch = herosStatsData.map(i => i.turbo_picks)
        .reduce((cur, total) => {
          return cur + total;
        }, 0);
        // default the list is sort via id, we need update them sort with localized_name
        herosStatsData = orderBy(herosStatsData, 'localized_name', 'asc');
        this.isLoading = data.isLoading;
        return this.dataSource.data = herosStatsData;
      }
    }, err => {
      console.log(err);
    });

    // get all heroes local data
    this.getHeroesLocal();
  }


  setDataSourceAttributes(): any {
    this.dataSource.sort = this.sort;
  }

  getHeroesLocal(): any {
    this.herosService.getHeroesLocal().subscribe(data => {
      this.heroesLocal = data;
    }, err => {
      console.log(err);
    });
  }


  showHeroModalFn(e, id): any {
    this.pageXY = [e.pageX + 50, e.pageY - 120];
    this.showHeroModal = true;
    this.currentMouseOverHero = this.heroesLocal[id];
  }

}
