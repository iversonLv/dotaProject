import { Pipe, PipeTransform } from '@angular/core';
import { IheroLocal } from 'src/app/heros/model/heroLocal';

// dotaconstant
import heroes from 'dotaconstants/build/heroes.json';

@Pipe({
  name: 'getHero',
})
export class GetHeroPipe implements PipeTransform {
  transform(value: string): IheroLocal {
    const hero = Object.values(heroes).find((hero) => hero.name === value);
    return hero;
  }
}
