import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import _ from 'lodash';

// material
import { MatTableDataSource } from '@angular/material/table';

// ngrx
import * as herosActions from '../../store/heros.actions';
import { Store } from '@ngrx/store';

// model
import { IRankingData, IRankings } from '../../model/ranking';

// service
import { HerosService } from '../../services/heros.service';


@Component({
  selector: 'app-table-rankings',
  templateUrl: './table-rankings.component.html',
  styleUrls: ['./table-rankings.component.scss']
})
export class TableRankingsComponent implements OnInit {

  // mat table
  displayedColumns: string[] = ['rank', 'name', 'score'];
  dataSource = new MatTableDataSource();

  isLoading = false;

  // cal top one ranking for base to calculate percentage the bar
  playersHeroesWithGameLargest: any = {
    score: null,
  };

  constructor(
    private router: Router,
    private store: Store<{ herosRankings: IRankingData }>
  ) { }

  ngOnInit(): void {
    const currentUrl = this.router.url;
    const heroId = +currentUrl.split('/')[2];

    // load heros rankings
    this.store.dispatch(new herosActions.LoadHerosRankings({ params: { hero_id: heroId } }));
    this.store.select('herosRankings').subscribe(data => {
      if (!data.isLoading) {
        const dataHeroesRankings = [...data.ranking.rankings];
        this.getLargestData(dataHeroesRankings);
        this.isLoading = data.isLoading;
        return this.dataSource.data = dataHeroesRankings;
      }
    }, err => {
      console.log(err);
    });
  }


  getLargestData(data: IRankings[]): any {
    let { score } = this.playersHeroesWithGameLargest;
    score = Math.max(...data.map(item => item.score));

    return this.playersHeroesWithGameLargest = { score };
  }

}
