import { Component, Input, OnInit } from '@angular/core';

// model
import { IheroLocal } from 'src/app/heros/model/heroLocal';

// dotaconstant
import heroAbilities from 'dotaconstants/build/hero_abilities.json';
import { IFacte } from 'src/app/heros/model/facte';

@Component({
  selector: 'app-player-box',
  templateUrl: './player-box.component.html',
  styleUrls: ['./player-box.component.scss'],
})
export class PlayerBoxComponent implements OnInit {
  @Input() data;
  @Input() heroes: IheroLocal;
  @Input() playerColors: any;
  constructor() {}

  heroAbilities: any = heroAbilities;

  // hero modal default hidden
  showHeroModal = false;
  showFacteModal = false;
  currentMouseOverHero: IheroLocal = null;
  currentMouseOverFacte: IFacte = null;
  pageXY = [];

  ngOnInit(): void {}

  showHeroModalFn(e, id): any {
    this.pageXY = [e.pageX + 50, e.pageY - 120];
    this.showHeroModal = true;
    this.currentMouseOverHero = this.heroes[id];
  }

  showFacteModalFn(e, facet): any {
    this.pageXY = [e.pageX + 50, e.pageY - 120];
    this.showFacteModal = true;
    this.currentMouseOverFacte = facet;
  }
}
