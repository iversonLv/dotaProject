import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { IHero } from '../../model/hero';
import { IHeroAbility } from '../../model/hero-abilities';

// model
import { IheroLocal } from '../../model/heroLocal';
import { HerosService } from '../../services/heros.service';

@Component({
  selector: 'app-heroes-hero',
  templateUrl: './heroes-hero.component.html',
  styleUrls: ['./heroes-hero.component.scss']
})
export class HeroesHeroComponent implements OnInit {
  showSubBox = false; // show/hide the sub detail

  // User for hero modal to mapping
  heroesLocal: IheroLocal;
  heroesAbilitiesTalentsLocal: IHeroAbility;
  abilitiesTalentsLocal: any;

  // ablity modal default hidden
  currentMouseOverAbilityName = null;
  currentMouseOverTalent = null;
  pageXY = [];
  showAbilityModal = false;
  showTalentModal = false;

  hero: IHero;

  constructor(
    private herosService: HerosService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    const currentUrl = this.router.url;
    let heroId = +currentUrl.split('/')[2];

    // get all heroes local data
    this.getHeroesLocal(heroId);
    this.getAbilitiesTalentsLocal();
    this.getHeroesAbilitiesTalentsLocal();

    // update the hero after click matchup other hero
    this.router.events
    .subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // example url is /heroes/86/rankings
        const currentRoute = event.url.split('/')[3]; // Grab last route 'rankings'
        // if heroId change will dispatch the player data or won't dispatch
        if (heroId !== +event.url.split('/')[2] && currentRoute !== 'rankings') {
          heroId = +event.url.split('/')[2]; // Grab middle id
          this.getHeroesLocal(heroId); // Rerun the getPlayerData data
        }
      }
    });
  }

  getHeroesLocal(heroId): any {
    this.herosService.getHeroesLocal().subscribe(data => {
      this.hero = data[heroId];
    }, err => {
      console.log(err);
    });
  }

  getHeroesAbilitiesTalentsLocal(): any {
    this.herosService.getHeroesAbilitiesTalentsLocal().subscribe(data => {
      this.heroesAbilitiesTalentsLocal = data;
    }, err => {
      console.log(err);
    });
  }

  getAbilitiesTalentsLocal(): any {
    this.herosService.getAbilitiesTalentsLocal().subscribe(data => {
      this.abilitiesTalentsLocal = data;
      }, err => {
        console.log(err);
      });
  }

  // show/hide ability modal
  showAbilityModalFn(e, abilityName): any {
    this.pageXY = [e.pageX - 380, e.pageY + 20];
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
