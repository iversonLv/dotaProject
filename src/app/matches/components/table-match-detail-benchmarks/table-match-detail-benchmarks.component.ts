import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
// material
import { MatTableDataSource } from '@angular/material/table';
import { IheroLocal } from 'src/app/heros/model/heroLocal';

@Component({
  selector: 'app-table-match-detail-benchmarks',
  templateUrl: './table-match-detail-benchmarks.component.html',
  styleUrls: ['./table-match-detail-benchmarks.component.scss']
})
export class TableMatchDetailBenchmarksComponent implements OnInit {
  @Input() data: any;
  @Input() playerColorLocal: any;
  @Input() heroes: IheroLocal;

  @ViewChild(MatSort) set matSort(mp: MatSort) {
    this.sort = mp;
    this.setDataSourceAttributes();
  }

  sort;

  herosBenchmarksResultKey: any = {
    gold_per_min: {
      tooltip: 'GOLD FARMED PER MINUTE',
      title: 'GPM'
    },
    xp_per_min: {
      tooltip: 'EXPERIENCE GAINED PER MINUTE',
      title: 'XPM'
    },
    hero_damage_per_min: {
      tooltip: 'HERO DAMAGE PER MINUTE',
      title: 'HDM'
    },
    hero_healing_per_min: {
      tooltip: 'HERO HEALING PER MINUTE',
      title: 'HHM'
    },
    kills_per_min: {
      tooltip: 'KILLS PER MINUTE',
      title: 'KPM'
    },
    last_hits_per_min: {
      tooltip: 'LAST HITS PER MINUTE',
      title: 'LHM'
    },
    lhten: {
      tooltip: 'LAST HITS AT 10 MINUTES',
      title: 'LH@10'
    },
    stuns_per_min: {
      tooltip: 'SECONDS OF HERO STUNS PER MINUTE',
      title: 'SPM'
    },
    tower_damage: {
      tooltip: 'AMOUNT OF DAMAGE DEALT TO TOWERS',
      title: 'TD'
    },
  };

  dataSource = new MatTableDataSource();
  displayedColumns: string[] = [
    'player_slot',
    'gold_per_min',
    'xp_per_min',
    'kills_per_min',
    'last_hits_per_min',
    'hero_damage_per_min',
    'hero_healing_per_min',
    'tower_damage',
    'stuns_per_min',
    'lhten'
  ];
  constructor() { }

  ngOnInit(): void {
    // this.extractData(this.data);
    this.dataSource.data = this.extractData(this.data);
  }

  // extract matches players[] to less data to meet for this page table
  extractData(data): any[] {
    const finalData = [];
    data.forEach(z => {
      const { hero_id, player_slot, pred_vict, account_id, rank_tier, name, personaname, benchmarks} = z;
      finalData.push({
        hero_id,
        account_id,
        rank_tier,
        name,
        personaname,
        player_slot,
        pred_vict,
        // above is common data for player
        benchmarks
      });
    });
    console.log(finalData);
    return finalData;
  }

  // set table sort
  setDataSourceAttributes(): any {
    this.dataSource.sort = this.sort;
  }

  // calculate benchmarks pct text color
  benchmarksPctColor(pct: number): string {
    if (pct < 0.2) {
      return 'benchmarks-red';
    } else if (pct >= 0.2 && pct < 0.4) {
      return 'benchmarks-orange';
    } else if (pct >= 0.4 && pct < 0.6) {
      return 'benchmarks-yellow';
    } else if (pct >= 0.6 && pct < 0.8) {
      return 'benchmarks-blue';
    } else if (pct >= 8) {
      return 'benchmarks-green';
    }
  }
}
