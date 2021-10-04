import { Component, Input, OnInit } from '@angular/core';

// model
import { IheroLocal } from 'src/app/heros/model/heroLocal';

@Component({
  selector: 'app-player-box',
  templateUrl: './player-box.component.html',
  styleUrls: ['./player-box.component.scss']
})
export class PlayerBoxComponent implements OnInit {
  @Input() data;
  @Input() heroes: IheroLocal;
  @Input() playerColors: any;
  constructor() { }

  // hero modal default hidden
  showHeroModal = false;
  currentMouseOverHero: IheroLocal = null;
  pageXY = [];

  ngOnInit(): void {
  }

  showHeroModalFn(e, id): any {
    this.pageXY = [e.pageX + 50, e.pageY - 120];
    this.showHeroModal = true;
    this.currentMouseOverHero = this.heroes[id];
  }

}
