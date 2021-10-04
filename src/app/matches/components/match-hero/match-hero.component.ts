import { Component, Input, OnInit } from '@angular/core';

// service
import { GameModeService } from 'src/app/services/game-mode.service';
import { RegionService } from 'src/app/services/region.service';

// dotaconstatns

// assets json does not exist in dotaconstatns
import skills from '../../../../assets/data/skills.json';

@Component({
  selector: 'app-match-hero',
  templateUrl: './match-hero.component.html',
  styleUrls: ['./match-hero.component.scss']
})
export class MatchHeroComponent implements OnInit {
  @Input() data: any;

  gameModeLocal;
  skills: any = skills;
  regionLocal;

  constructor(
    private gameModeService: GameModeService,
    private regionService: RegionService,
  ) { }

  ngOnInit(): void {

    this.getGameModeLocal();
    this.getRegionLocal();
  }

  getGameModeLocal(): any {
    this.gameModeService.getGameModeLocal().subscribe(data => {
      this.gameModeLocal = data;
    }, err => {
      console.log(err);
    });
  }


  getRegionLocal(): any {
    this.regionService.getRegionLocal().subscribe(data => {
      this.regionLocal = data;
    }, err => {
      console.log(err);
    });

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
