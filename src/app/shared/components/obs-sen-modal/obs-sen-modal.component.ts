import { Component, Input, OnInit } from '@angular/core';
import { IheroLocal } from 'src/app/heros/model/heroLocal';

@Component({
  selector: 'app-obs-sen-modal',
  templateUrl: './obs-sen-modal.component.html',
  styleUrls: ['./obs-sen-modal.component.scss']
})
export class ObsSenModalComponent implements OnInit {
  @Input() heroesLocal: IheroLocal;
  @Input() player: any;
  @Input() playerColorLocal: any;
  @Input() heroesNameLocal: IheroLocal;
  @Input() playerData: any[];

  @Input() pageXY: number[] = [0, 100];
  @Input() data: any = {
    attackername: 'npc_dota_observer_wards',
    ehandle: 12353772,
    entityleft: true,
    key: '[86, 144]',
    left_time: '13:11',
    lifespan: '6:00',
    mapPosition: [94.53125, 206.25],
    placed_time: '7:11',
    player_slot: 1,
    slot: 1,
    time: 431,
    type: 'obs_log',
    x: 86,
    y: 144,
    z: 130,
  };


  constructor() { }

  ngOnInit(): void {
  }

  extractDataFromAttackername(data: any, attackername: string): any {
    if (attackername !== 'npc_dota_observer_wards') {
      const heroId = this.heroesNameLocal[attackername]?.id;
      const d = [...data];
      const player = d.filter(i => i.hero_id === heroId);
      if (player.length > 0) {
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
    } else {
      return;
    }
  }

}
