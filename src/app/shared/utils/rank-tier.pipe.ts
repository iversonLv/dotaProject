import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'rankTier'
})
export class RankTierPipe implements PipeTransform {
  tierMapping = ['Herald', 'Guardian', 'Crusader', 'Archon', 'Legend', 'Ancient', 'Divine' , 'Immortal'];

  transform(value: unknown, ...args: unknown[]): unknown {
    if (value !== null) {
      const tier = +value?.toString()[0] - 1;
      const star = value?.toString()[1];
      if (tier === 7) {
        // If rank tier is Immortal won't have star num
        return `${this.tierMapping[tier]}`;
      } else {
        if (star === undefined) {
          return `${this.tierMapping[tier]}`;
        } else {
          return `${this.tierMapping[tier]} [ ${star} ]`;
        }
      }
    } else {
      return `Unknown`;
    }
  }

}
