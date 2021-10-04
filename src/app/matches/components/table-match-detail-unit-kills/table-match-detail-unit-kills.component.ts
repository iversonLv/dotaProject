import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { IheroLocal } from 'src/app/heros/model/heroLocal';

@Component({
  selector: 'app-table-match-detail-unit-kills',
  templateUrl: './table-match-detail-unit-kills.component.html',
  styleUrls: ['./table-match-detail-unit-kills.component.scss']
})
export class TableMatchDetailUnitKillsComponent implements OnInit {
  @Input() data: any;
  @Input() playerColorLocal: any;
  @Input() heroes: IheroLocal;
  @ViewChild(MatSort) set matSort(mp: MatSort) {
    this.sort = mp;
    this.setDataSourceAttributes();
  }

  unitKillsObjKeyLength;

  dataSource = new MatTableDataSource();
  displayedColumns: string[] = [
    'player_slot'
  ];

  unitKillsObjKey = {
    hero_kills: {
      tooltip: 'Heoes killed',
      title: 'HEROES'
    },
    lane_kills: {
      tooltip: 'Lane creeps killed',
      title: 'CREEPS'
    },
    neutral_kills: {
      tooltip: 'Neutral creeps killed (includes Ancients)',
      title: 'NEUTRALS'
    },
    ancient_kills: {
      tooltip: 'Ancients creeps killed',
      title: 'ANCIENTS'
    },
    tower_kills: {
      tooltip: 'Towers creeps killed',
      title: 'TOWERS'
    },
    roshan_kills: {
      tooltip: 'Roshan killed',
      title: 'ROSHAN'
    },
    observer_kills: {
      tooltip: 'Observers killed',
      title: 'OBSERVERS'
    },
    necronomicon_kills: {
      tooltip: 'Necronomicons killed',
      title: 'NECRONOMICONS'
    }
  };
  sort;
  finalData = [];
  constructor() { }

  ngOnInit(): void {
    // extract the data
    this.dataSource.data = this.extractData(this.data);
    this.displayedColumns.push(...Object.keys(this.unitKillsObjKey));
    this.displayedColumns.push('OTHER');
    this.unitKillsObjKeyLength = Object.keys(this.unitKillsObjKey).length;
  }
  // extract matches players[] to less data to meet for this page table
  extractData(data): any[] {
    data.forEach(z => {
      const { hero_id, player_slot, pred_vict, account_id, rank_tier, name, personaname,
        killed, hero_kills, lane_kills, neutral_kills, ancient_kills, tower_kills, roshan_kills, observer_kills, necronomicon_kills  } = z;

      this.finalData.push({
        hero_id,
        pred_vict,
        player_slot,
        account_id,
        rank_tier,
        name,
        personaname,
        // above is common data for player
        hero_kills,
        lane_kills,
        neutral_kills,
        ancient_kills,
        tower_kills,
        roshan_kills,
        observer_kills,
        necronomicon_kills,
        killed,
        other: this.extractOtherUnitKills(killed)

      });
    });

    return this.finalData;
  }

  // set table sort
  setDataSourceAttributes(): any {
    this.dataSource.sort = this.sort;
  }

  calTotal(data: any): any {
    return Object.values(data).reduce((cur, total) => +cur + +total, 0);
  }
  // damageTaken list many kinds of damage, so here we need to filter which kinds of damage taken by
  // example, hero damage taken will includes 'npc_dota_hero_'
  calTotalDamageTaken(data: any, includesString: string, field?: string): number {
    const d = {...data};
    Object.keys(d).forEach(x => {
      if (field === 'damage') {
        // for damage, we should not include hero damages to speicfic hero illusions, like illusion_npc_dota_hero_spectre
        // Bug damage_taken, should include illusion_npc_dota_hero_spectre
        if (!x.includes(includesString) || x.includes('illusion_')) {
          delete d[x];
        }
      } else {
        if (!x.includes(includesString)) {
          delete d[x];
        }
      }
    });
    return this.calTotal(d);
  }

  // this is for table footer total overall number
  calTotalDamageTakenAllOrPerfectData(data: any, field: string, includesString: string, calTotal: string, min: string = ''): number {
    let d = [...data];
    const arr = [];
    const finalD = [];
    d = d.map(i => i[field]);
    d.forEach(i => {
      const j = {...i};
      Object.keys(j).forEach(x => {
        if (field === 'damage') {
          // for damage, we should not include hero damages to speicfic hero illusions, like illusion_npc_dota_hero_spectre
          // Bug damage_taken, should include illusion_npc_dota_hero_spectre
          if (!x.includes(includesString) || x.includes('illusion_')) {
            delete j[x];
          }
        } else {
          if (!x.includes(includesString)) {
            delete j[x];
          }
        }
      });
      finalD.push(j);
    });

    finalD.forEach(i => {
      arr.push(this.calTotal(i));
    });
    if (calTotal === 'calTotal') {
      return this.calTotal(arr);
    } else if (calTotal === 'calPerfectDataForBarChart') {
      if (!min) {
        return Math.max(...arr);
      } else {
        return Math.min(...arr);
      }
    }

  }

  // cal perfect data only for one level sub field
  calPerfectData(data: any, field: string, min: string = '', subField?: string): number {
    const dataField = data.map(item => item[field]).filter(i => i !== undefined);
    const dataWithSubField = data.map(item => item[field]).map(sub => sub[subField]).filter(i => i !== undefined);
    if (!min) {
      if (subField) {
        return Math.max(...dataWithSubField);
      }
      return Math.max(...dataField);
    } else {
      if (subField) {
        return Math.min(...dataWithSubField);
      }
      return Math.min(...dataField);
    }
  }

  calTotalData(data: any, field: string): any {
    if (data.filter(i => i[field] !== '-').length !== 0) {
      const totalNum =  data.filter(i => i[field] !== '-').map(i => i[field]).reduce((cur, total) => cur + total, 0);
      return totalNum === 0 ? '-' : totalNum;
    } else {
      return '-';
    }

  }

  // we will grab forged spirit and eidolon keyword key value from killed obj
  extractOtherUnitKills(data: any): any[] {
    const arr = [];
    Object.keys(data).forEach(x => {
      if (x.includes('forged_spirit') || x.includes('eidolon')) {
        arr.push({
          key: x,
          value: data[x]
        });
      }
    });
    return arr;
  }

  // call total other unit kills
  extractOtherUnitKillsForTotal(data: any, filed: string): any[] {
    const arr = [];
    const finalArr = [];
    const d = [...data].map(i => i.killed);
    d.map(i => i.killed);
    d.forEach(i => {
      Object.keys(i).forEach(x => {
        if (x === filed) {
          arr.push(i[x]);
        }
      });
    });
    finalArr.push({
      key: filed,
      value: arr.reduce((cur, total) => cur + total, 0)
    });
    return finalArr;
  }

  extractOtherUnitKillsFinall(data: any): any {
    const otherUnitKill = [];
    const otherUnitKillsKey = ['npc_dota_invoker_forged_spirit', 'npc_dota_greater_eidolon', 'npc_dota_dire_eidolon', 'npc_dota_lesser_eidolon'];
    otherUnitKillsKey.forEach(x => {
      // if such key value is 0 won't show on front-end
      if (this.extractOtherUnitKillsForTotal(data, x)[0].value !== 0) {
        otherUnitKill.push(...this.extractOtherUnitKillsForTotal(data, x));
      }
    });

    return otherUnitKill;
  }



}
