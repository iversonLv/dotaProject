import { Component, Input, OnInit } from '@angular/core';

// model
import { IheroLocal } from 'src/app/heros/model/heroLocal';

@Component({
  selector: 'app-team-fight-modal',
  templateUrl: './team-fight-modal.component.html',
  styleUrls: ['./team-fight-modal.component.scss']
})
export class TeamFightModalComponent implements OnInit {
  @Input() pageXY: number[] = [0, 0];
  @Input() playerData: any[];
  @Input() data: any = {
    start: 826,
    end: 859,
    last_death: 844,
    deaths: 3,
    players: [
        {
            deaths_pos: {},
            ability_uses: {
                troll_warlord_berserkers_rage: 6,
                troll_warlord_whirling_axes_ranged: 1,
                troll_warlord_whirling_axes_melee: 1
            },
            ability_targets: {},
            item_uses: {},
            killed: {},
            deaths: 0,
            buybacks: 0,
            damage: 47,
            healing: 0,
            gold_delta: 284,
            xp_delta: 183,
            xp_start: 5565,
            xp_end: 5715
        },
        {
            deaths_pos: {
                132: {
                    126: 1
                }
            },
            ability_uses: {
                shadow_shaman_ether_shock: 1,
                shadow_shaman_voodoo: 1,
                shadow_shaman_mass_serpent_ward: 1
            },
            ability_targets: {},
            item_uses: {
                magic_wand: 1
            },
            killed: {},
            deaths: 1,
            buybacks: 0,
            damage: 291,
            healing: 150,
            gold_delta: 69,
            xp_delta: 74,
            xp_start: 3643,
            xp_end: 3715
        },
        {
            deaths_pos: {
                134: {
                    124: 1
                }
            },
            ability_uses: {
                tusk_snowball: 1,
                tusk_launch_snowball: 1,
                tusk_tag_team: 1,
                tusk_ice_shards: 1
            },
            ability_targets: {},
            item_uses: {
                magic_stick: 1
            },
            killed: {},
            deaths: 1,
            buybacks: 0,
            damage: 164,
            healing: 60,
            gold_delta: 74,
            xp_delta: 17,
            xp_start: 2530,
            xp_end: 2545
        },
        {
            deaths_pos: {
                144: {
                    128: 1
                }
            },
            ability_uses: {
                pangolier_swashbuckle: 1
            },
            ability_targets: {},
            item_uses: {
                quelling_blade: 1
            },
            killed: {},
            deaths: 1,
            buybacks: 0,
            damage: 379,
            healing: 0,
            gold_delta: 14,
            xp_delta: 17,
            xp_start: 4356,
            xp_end: 4371
        },
        {
            deaths_pos: {},
            ability_uses: {
                queenofpain_scream_of_pain: 2,
                queenofpain_blink: 3
            },
            ability_targets: {},
            item_uses: {
                orchid: 1,
                bottle: 1
            },
            killed: {},
            deaths: 0,
            buybacks: 0,
            damage: 235,
            healing: 105,
            gold_delta: 155,
            xp_delta: 74,
            xp_start: 6722,
            xp_end: 6794
        },
        {
            deaths_pos: {},
            ability_uses: {
                monkey_king_wukongs_command: 1,
                monkey_king_boundless_strike: 1,
                monkey_king_tree_dance: 2,
                monkey_king_primal_spring: 1
            },
            ability_targets: {},
            item_uses: {
                phase_boots: 3
            },
            killed: {},
            deaths: 0,
            buybacks: 0,
            damage: 2273,
            healing: 0,
            gold_delta: 385,
            xp_delta: 608,
            xp_start: 5897,
            xp_end: 6505
        },
        {
            deaths_pos: {},
            ability_uses: {
                leshrac_split_earth: 1,
                leshrac_pulse_nova: 4,
                leshrac_lightning_storm: 1
            },
            ability_targets: {},
            item_uses: {
                tpscroll: 1,
                clarity: 1
            },
            killed: {
                npc_dota_hero_tusk: 1
            },
            deaths: 0,
            buybacks: 0,
            damage: 100,
            healing: 0,
            gold_delta: 593,
            xp_delta: 916,
            xp_start: 6518,
            xp_end: 7263
        },
        {
            deaths_pos: {},
            ability_uses: {
                alchemist_acid_spray: 1,
                alchemist_chemical_rage: 1,
                alchemist_unstable_concoction: 1,
                alchemist_unstable_concoction_throw: 1
            },
            ability_targets: {},
            item_uses: {
                soul_ring: 2,
                magic_stick: 1
            },
            killed: {},
            deaths: 0,
            buybacks: 0,
            damage: 390,
            healing: 8,
            gold_delta: 226,
            xp_delta: 484,
            xp_start: 6027,
            xp_end: 6511
        },
        {
            deaths_pos: {},
            ability_uses: {
                lion_impale: 1,
                lion_voodoo: 1,
                lion_finger_of_death: 1,
                lion_mana_drain: 1
            },
            ability_targets: {},
            item_uses: {
                magic_stick: 1
            },
            killed: {
                npc_dota_hero_pangolier: 1
            },
            deaths: 0,
            buybacks: 0,
            damage: 600,
            healing: 75,
            gold_delta: 369,
            xp_delta: 494,
            xp_start: 2683,
            xp_end: 3177
        },
        {
            deaths_pos: {},
            ability_uses: {
                abaddon_death_coil: 1,
                abaddon_aphotic_shield: 1
            },
            ability_targets: {},
            item_uses: {},
            killed: {},
            deaths: 0,
            buybacks: 0,
            damage: 380,
            healing: 0,
            gold_delta: 242,
            xp_delta: 464,
            xp_start: 2737,
            xp_end: 3201
        }
    ]
};
  @Input() heroes: IheroLocal;
  @Input() playerColorLocal: any;
  constructor() { }

  ngOnInit(): void {
  }

}
