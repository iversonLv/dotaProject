import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

// material
import { MatTableDataSource } from '@angular/material/table';

// model
import { IheroLocal } from 'src/app/heros/model/heroLocal';
import { IHeroesPlayed } from 'src/app/players/model/hero-played';
import { IRecordData } from '../../model/record';

// service
import { HerosService } from 'src/app/heros/services/heros.service';

// ngrx
import { Store } from '@ngrx/store';
import * as recordsActions from '../../store/records.actions';


@Component({
  selector: 'app-table-records',
  templateUrl: './table-records.component.html',
  styleUrls: ['./table-records.component.scss']
})
export class TableRecordsComponent implements OnInit {


  displayedColumns: string[] = ['rank', 'score', 'match_id', 'hero_id'];
  dataSource = new MatTableDataSource();

  isLoading = false;
  field;

  playersHeroesPlayed: IHeroesPlayed[];

  // User for hero modal to mapping
  heroesLocal: IheroLocal;

  // hero modal dafault hidden
  currentMouseOverHero: IheroLocal = null;
  pageXY = [];
  // hero modal default hidden
  showHeroModal = false;

  constructor(
    private router: Router,
    private herosService: HerosService,
    private store: Store<{ recordsList: IRecordData }>,
  ) { }

  ngOnInit(): void {
    const currentUrl = this.router.url;
    this.field = currentUrl.split('/')[2];

    console.log(this.field);

    // load records data
    this.store.dispatch(new recordsActions.LoadRecords(this.field));
    this.store.select('recordsList').subscribe(data => {
      const recordsData = [...data.records];
      this.isLoading = data.isLoading;
      return this.dataSource.data = recordsData;
    }, err => {
      console.log(err);
    });

    // get all heroes local data
    this.getHeroesLocal();

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
