import { Component, Input, OnInit, ViewChild } from '@angular/core';

// material
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

// model
import { IheroLocal } from 'src/app/heros/model/heroLocal';

@Component({
  selector: 'app-table-match-detail-objective-damage',
  templateUrl: './table-match-detail-objective-damage.component.html',
  styleUrls: ['./table-match-detail-objective-damage.component.scss']
})
export class TableMatchDetailObjectiveDamageComponent implements OnInit {
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
    'tower1_top',
    'tower1_mid',
    'tower1_bot',

    'tower2_top',
    'tower2_mid',
    'tower2_bot',

    'tower3_top',
    'tower3_mid',
    'tower3_bot',

    'range_rax_top',
    'range_rax_mid',
    'range_rax_bot',

    'tower4',
    'fort',
    'shrines',
    'roshan',
  ];
  sort;

  objectsDamageKeys = {
    tower1_top: {
      tooltip: 'Damage dealt to top Tier 1 tower',
      title: 'T1'
    },
    tower1_mid: {
      tooltip: 'Damage dealt to middle Tier 1 tower',
      title: 'M1'
    },
    tower1_bot: {
      tooltip: 'Damage dealt to bottom Tier 1 tower',
      title: 'B1'
    },

    tower2_top: {
      tooltip: 'Damage dealt to top Tier 2 tower',
      title: 'T2'
    },
    tower2_mid: {
      tooltip: 'Damage dealt to middle Tier 2 tower',
      title: 'M2'
    },
    tower2_bot: {
      tooltip: 'Damage dealt to bottom Tier 2 tower',
      title: 'B2'
    },

    tower3_top: {
      tooltip: 'Damage dealt to top Tier 3 tower',
      title: 'T3'
    },
    tower3_mid: {
      tooltip: 'Damage dealt to middle Tier 3 tower',
      title: 'M3'
    },
    tower3_bot: {
      tooltip: 'Damage dealt to bottom Tier 3 tower',
      title: 'B3'
    },

    range_rax_top: {
      tooltip: 'Damage dealt to top barracks',
      title: 'RAXT'
    },
    range_rax_mid: {
      tooltip: 'Damage dealt to middle barracks',
      title: 'RAXM'
    },
    range_rax_bot: {
      tooltip: 'Damage dealt to bottom barracks',
      title: 'RAXB'
    },

    tower4: {
      tooltip: 'Damage dealt to middle Tier 4 tower',
      title: 'T4'
    },
    fort: {
      tooltip: 'Damage dealt to ancient',
      title: 'ANC'
    },
    shrines: {
      tooltip: 'Damage dealt to Shrines',
      title: 'SHR'
    },
    roshan: {
      tooltip: 'Damage dealt to Roshan',
      title: 'ROSH'
    },
  };
  constructor() { }

  ngOnInit(): void {
    // extract the data
    this.dataSource.data = this.extractData(this.data);
  }
  // extract matches players[] to less data to meet for this page table
  extractData(data): any[] {
    const finalData = [];
    data.forEach(z => {
      const { hero_id, player_slot, pred_vict, account_id, rank_tier, name, personaname,
        damage, isRadiant, randomed } = z;
      finalData.push({
        hero_id,
        pred_vict,
        player_slot,
        account_id,
        rank_tier,
        name,
        randomed,
        personaname,
        isRadiant,
        // above is common data for player
        tower1_top: isRadiant ? damage.npc_dota_badguys_tower1_top : damage.npc_dota_goodguys_tower1_top,
        tower1_mid: isRadiant ? damage.npc_dota_badguys_tower1_mid : damage.npc_dota_goodguys_tower1_mid,
        tower1_bot: isRadiant ? damage.npc_dota_badguys_tower1_bot : damage.npc_dota_goodguys_tower1_bot,

        tower2_top: isRadiant ? damage.npc_dota_badguys_tower2_top : damage.npc_dota_goodguys_tower2_top,
        tower2_mid: isRadiant ? damage.npc_dota_badguys_tower2_mid : damage.npc_dota_goodguys_tower2_mid,
        tower2_bot: isRadiant ? damage.npc_dota_badguys_tower2_bot : damage.npc_dota_goodguys_tower2_bot,

        tower3_top: isRadiant ? damage.npc_dota_badguys_tower3_top : damage.npc_dota_goodguys_tower3_top,
        tower3_mid: isRadiant ? damage.npc_dota_badguys_tower3_mid : damage.npc_dota_goodguys_tower3_mid,
        tower3_bot: isRadiant ? damage.npc_dota_badguys_tower3_bot : damage.npc_dota_goodguys_tower3_bot,

        range_rax_top: isRadiant ?
                       this.calNon(damage.npc_dota_badguys_melee_rax_top) + this.calNon(damage.npc_dota_badguys_range_rax_top) :
                       this.calNon(damage.npc_dota_goodguys_melee_rax_top) + this.calNon(damage.npc_dota_goodguys_range_rax_top),

        range_rax_mid: isRadiant ?
                       this.calNon(damage.npc_dota_badguys_melee_rax_mid) + this.calNon(damage.npc_dota_badguys_range_rax_mid) :
                       this.calNon(damage.npc_dota_goodguys_melee_rax_mid) + this.calNon(damage.npc_dota_goodguys_range_rax_mid),

        range_rax_bot: isRadiant ?
                       this.calNon(damage.npc_dota_badguys_melee_rax_bot) + this.calNon(damage.npc_dota_badguys_range_rax_bot) :
                       this.calNon(damage.npc_dota_goodguys_melee_rax_bot) + this.calNon(damage.npc_dota_goodguys_range_rax_bot),

        shrines: 'NA',

        tower4: isRadiant ? damage.npc_dota_badguys_tower4 : damage.npc_dota_goodguys_tower4,
        fort: isRadiant ? damage.npc_dota_badguys_fort : damage.npc_dota_goodguys_fort,
        roshan: damage.npc_dota_roshan,
      });
    });

    return finalData;
  }

  // this is for some data need plus, if it's undefined, then we need use 0 for placeholder OR the data will be empty
  calNon(data: any): any {
    return data === undefined ? 0 : data;
  }

  // set table sort
  setDataSourceAttributes(): any {
    this.dataSource.sort = this.sort;
  }

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

}
