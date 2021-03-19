import { Component, Input, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { IheroLocal } from 'src/app/heros/model/heroLocal';

@Component({
  selector: 'app-table-match-detail-combat-kills',
  templateUrl: './table-match-detail-combat-kills.component.html',
  styleUrls: ['./table-match-detail-combat-kills.component.scss']
})
export class TableMatchDetailCombatKillsComponent implements OnInit {
  @Input() data: any;
  @Input() heroesLocal: IheroLocal;
  dataSource = new MatTableDataSource();

  direData: string[];

  displayedColumns: string[] = [
    'player_slot',
  ];
  constructor() { }

  ngOnInit(): void {
    // extract the data
    this.dataSource.data = this.extractData(this.data.slice(0, 5));
    this.displayedColumns.push(...this.extractDireData(this.data.slice(5, 10)));
    this.displayedColumns.push('dire');
  }

  // extract matches players[] to less data to meet for this page table
  extractData(data): any[] {
    const finalData = [];
    data.forEach(z => {
      const { hero_id, killed_by, damage_taken, killed, damage } = z;
      finalData.push({
        hero_id,
        killed,
        damage,
        killed_by,
        damage_taken,
      });
    });

    return finalData;
  }

  extractDireData(data: any): string[] {
    return data.map(i => i.hero_id + '');
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

  calTotalDamageTakenAll(data: any, field: string, includesString: string): number {
    let d = [...data.slice(0, 5)];
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

    return this.calTotal(arr);
  }

  // calculate total killed y or Damage taken from specific hero name
  calTotalBy(data: any, field: string, hero?: string): number {
    const arr = [];
    let d = [...data.slice(0, 5)];
    d = d.map(i => i[field]);
    d.forEach(i => {
      if (i[hero]) {
        arr.push(i[hero]);
      } else if (!hero) {
        arr.push(...Object.values(i));
      }
    });
    return this.calTotal(arr);
  }
}
