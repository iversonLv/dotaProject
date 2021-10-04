import { Component, Input, OnInit } from '@angular/core';

// model
import { IheroLocal } from 'src/app/heros/model/heroLocal';

@Component({
  selector: 'app-hero-icon-player-name',
  templateUrl: './hero-icon-player-name.component.html',
  styleUrls: ['./hero-icon-player-name.component.scss']
})
export class HeroIconPlayerNameComponent implements OnInit {
  @Input() heroes: IheroLocal;
  @Input() player: any;
  @Input() playerColors: any;
  constructor() { }

  ngOnInit(): void {
  }

  calPlayerName(player: any): string {
    const { name, personaname } = player;
    if (!name) {
      if (!personaname) {
        return 'Anonymous';
      } else {
        return personaname;
      }
    } else {
      return name;
    }
  }

}
