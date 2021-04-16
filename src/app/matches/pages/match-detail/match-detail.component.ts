import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

// ngrx
import { Store } from '@ngrx/store';
import * as matchesActions from '../../store/matches.actions';
import * as teamsActions from 'src/app/teams/store/teams.actions';

// model
import { ISingleMatchData, ISingleMatchPickBand } from '../../model/onematch';
import { ITeamData } from 'src/app/teams/model/team';
import { IheroLocal } from 'src/app/heros/model/heroLocal';
import { IItemColorLocal } from 'src/app/shared/model/item_color';
import { IHeroAbility } from 'src/app/heros/model/hero-abilities';

// service
import { HerosService } from 'src/app/heros/services/heros.service';
import { PlayerColorService } from 'src/app/services/player-color.service';
import { ItemsService } from 'src/app/services/items.service';
import { PermanentBuffsService } from 'src/app/services/permanent-buffs.service';
import { LaneRoleService } from 'src/app/services/lane-role.service';
import { ChatWheelService } from 'src/app/services/chat-wheel.service';

// pipe
import { DurationFormatPipe } from 'src/app/shared/utils/duration-format.pipe';

@Component({
  selector: 'app-match-detail',
  templateUrl: './match-detail.component.html',
  styleUrls: ['./match-detail.component.scss'],
  providers: [DurationFormatPipe]
})
export class MatchDetailComponent implements OnInit {
  isLoading = false;
  matchData: any;
  currentPage;

  // ablity modal default hidden
  currentMouseOverAbilityName = null;
  pageXY = [];
  showAbilityModal = false;

  // item modal default hidden
  showItemModal = false;
  currentMouseOverItem: any = null;
  currentMouseOverAghs: any = null;

  currentTeamFightDataForTable = null;
  currentTeamFightDataForMap = null;


  // User for hero modal to mapping
  heroesLocal: IheroLocal;
  heroesNameLocal: IheroLocal;
  laneRoleLocal: any;
  itemIdsLocal: any;
  itemsLocal: any;
  aghsDescriptionLocal: any;
  itemColorLocal: IItemColorLocal;
  abilitiesByIdLocal: any; // this is for overview page that ability_upgrades_arr[]
  playerColorLocal: any;
  heroesAbilitiesTalentsLocal: IHeroAbility;
  abilitiesTalentsLocal: any;
  permanentBuffsLocal: any;
  chatWheelLocal: any;


  showHideVisionPlayersData = {};

  // vision timeline
  visionTimeLine = -90;
  visionTimeLinePerMinSteps: number[];

  // reason mapping for farm bottom stack bar chart
  xpReasonMapping = {
    0: {
      color: '#609cc8',
      title: 'other',
    },
    1: {
      color: '#ff8127',
      title: 'hero',
    },
    2: {
      color: '#2ca02c',
      title: 'creep',
    },
    3: {
      color: '#da272b',
      title: 'roshan',
    }
  };

  goldReasonMapping = {
    0: {
      color: '#609cc8',
      title: 'other',
    },
    1: {
      color: '#ff8127',
      title: 'death',
    },
    11: {
      color: '#da272b',
      title: 'building',
    },
    12: {
      color: '#9962b9',
      title: 'hero',
    },
    13: {
      color: '#96635a',
      title: 'creep',
    },
    14: {
      color: '#eb80c4',
      title: 'neutrals',
    },
    15: {
      color: '#b9c03c',
      title: 'roshan',
    },
    17: {
      color: '#12c3d2',
      title: 'rune',
    },
    20: {
      color: '#609cc8',
      title: 'ward',
    },
  };

  // item tab show consumable
  enableConsumable = false;

  constructor(
    private durationFormat: DurationFormatPipe,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private chatWheelService: ChatWheelService,
    private herosService: HerosService,
    private laneRoleService: LaneRoleService,
    private itemsService: ItemsService,
    private playerColorService: PlayerColorService,
    private permanentBuffsService: PermanentBuffsService,
    private store: Store<{ singleMatch: ISingleMatchData, teamsGeneral: ITeamData, }>
  ) { }

  ngOnInit(): void {
    this.currentPage = this.router.url.split('/')[3];

    const matchId = this.activatedRoute.snapshot.paramMap.get('id');
    this.store.dispatch(new matchesActions.LoadMatch(matchId));
    this.store.select('singleMatch').subscribe(data => {
      this.isLoading = data.isLoading;
      if (!data.isLoading) {
        const singleMatchData = [ ...data.match ];
        this.isLoading = data.isLoading;
        this.matchData = singleMatchData[0];
        // this.currentTeamFightDataForTable = singleMatchData[0].teamfights[0].players;
        this.getShowHideVisionPlayersData(singleMatchData[0]?.players, this.visionTimeLine);
        this.extractvisionTimeLinelineTickPerMinute(singleMatchData[0]?.duration, 10);
        return this.matchData;
      }
    }, err => {
      console.log(err);
    });


    this.router.events
    .subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.currentPage = event.url.split('/')[3]; // Grab last route 'overview'
      }
    });

    // get all heroes local data
    this.getHeroesLocal();
    this.getLaneRoleLocal();
    // this use for some data grab hero data via hero name rather than id
    this.getHeroesNameLocal();
    this.getPlayerColor();
    this.getAbilitiesTalentsLocal();
    this.getAbilitiesByIdLocal();
    this.getItemsLocal();
    this.getItemColorLocal();
    this.getItemIdsLocal();
    this.getAghsDescriptionLocal();
    this.getPermanentBuffsLocal();
    this.getChatWheelLocal();

  }

  // get chat Wheel mapping data
  getChatWheelLocal(): any {
    this.chatWheelService.getChatWheelLocal().subscribe(data => {
      this.chatWheelLocal = data;
    }, err => {
      console.log(err);
    });
  }

  // get hero local data
  getHeroesNameLocal(): any {
    this.herosService.getHeroesNameLocal().subscribe(data => {
      this.heroesNameLocal = data;
    }, err => {
      console.log(err);
    });
  }

  getLaneRoleLocal(): any {
    this.laneRoleService.getLaneRoleLocal().subscribe(data => this.laneRoleLocal = data);
  }

  // get ablities
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


  // get hero local data base name
  getHeroesLocal(): any {
    this.herosService.getHeroesLocal().subscribe(data => {
      this.heroesLocal = data;
    }, err => {
      console.log(err);
    });
  }

  // get player color
  getPlayerColor(): any {
    this.playerColorService.getPlayerColorLocal().subscribe(data => {
      this.playerColorLocal = data;
    }, err => {
      console.log(err);
    });
  }

  // get abilities by id
  getAbilitiesByIdLocal(): any {
    this.herosService.getAbilitiesByIdLocal().subscribe(data => {
      this.abilitiesByIdLocal = data;
    }, err => {
      console.log(err);
    });
  }

  getItemColorLocal(): any {
    this.itemsService.getItemColorLocal().subscribe(data => {
      this.itemColorLocal = data;
    }, err => {
      console.log(err);
    });
  }

  getItemIdsLocal(): any {
    this.itemsService.getItemIdsLocal().subscribe(data => {
    this.itemIdsLocal = data;
    }, err => {
      console.log(err);
    });
  }

  getAghsDescriptionLocal(): any {
    this.itemsService.getAghsDescriptionLocal().subscribe(data => {
    this.aghsDescriptionLocal = data;
    }, err => {
      console.log(err);
    });
  }

  getItemsLocal(): any {
    this.itemsService.getItemsLocal().subscribe(data => {
    this.itemsLocal = data;
    }, err => {
      console.log(err);
    });
  }

  getPermanentBuffsLocal(): any {
    this.permanentBuffsService.getPermanentBuffsLocal().subscribe(data => {
    this.permanentBuffsLocal = data;
    }, err => {
      console.log(err);
    });
  }

  // show/hide ability modal
  showAbilityModalFn(emitObj): any {
    const e = emitObj[0];
    const abilityName = emitObj[1];
    this.pageXY = [e.pageX - 370, e.pageY - 280];
    this.showAbilityModal = true;
    this.currentMouseOverAbilityName = abilityName;
  }

  showItemModalFn(emitObj): any {
    const e = emitObj[0];
    const itemId = emitObj[1];
    this.pageXY = [e.pageX - 350, e.pageY - 120];
    this.showItemModal = true;

    // if does not has agh
    if (emitObj[2] && emitObj[2] !== '' && emitObj[2] !== undefined) {
      this.currentMouseOverAghs = this.showAghsDescriptionLocal(emitObj[2]);
    }
    this.currentMouseOverItem = this.itemsLocal[this.itemIdsLocal[itemId]];
  }

  showAghsDescriptionLocal([heroId, hasScepterShard ]): any {
    const heroAghs = this.aghsDescriptionLocal.filter(i => i.hero_id === heroId)[0];
    const abilitiesArr = this.extractAblitiesArr(this.abilitiesTalentsLocal);
    return {
      has: hasScepterShard,
      ...heroAghs,
      scepter_img: abilitiesArr.find(i => i.dname === heroAghs.scepter_skill_name).img,
      shard_img: abilitiesArr.find(i => i.dname === heroAghs.shard_skill_name).img,
    };
  }

  // extractAblitiesArr
  extractAblitiesArr(data: any): any[] {
    return Object.values(data);
  }

  extractBanPickListBaseOnTeam(data: ISingleMatchPickBand[], team: number): ISingleMatchPickBand[] {
    if (data) {
      return data.filter(i => i.team === team);
    } else {
      return;
    }
  }

  emitCurrentTeamFightData(e): void {
    this.currentTeamFightDataForMap = e;
    this.currentTeamFightDataForTable = e.players;
    console.log('emit teamfight', this.currentTeamFightDataForTable);
  }

  emitShowHideVisionPlayersData(e: any): any {
    console.log('emit show hide player data', e);
    this.showHideVisionPlayersData = { ...this.showHideVisionPlayersData, ...e };
    console.log(this.showHideVisionPlayersData);
    return this.showHideVisionPlayersData;
  }

  // extract matches players[] to less data to meet for this page table
  getShowHideVisionPlayersData(data: any[], timeline: number): any {
    data.forEach(i => {
      const { hero_id, player_slot } = i;
      this.showHideVisionPlayersData[hero_id] = { hero_id, player_slot, obs_log: true, sen_log: true, timeline };
    });
    console.log(this.showHideVisionPlayersData);
    return this.showHideVisionPlayersData;
  }

  // show duation label on vision slider
  durationLabel(duration: number): string {
    let minus = false;
    duration < 0 ? minus = true : minus = false;
    const getMin = (Math.abs(Math.floor(duration) / 60)).toString().split('.')[0];
    let getSec = Math.abs(Math.floor(duration)) % 60 === 0 ? '00' : Math.abs(Math.floor(duration)) % 60;
    if (getSec < 10 && getSec > 0) {
      getSec = '0' + getSec + '';
    }
    return minus ? `-${getMin}:${getSec}` : `${getMin}:${getSec}`;
  }

  // vision time slider change
  updatevisionTimeLine(e): number {
    return this.visionTimeLine = e.value;
  }


  // dynamic show X perminute step tick, example, duration is 38:01, so tick step will be 0, 1, 2, 3 for 0:00; 10:00; 20:00; 30:00
  extractvisionTimeLinelineTickPerMinute(duration: number, perMinute: number): number[] {
    const arr = [];
    for (let i = 0; i <= Math.floor(duration / (perMinute * 60)); i++) {
      arr.push(i);
    }
    // console.log(visionTimeLineStepPerMinArr);
    return this.visionTimeLinePerMinSteps = arr;
  }

}
