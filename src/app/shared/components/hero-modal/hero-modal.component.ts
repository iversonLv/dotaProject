import { Component, Input, OnInit } from '@angular/core';
import { IheroLocal } from 'src/app/heros/model/heroLocal';

@Component({
  selector: 'app-hero-modal',
  templateUrl: './hero-modal.component.html',
  styleUrls: ['./hero-modal.component.scss']
})
export class HeroModalComponent implements OnInit {
  @Input() pageXY: number[];
  @Input() hero: IheroLocal;
  // @Input() pageXY = [0, 0];
  // @Input() hero: IheroLocal = {
  //   id: 128,
  //   name: 'npc_dota_hero_snapfire',
  //   localized_name: 'Snapfire',
  //   primary_attr: 'str',
  //   attack_type: 'Ranged',
  //   roles: [
  //     'Support',
  //     'Nuker',
  //     'Disabler',
  //     'Escape'
  //   ],
  //   img: '/apps/dota2/images/heroes/snapfire_full.png?',
  //   icon: '/apps/dota2/images/heroes/snapfire_icon.png',
  //   base_health: 200,
  //   base_health_regen: null,
  //   base_mana: 75,
  //   base_mana_regen: 0,
  //   base_armor: 0,
  //   base_mr: 25,
  //   base_attack_min: 26,
  //   base_attack_max: 32,
  //   base_str: 20,
  //   base_agi: 16,
  //   base_int: 18,
  //   str_gain: 3.3,
  //   agi_gain: 1.9,
  //   int_gain: 2.2,
  //   attack_range: 500,
  //   projectile_speed: 1800,
  //   attack_rate: 1.6,
  //   move_speed: 300,
  //   turn_rate: 0.5,
  //   cm_enabled: true,
  //   legs: 2
  // };
  constructor() { }

  ngOnInit(): void {
  }

}
