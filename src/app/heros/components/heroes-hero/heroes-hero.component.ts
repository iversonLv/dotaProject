import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { IHero } from '../../model/hero';
import { IHeroAbility } from '../../model/hero-abilities';

// model
import { IheroLocal } from '../../model/heroLocal';

// dotaconstant
import heroes from 'dotaconstants/build/heroes.json';
import heroAbilities from 'dotaconstants/build/hero_abilities.json';
import abilities from 'dotaconstants/build/abilities.json';
import heroLore from 'dotaconstants/build/hero_lore.json';
import aghsDesc from 'dotaconstants/build/aghs_desc.json';

@Component({
  selector: 'app-heroes-hero',
  templateUrl: './heroes-hero.component.html',
  styleUrls: ['./heroes-hero.component.scss']
})
export class HeroesHeroComponent implements OnInit {
  showSubBox = false; // show/hide the sub detail

  // User for hero modal to mapping
  hero: IHero;
  heroAbilities: any = heroAbilities;
  abilities: any = abilities;
  heroLore: any = heroLore;
  aghsDesc: any = aghsDesc;

  // ablity modal default hidden
  currentMouseOverAbilityName = null;
  currentMouseOverTalent = null;
  pageXY = [];
  showAbilityModal = false;
  showTalentModal = false;
  heroAghsDesc: any = null;

  // showHeroAghsDescModal
  showHeroAghsDescModal = false;

  constructor(
    private router: Router,
  ) { }

  ngOnInit(): void {
    const currentUrl = this.router.url;
    let heroId = +currentUrl.split('/')[2];

    // get all heroes local data
    this.hero = heroes[heroId];

    // update the hero after click matchup other hero
    this.router.events
    .subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // example url is /heroes/86/rankings
        const currentRoute = event.url.split('/')[3]; // Grab last route 'rankings'
        // if heroId change will dispatch the player data or won't dispatch
        if (heroId !== +event.url.split('/')[2] && currentRoute !== 'rankings') {
          this.hero = null;
          heroId = +event.url.split('/')[2]; // Grab middle id
          this.hero = heroes[heroId]; // Rerun the getPlayerData data
        }
      }
    });

    this.showAghsDescriptionLocal(heroId);
  }

  showAghsDescriptionLocal(heroId): void {
    const heroAghs = this.aghsDesc.filter(i => i.hero_id === heroId)[0];
    const abilitiesArr = this.extractAblitiesArr(this.abilities);
    this.heroAghsDesc =  {
      ...heroAghs,
      scepter_img: abilitiesArr.find(i => i.dname === heroAghs.scepter_skill_name).img,
      shard_img: abilitiesArr.find(i => i.dname === heroAghs.shard_skill_name).img,
    };
  }

  // extractAblitiesArr
  extractAblitiesArr(data: any): any[] {
    return Object.values(data);
  }

  showHeroAghsDescModalFn(e): any {
    this.pageXY = [e.pageX - 380, e.pageY + 20];
    this.showHeroAghsDescModal = true;
  }

  // show/hide ability modal
  showAbilityModalFn(e, abilityName): any {
    this.pageXY = [e.pageX - 480, e.pageY - 100];
    this.showAbilityModal = true;
    this.currentMouseOverAbilityName = abilityName;
  }

  // show/hide talent modal
  showTalentModalFn(e, talents): any {
    this.pageXY = [e.pageX - 480, e.pageY - 100];
    this.showTalentModal = true;
    this.currentMouseOverTalent = talents;
  }
}
