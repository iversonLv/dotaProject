import { Component, Input, OnInit } from '@angular/core';

// service
import { GameModeService } from 'src/app/services/game-mode.service';
import { RegionService } from 'src/app/services/region.service';
import { SkillService } from 'src/app/services/skill.service';

@Component({
  selector: 'app-match-hero',
  templateUrl: './match-hero.component.html',
  styleUrls: ['./match-hero.component.scss']
})
export class MatchHeroComponent implements OnInit {
  @Input() data: any;

  gameModeLocal;
  skillLocal;
  regionLocal;

  constructor(
    private gameModeService: GameModeService,
    private skillService: SkillService,
    private regionService: RegionService,
  ) { }

  ngOnInit(): void {

    this.getGameModeLocal();
    this.getSkillLocal();
    this.getRegionLocal();
  }

  getGameModeLocal(): any {
    this.gameModeService.getGameModeLocal().subscribe(data => {
      this.gameModeLocal = data;
    }, err => {
      console.log(err);
    });
  }

  getSkillLocal(): any {
    this.skillService.getSkillLocal().subscribe(data => {
      this.skillLocal = data;
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
    console.log(matchId)
  }


}
