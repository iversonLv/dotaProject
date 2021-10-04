import { Component, Input, OnInit, ViewChild } from '@angular/core';

// material
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

// model
import { IheroLocal } from 'src/app/heros/model/heroLocal';

@Component({
  selector: 'app-table-match-detail-fantasy',
  templateUrl: './table-match-detail-fantasy.component.html',
  styleUrls: ['./table-match-detail-fantasy.component.scss'],
})
export class TableMatchDetailFantasyComponent implements OnInit {
  @Input() data: any;
  @Input() playerColors: any;
  @Input() heroes: IheroLocal;
  // above is common player column
  @ViewChild(MatSort) set matSort(mp: MatSort) {
    this.sort = mp;
    this.setDataSourceAttributes();
  }
  dataSource = new MatTableDataSource();

  displayedColumns: string[] = [
    'player_slot',
    'fantasy_pts'
  ];
  sort;

  fantasyObj = {
    kills: {
      title: 'K',
      tooltip: 'Number of kills by hero',
      fantasy_pts_base: 0.3
    },
    deaths: {
      title: 'D',
      tooltip: 'Number of deaths by hero',
      fantasy_pts_base: 0.3 // (10 - x) * 0.3
    },
    last_hits: {
      title: 'LH',
      tooltip: 'Number of last hits by hero',
      fantasy_pts_base: 0.003
    },
    denies: {
      title: 'DN',
      tooltip: 'Number of denies by hero',
      fantasy_pts_base: 0.003
    },
    gold_per_min: {
      title: 'GPM',
      tooltip: 'Gold farmed per min',
      fantasy_pts_base: 0.002
    },
    towers_killed: {
      title: 'TOWERS',
      tooltip: 'Number of towers killed',
      fantasy_pts_base: 1
    },
    roshan_kills: {
      title: 'ROSHAN',
      tooltip: 'Roshans killed',
      fantasy_pts_base: 1
    },
    teamfight_participation: {
      title: 'PARTICIPATION',
      tooltip: 'Amout of participation in teamfights',
      fantasy_pts_base: 3
    },
    observer_uses_sentry_uses: {
      title: 'OBSERVERS',
      tooltip: 'Number of Observers Wards placed during the game',
      fantasy_pts_base: 0.5
    },
    camps_stacked: {
      title: 'STACKS',
      tooltip: 'Camps stacks',
      fantasy_pts_base: 0.5
    },
    rune_pickups: {
      title: 'RUNES',
      tooltip: 'Runes obtained',
      fantasy_pts_base: 0.25
    },
    firstblood_claimed: {
      title: 'FIRST BLOOD',
      tooltip: 'First blood',
      fantasy_pts_base: 4
    },
    stuns: {
      title: 'STUNS',
      tooltip: 'Seconds of disabled on heros',
      fantasy_pts_base: 0.05
    }
  };

  constructor() { }

  ngOnInit(): void {
    this.displayedColumns.push(...Object.keys(this.fantasyObj));
    // extract the data
    this.dataSource.data = this.extractData(this.data);
  }

  // extract matches players[] to less data to meet for this page table
  extractData(data): any[] {
    const finalData = [];
    data.forEach(z => {
      const { hero_id, player_slot, pred_vict, account_id, rank_tier, name, personaname,
        kills, deaths, denies, last_hits, gold_per_min, towers_killed, roshan_kills, observer_uses,
        teamfight_participation, camps_stacked, firstblood_claimed, stuns, rune_pickups, sentry_uses} = z;
      finalData.push({
        hero_id,
        pred_vict,
        player_slot,
        account_id,
        rank_tier,
        name,
        personaname,
        // above is common data for player
        kills,
        deaths,
        denies,
        last_hits,
        gold_per_min,
        towers_killed,
        roshan_kills,
        observer_uses,
        teamfight_participation,
        camps_stacked,
        firstblood_claimed,
        stuns,
        rune_pickups,
        observer_uses_sentry_uses: observer_uses + sentry_uses
      });
    });

    return finalData;
  }

  calTotalFantasyPts(data: any): number {
    const arr = [];
    this.displayedColumns.slice(2).forEach(i => {
      if (i !== 'deaths') {
        arr.push(data[i] * this.fantasyObj[i]?.fantasy_pts_base);
      } else if (i === 'deaths') {
        arr.push((10 - data[i]) * this.fantasyObj[i]?.fantasy_pts_base);
      }
    });
    return arr.reduce((cur, total) => +cur + +total, 0);
  }

  // set table sort
  setDataSourceAttributes(): any {
    this.dataSource.sort = this.sort;
  }

}
