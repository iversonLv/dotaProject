import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

// material
import { MatTableDataSource } from '@angular/material/table';

// model
import { IheroLocal } from 'src/app/heros/model/heroLocal';
import { IHeroesPlayed } from 'src/app/players/model/hero-played';
import { IRecordData } from '../../model/record';

// ngrx
import { Store } from '@ngrx/store';
import * as recordsActions from '../../store/records.actions';

// dotaconstatns
import heroes from 'dotaconstants/build/heroes.json';


@Component({
  selector: 'app-table-records',
  templateUrl: './table-records.component.html',
  styleUrls: ['./table-records.component.scss']
})
export class TableRecordsComponent implements OnInit {


  displayedColumns: string[] = ['rank', 'score', 'match_id', 'hero_id'];
  dataSource = new MatTableDataSource();

  isLoading = true;
  field;

  playersHeroesPlayed: IHeroesPlayed[];

  // User for hero modal to mapping
  heroes: any = heroes;

  // hero modal dafault hidden
  currentMouseOverHero: IheroLocal = null;
  pageXY = [];
  // hero modal default hidden
  showHeroModal = false;

  constructor(
    private router: Router,
    private store: Store<{ recordsList: IRecordData }>,
  ) { }

  ngOnInit(): void {
    const currentUrl = this.router.url;
    this.field = currentUrl.split('/')[2];

    // load records data
    this.store.dispatch(new recordsActions.LoadRecords(this.field));
    this.store.select('recordsList').subscribe(data => {
      this.isLoading = data.isLoading;
      if (!data.isLoading) {
        const recordsData = [...data.records];
        this.isLoading = data.isLoading;
        return this.dataSource.data = recordsData;
      }
    }, err => {
      console.log(err);
    });

  }

  showHeroModalFn(e, id): any {
    this.pageXY = [e.pageX + 50, e.pageY - 120];
    this.showHeroModal = true;
    this.currentMouseOverHero = this.heroes[id];
  }

}
