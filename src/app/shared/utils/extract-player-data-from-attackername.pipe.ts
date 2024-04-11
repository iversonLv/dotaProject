import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'extractPlayerDataFromAttackername',
})
export class ExtractPlayerDataFromAttackernamePipe implements PipeTransform {
  transform(id: number, data: any, attackername): any {
    if (attackername !== 'npc_dota_observer_wards') {
      const player = [...data].find((i) => i.hero_id === id);
      if (player) {
        const {
          hero_id,
          player_slot,
          pred_vict,
          account_id,
          rank_tier,
          name,
          personaname,
        } = player;
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
      return {};
    }
  }
}
