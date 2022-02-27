import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

// material
import { MatTableDataSource } from '@angular/material/table';

// ngrx
import { Store } from '@ngrx/store';

// model
import { ISingleMatchData } from 'src/app/matches/model/onematch';
import * as matchesActions from 'src/app/matches/store/matches.actions';
import { IheroLocal } from 'src/app/heros/model/heroLocal';

// dotaconstants
import heroes from 'dotaconstants/build/heroes.json';

@Component({
  selector: 'app-table-match',
  templateUrl: './table-match.component.html',
  styleUrls: ['./table-match.component.scss']
})
export class TableMatchComponent implements OnInit {
  isLoading = true;
  matchId;

  displayedColumns: string[] = ['match_id', 'duration', 'radient', 'dire'];
  dataSource = new MatTableDataSource();

  // User for hero modal to mapping
  heroes: any = heroes;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private store: Store<{ singleMatch: ISingleMatchData }>
  ) { }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(data => {
      this.matchId = data.q;
    }, err => {
      console.log(err);
    });

    this.store.dispatch(new matchesActions.LoadMatch(this.matchId));
    this.store.select('singleMatch').subscribe(data => {
      this.isLoading = data.isLoading;
      if (!data.isLoading) {
        const singleMatchData = [...data.match];
        this.isLoading = data.isLoading;
        return this.dataSource.data = singleMatchData;
      }
    }, err => {
      console.log(err);
    });

  }

  goPage(heroId): any {
    this.router.navigate([`/heroes/${heroId}`]);
  }

}
