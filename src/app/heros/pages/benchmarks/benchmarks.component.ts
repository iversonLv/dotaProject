import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

// model
import { IBenchmark, IBenchmarkData, IResults } from '../../model/benchmark';

// ngrx
import { Store } from '@ngrx/store';
import * as herosActions from '../../store/heros.actions';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-benchmarks',
  templateUrl: './benchmarks.component.html',
  styleUrls: ['./benchmarks.component.scss']
})
export class BenchmarksComponent implements OnInit {
  isLoading = true;
  dataHeroesRankings: IResults;

  herosBenchmarksChartData: any[];
  herosBenchmarksTableData: any[];
  herosBenchmarksResultKey: any = {
    gold_per_min: {
      color: 'rgb(201, 175, 29)',
      title: 'GOLD FARMED PER MINUTE'
    },
    xp_per_min: {
      color: 'rgb(102, 187, 255)',
      title: 'EXPERIENCE GAINED PER MINUTE'
    },
    hero_damage_per_min: {
      color: 'rgb(255, 76, 76)',
      title: 'HERO DAMAGE PER MINUTE'
    },
    hero_healing_per_min: {
      color: 'rgb(102, 187, 106)',
      title: 'HERO HEALING PER MINUTE'
    },
    kills_per_min: {
      color: 'rgb(255, 171, 64)',
      title: 'KILLS PER MINUTE'
    },
    last_hits_per_min: {
      color: 'rgb(124, 153, 168)',
      title: 'LAST HITS PER MINUTE'
    },
    lhten: {
      color: 'rgb(201, 175, 29)',
      title: 'LAST HITS AT 10 MINUTES'
    },
    stuns_per_min: {
      color: 'rgb(255, 76, 76)',
      title: 'SECONDS OF HERO STUNS PER MINUTE'
    },
    tower_damage: {
      color: 'rgb(255, 76, 76)',
      title: 'AMOUNT OF DAMAGE DEALT TO TOWERS'
    },
  };

  constructor(
    private router: Router,
    private store: Store<{ herosBenchmarks: IBenchmarkData}>
  ) {
    // this.herosBenchmarks$ = this.store.select('herosBenchmarks');
  }


  ngOnInit(): void {
    const currentUrl = this.router.url;
    const heroId = +currentUrl.split('/')[2];

    // load heros rankings
    this.store.dispatch(new herosActions.LoadHerosBenchmarks({ params: { hero_id: heroId } }));
    this.store.select('herosBenchmarks').subscribe(data => {
      if (!data.isLoading) {
        const herosBenchmarksData = { ...data.benchmark.result };
        const keys = Object.keys(herosBenchmarksData);
        const newData = []; // data for chart
        const newTableData = []; // data for table
        for (const key in herosBenchmarksData) {
          if (herosBenchmarksData.hasOwnProperty(key)) {
            newData.push({ ...this.herosBenchmarksResultKey[key], data: [...herosBenchmarksData[key]]});
          }
        }
        for (let i = 0; i < 11; i++) {
          newTableData.push({
            percentile: herosBenchmarksData[keys[0]][i].percentile * 100 + '%',
            GPM: Math.floor(herosBenchmarksData[keys[0]][i].value * 100) / 100,
            XPM: Math.floor(herosBenchmarksData[keys[1]][i].value * 100) / 100,
            KPM: Math.floor(herosBenchmarksData[keys[2]][i].value * 100) / 100,
            LHM: Math.floor(herosBenchmarksData[keys[3]][i].value * 100) / 100,
            HDM: Math.floor(herosBenchmarksData[keys[4]][i].value * 100) / 100,
            HHM: Math.floor(herosBenchmarksData[keys[5]][i].value * 100) / 100,
            TD:  Math.floor(herosBenchmarksData[keys[6]][i].value * 100) / 100,
            SPM: Math.floor(herosBenchmarksData[keys[7]][i].value * 100) / 100,
            LH:  Math.floor(herosBenchmarksData[keys[8]][i].value * 100) / 100
          });
        }
        this.isLoading = data.isLoading;
        this.herosBenchmarksChartData = newData;
        this.herosBenchmarksTableData = newTableData;
      }
    }, err => {
      console.log(err);
    });
    // this.store.select('herosBenchmarks').subscribe(data => {
    //   console.log(data);
    //   this.isLoading = data.isLoading;
    //   return this.dataHeroesRankings = data.benchmark.results;
    // }, err => {
    //   console.log(err);
    // });
  }

}
