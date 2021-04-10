import { Component, Input, OnInit } from '@angular/core';

// material
import { MatTableDataSource } from '@angular/material/table';

// model
import { IheroLocal } from 'src/app/heros/model/heroLocal';
import { IObsSenLeftLog, IObsSenLog } from '../../model/match';

// pipe
import { DurationFormatPipe } from 'src/app/shared/utils/duration-format.pipe';

@Component({
  selector: 'app-table-match-detail-ward-log',
  templateUrl: './table-match-detail-ward-log.component.html',
  styleUrls: ['./table-match-detail-ward-log.component.scss'],
  providers: [DurationFormatPipe]
})
export class TableMatchDetailWardLogComponent implements OnInit {
  @Input() data: any;
  @Input() playerColorLocal: any;
  @Input() heroesLocal: IheroLocal;
  @Input() heroesNameLocal: IheroLocal;

  dataSource = new MatTableDataSource();
  displayedColumns: string[] = [
    'type',
    'owner',
    'placed_time',
    'left_time',
    'lifespan',
    'attackername'
  ];
  finalData = [];
  constructor(
    private durationFormat: DurationFormatPipe
  ) { }

  ngOnInit(): void {
    // extract the data
    this.dataSource.data = this.extractObsSenFinalData(this.data);
  }
  // extract matches players[] to less data to meet for this page table
  extractData(data: any, slot: number): any {
    const { hero_id, player_slot, pred_vict, account_id, rank_tier, name, personaname } = data[slot];
    return {
      hero_id,
      pred_vict,
      player_slot,
      account_id,
      rank_tier,
      name,
      personaname,
      // above is common data for player
    };
  }

  extractDataFromAttackername(data: any, attackername: string): any {
    if (attackername !== 'npc_dota_observer_wards') {
      const heroId = this.heroesNameLocal[attackername]?.id;
      const d = [...data];
      const player = d.filter(i => i.hero_id === heroId);
      const { hero_id, player_slot, pred_vict, account_id, rank_tier, name, personaname } = player[0];
      return {
        hero_id,
        pred_vict,
        player_slot,
        account_id,
        rank_tier,
        name,
        personaname,
        // above is common data for player
      };
    }
  }

  extractObsSenFinalData(data: any[]): any[] {
    const arr = [];
    data.forEach(i => {
      const obsData = this.calDuration(data[0].duration, i.obs_left_log, i.obs_log);
      const senData = this.calDuration(data[0].duration, i.sen_left_log, i.sen_log);
      arr.push(
        ...obsData,
        ...senData
      );
    });
    return arr.sort((a, b) => a.time - b.time);
  }


calData(left): any {
  const a = {};
  left.forEach((item) => {
  // some key is the same so we need more data to distinguish them
    a[item.key + item.ehandle] = { ...item };
  });
  return {...a};
}

calDuration(duration: number, left: IObsSenLeftLog[], place: IObsSenLog[]): any[] {
  const arr = [];
  const leftData = this.calData(left);
  const placeData = this.calData(place);
  const placeDataKey = Object.keys(placeData);
  placeDataKey.forEach(i => {
    const d = {
      type: place[0].type,
      placed_time: this.durationFormat.transform(placeData[i].time),
      time: placeData[i].time
    };
    if (leftData[i]) {
      arr.push({
        ...leftData[i],
        ...d,
        lifespan: this.durationFormat.transform(leftData[i].time - placeData[i].time),
        left_time: this.durationFormat.transform(leftData[i].time),
      });
    } else {
      arr.push({
        ...placeData[i],
        ...d,
        lifespan: this.durationFormat.transform(duration - placeData[i].time),
        left_time: this.durationFormat.transform(duration),
      });
    }
  });
  return arr;
  // return duration(arr.reduce((cur, total) => cur + total, 0) / place.length)
}

}
