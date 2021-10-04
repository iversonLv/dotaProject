import { Component, Input, OnInit } from '@angular/core';

// dotaconstatns
import region from 'dotaconstants/build/region.json';
import gameMode from 'dotaconstants/build/game_mode.json';

// assets json does not exist in dotaconstatns
import skills from '../../../../assets/data/skills.json';

@Component({
  selector: 'app-match-hero',
  templateUrl: './match-hero.component.html',
  styleUrls: ['./match-hero.component.scss']
})
export class MatchHeroComponent implements OnInit {
  @Input() data: any;

  gameMode: any = gameMode;
  skills: any = skills;
  region: any = region;

  constructor(
  ) { }

  ngOnInit(): void {
  }

  // reparse match
  parseMatch(matchId): any {
    console.log(matchId);
  }

  // cal score
  calScore(data: any): any {
    return data.map(i => i.kills).reduce((cur, total) => cur + total, 0);
  }


}
