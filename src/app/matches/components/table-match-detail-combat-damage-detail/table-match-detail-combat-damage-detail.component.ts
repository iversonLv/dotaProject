import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { IheroLocal } from 'src/app/heros/model/heroLocal';

@Component({
  selector: 'app-table-match-detail-combat-damage-detail',
  templateUrl: './table-match-detail-combat-damage-detail.component.html',
  styleUrls: ['./table-match-detail-combat-damage-detail.component.scss'],
})
export class TableMatchDetailCombatDamageDetailComponent implements OnInit {
  @Input() data: any;
  @Input() playerColors: any;
  @Input() heroes: IheroLocal;

  @Input() itemIds: any;
  @Input() items: any;
  @Input() abilities: any;
  @Output() showItemModalFn: any = new EventEmitter();
  @Output() hideItemModalFn: any = new EventEmitter();
  @Output() showAbilityModalFn: any = new EventEmitter();
  @Output() hideAbilityModalFn: any = new EventEmitter();
  // above is common player column
  @ViewChild(MatSort) set matSort(mp: MatSort) {
    this.sort = mp;
    this.setDataSourceAttributes();
  }
  dataSource = new MatTableDataSource();

  displayedColumns: string[] = ['player_slot', 'dealt', 'received'];
  sort;
  constructor() {}

  ngOnInit(): void {
    // extract the data
    this.dataSource.data = this.extractData(this.data);
  }
  // extract matches players[] to less data to meet for this page table
  extractData(data): any[] {
    const finalData = [];
    data.forEach((z) => {
      const {
        hero_id,
        player_slot,
        randomed,
        pred_vict,
        account_id,
        rank_tier,
        name,
        personaname,
        damage_inflictor_received,
        damage_targets,
        damage_inflictor,
        hero_variant,
      } = z;
      finalData.push({
        hero_id,
        pred_vict,
        player_slot,
        account_id,
        rank_tier,
        name,
        randomed,
        personaname,
        // above is common data for player
        damage_inflictor_received: this.extractObjToArry(
          damage_inflictor_received
        ),
        damage_inflictor: this.extractObjToArry(damage_inflictor),
        damage_targets,
        hero_variant,
      });
    });

    return finalData;
  }

  // set table sort
  setDataSourceAttributes(): any {
    this.dataSource.sort = this.sort;
  }

  extractObjToArry(data: any): any[] {
    const arr = [];
    Object.keys(data).forEach((key) => {
      arr.push({
        key,
        value: data[key],
      });
    });
    return arr.sort((a, b) => b.value - a.value);
  }

  /**
   * Now the API does not container hero names json so we need to find by our own from heroes json
   * 
   * @param element template table element
   * @returns hero
   * example data: 
   * heros json: 
   * "1": {
    "id": 1,
    "name": "npc_dota_hero_antimage",
    .....
    element data:
   * "max_hero_hit": {
                "type": "max_hero_hit",
                "time": 1742,
                "max": true,
                "inflictor": "invoker_sun_strike",
                "unit": "npc_dota_hero_invoker",
                "key": "npc_dota_hero_earthshaker",
                "value": 655,
                "slot": 0,
                "player_slot": 0
              },
              
   */
  getHero(element: any): IheroLocal {
    const hero = Object.values(this.heroes).find(
      (hero) => hero.name === element
    );
    return hero;
  }
}
