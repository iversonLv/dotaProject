import { Component, OnInit, ViewChild } from '@angular/core';

// material
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

// ngrx
import * as matchesActions from '../../store/matches.actions';
import { Store } from '@ngrx/store';

// model
import { IheroLocal } from 'src/app/heros/model/heroLocal';
import { IPublicMatchData } from '../../model/public-match';

// service
import { HerosService } from 'src/app/heros/services/heros.service';
import { Router } from '@angular/router';

// dotaconstants
import heroes from 'dotaconstants/build/heroes.json';

@Component({
  selector: 'app-table-matches-public',
  templateUrl: './table-matches-public.component.html',
  styleUrls: ['./table-matches-public.component.scss']
})
export class TableMatchesPublicComponent implements OnInit {
  displayedColumns: string[] = ['start_time', 'duration', 'radiant_team', 'dire_team'];
  dataSource = new MatTableDataSource();
  @ViewChild(MatSort) set matSort(mp: MatSort) {
    this.sort = mp;
    this.setDataSourceAttributes();
  }

  sort;
  // User for hero modal to mapping
  heroes: any = heroes;

  isLoading = true;
  constructor(
    private router: Router,
    private herosService: HerosService,
    private store: Store<{ publicMatches: IPublicMatchData }>
  ) { }

  ngOnInit(): void {
    this.store.dispatch(new matchesActions.LoadPublicMatches({ params: { mmr_descending : 1 } }));
    this.store.select('publicMatches').subscribe(data => {
      this.isLoading = data.isLoading;
      if (!data.isLoading) {
        const publicMatchesData = [...data.matches];
        this.isLoading = data.isLoading;
        return this.dataSource.data = publicMatchesData;
      }
    }, err => {
      console.log(err);
    });
  }

  setDataSourceAttributes(): any {
    this.dataSource.sort = this.sort;
  }

  goPage(heroId): any {
    this.router.navigate([`/heroes/${heroId}`]);
  }

}
