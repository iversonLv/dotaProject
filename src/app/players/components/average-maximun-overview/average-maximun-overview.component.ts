import { Component, Input, OnInit } from '@angular/core';

// model
import { IheroLocal } from 'src/app/heros/model/heroLocal';
import { IMatch } from 'src/app/matches/model/match';
import { IRecentMatch } from 'src/app/matches/model/recent-match';

// pipe
import { GreaterNumPipe } from '../../../shared/utils/greater-num.pipe';
import { DurationFormatPipe } from '../../../shared/utils/duration-format.pipe';
import { ActivatedRoute } from '@angular/router';

// dotaconstants
import heroes from 'dotaconstants/build/heroes.json';

@Component({
  selector: 'app-average-maximun-overview',
  templateUrl: './average-maximun-overview.component.html',
  styleUrls: ['./average-maximun-overview.component.scss'],
  providers: [GreaterNumPipe, DurationFormatPipe]
})
export class AverageMaximunOverviewComponent implements OnInit {
  @Input() data: IMatch[] | IRecentMatch[] = [];
  @Input() enableTurbo: boolean;
  // [
  //     {
  //         match_id: 5877327620,
  //         player_slot: 2,
  //         radiant_win: false,
  //         duration: 2565,
  //         game_mode: 22,
  //         lobby_type: 7,
  //         hero_id: 128,
  //         start_time: 1615309670,
  //         version: 21,
  //         kills: 6,
  //         deaths: 9,
  //         assists: 6,
  //         skill: 1,
  //         xp_per_min: 468,
  //         gold_per_min: 284,
  //         hero_damage: 21168,
  //         tower_damage: 255,
  //         hero_healing: 0,
  //         last_hits: 87,
  //         lane: 1,
  //         lane_role: 1,
  //         is_roaming: false,
  //         cluster: 227,
  //         leaver_status: 0,
  //         party_size: 1
  //     },
  //     {
  //         match_id: 5877244981,
  //         player_slot: 3,
  //         radiant_win: true,
  //         duration: 2185,
  //         game_mode: 22,
  //         lobby_type: 7,
  //         hero_id: 128,
  //         start_time: 1615306774,
  //         version: 21,
  //         kills: 5,
  //         deaths: 8,
  //         assists: 22,
  //         skill: 1,
  //         xp_per_min: 553,
  //         gold_per_min: 439,
  //         hero_damage: 23448,
  //         tower_damage: 5278,
  //         hero_healing: 800,
  //         last_hits: 123,
  //         lane: 1,
  //         lane_role: 1,
  //         is_roaming: false,
  //         cluster: 227,
  //         leaver_status: 0,
  //         party_size: 1
  //     },
  //     {
  //         match_id: 5876215995,
  //         player_slot: 129,
  //         radiant_win: true,
  //         duration: 2699,
  //         game_mode: 3,
  //         lobby_type: 7,
  //         hero_id: 5,
  //         start_time: 1615271802,
  //         version: 21,
  //         kills: 8,
  //         deaths: 12,
  //         assists: 21,
  //         skill: 1,
  //         xp_per_min: 494,
  //         gold_per_min: 284,
  //         hero_damage: 27179,
  //         tower_damage: 117,
  //         hero_healing: 0,
  //         last_hits: 37,
  //         lane: 1,
  //         lane_role: 3,
  //         is_roaming: false,
  //         cluster: 227,
  //         leaver_status: 0,
  //         party_size: 1
  //     },
  //     {
  //         match_id: 5876160480,
  //         player_slot: 1,
  //         radiant_win: true,
  //         duration: 2540,
  //         game_mode: 22,
  //         lobby_type: 7,
  //         hero_id: 128,
  //         start_time: 1615268726,
  //         version: 21,
  //         kills: 7,
  //         deaths: 7,
  //         assists: 23,
  //         skill: 1,
  //         xp_per_min: 677,
  //         gold_per_min: 396,
  //         hero_damage: 26507,
  //         tower_damage: 516,
  //         hero_healing: 0,
  //         last_hits: 83,
  //         lane: 1,
  //         lane_role: 1,
  //         is_roaming: false,
  //         cluster: 227,
  //         leaver_status: 0,
  //         party_size: 1
  //     },
  //     {
  //         match_id: 5874478671,
  //         player_slot: 132,
  //         radiant_win: false,
  //         duration: 2465,
  //         game_mode: 3,
  //         lobby_type: 7,
  //         hero_id: 40,
  //         start_time: 1615193142,
  //         version: 21,
  //         kills: 2,
  //         deaths: 6,
  //         assists: 24,
  //         skill: 1,
  //         xp_per_min: 573,
  //         gold_per_min: 350,
  //         hero_damage: 24390,
  //         tower_damage: 1157,
  //         hero_healing: 0,
  //         last_hits: 135,
  //         lane: 3,
  //         lane_role: 1,
  //         is_roaming: false,
  //         cluster: 227,
  //         leaver_status: 0,
  //         party_size: 1
  //     },
  //     {
  //         match_id: 5874299539,
  //         player_slot: 128,
  //         radiant_win: true,
  //         duration: 2603,
  //         game_mode: 3,
  //         lobby_type: 7,
  //         hero_id: 64,
  //         start_time: 1615184800,
  //         version: 21,
  //         kills: 10,
  //         deaths: 11,
  //         assists: 23,
  //         skill: 1,
  //         xp_per_min: 560,
  //         gold_per_min: 341,
  //         hero_damage: 20712,
  //         tower_damage: 617,
  //         hero_healing: 0,
  //         last_hits: 65,
  //         lane: 3,
  //         lane_role: 1,
  //         is_roaming: false,
  //         cluster: 227,
  //         leaver_status: 0,
  //         party_size: 1
  //     },
  //     {
  //         match_id: 5874233098,
  //         player_slot: 130,
  //         radiant_win: true,
  //         duration: 3324,
  //         game_mode: 3,
  //         lobby_type: 7,
  //         hero_id: 101,
  //         start_time: 1615180958,
  //         version: 21,
  //         kills: 10,
  //         deaths: 7,
  //         assists: 15,
  //         skill: null,
  //         xp_per_min: 687,
  //         gold_per_min: 288,
  //         hero_damage: 33352,
  //         tower_damage: 155,
  //         hero_healing: 0,
  //         last_hits: 57,
  //         lane: 1,
  //         lane_role: 3,
  //         is_roaming: false,
  //         cluster: 227,
  //         leaver_status: 0,
  //         party_size: 1
  //     },
  //     {
  //         match_id: 5873504693,
  //         player_slot: 128,
  //         radiant_win: true,
  //         duration: 2537,
  //         game_mode: 22,
  //         lobby_type: 7,
  //         hero_id: 2,
  //         start_time: 1615137313,
  //         version: 21,
  //         kills: 7,
  //         deaths: 13,
  //         assists: 14,
  //         skill: 1,
  //         xp_per_min: 310,
  //         gold_per_min: 279,
  //         hero_damage: 20473,
  //         tower_damage: 0,
  //         hero_healing: 0,
  //         last_hits: 90,
  //         lane: 1,
  //         lane_role: 3,
  //         is_roaming: false,
  //         cluster: 227,
  //         leaver_status: 0,
  //         party_size: 1
  //     },
  //     {
  //         match_id: 5873427990,
  //         player_slot: 0,
  //         radiant_win: true,
  //         duration: 2092,
  //         game_mode: 22,
  //         lobby_type: 7,
  //         hero_id: 128,
  //         start_time: 1615134674,
  //         version: 21,
  //         kills: 6,
  //         deaths: 4,
  //         assists: 16,
  //         skill: 1,
  //         xp_per_min: 451,
  //         gold_per_min: 371,
  //         hero_damage: 14973,
  //         tower_damage: 1022,
  //         hero_healing: 1200,
  //         last_hits: 76,
  //         lane: 1,
  //         lane_role: 1,
  //         is_roaming: false,
  //         cluster: 225,
  //         leaver_status: 0,
  //         party_size: 1
  //     },
  //     {
  //         match_id: 5872800496,
  //         player_slot: 130,
  //         radiant_win: false,
  //         duration: 2236,
  //         game_mode: 3,
  //         lobby_type: 7,
  //         hero_id: 5,
  //         start_time: 1615119420,
  //         version: 21,
  //         kills: 2,
  //         deaths: 4,
  //         assists: 23,
  //         skill: 1,
  //         xp_per_min: 547,
  //         gold_per_min: 347,
  //         hero_damage: 16131,
  //         tower_damage: 1149,
  //         hero_healing: 0,
  //         last_hits: 66,
  //         lane: 3,
  //         lane_role: 1,
  //         is_roaming: false,
  //         cluster: 227,
  //         leaver_status: 0,
  //         party_size: 1
  //     },
  //     {
  //         match_id: 5872412832,
  //         player_slot: 3,
  //         radiant_win: true,
  //         duration: 2907,
  //         game_mode: 22,
  //         lobby_type: 7,
  //         hero_id: 7,
  //         start_time: 1615108418,
  //         version: 21,
  //         kills: 5,
  //         deaths: 12,
  //         assists: 18,
  //         skill: null,
  //         xp_per_min: 590,
  //         gold_per_min: 362,
  //         hero_damage: 18453,
  //         tower_damage: 788,
  //         hero_healing: 0,
  //         last_hits: 109,
  //         lane: 1,
  //         lane_role: 1,
  //         is_roaming: false,
  //         cluster: 227,
  //         leaver_status: 0,
  //         party_size: 1
  //     },
  //     {
  //         match_id: 5872317406,
  //         player_slot: 128,
  //         radiant_win: true,
  //         duration: 2036,
  //         game_mode: 22,
  //         lobby_type: 7,
  //         hero_id: 47,
  //         start_time: 1615105895,
  //         version: 21,
  //         kills: 3,
  //         deaths: 12,
  //         assists: 9,
  //         skill: 1,
  //         xp_per_min: 447,
  //         gold_per_min: 311,
  //         hero_damage: 17501,
  //         tower_damage: 0,
  //         hero_healing: 0,
  //         last_hits: 125,
  //         lane: 1,
  //         lane_role: 3,
  //         is_roaming: false,
  //         cluster: 227,
  //         leaver_status: 0,
  //         party_size: 1
  //     },
  //     {
  //         match_id: 5871046123,
  //         player_slot: 4,
  //         radiant_win: false,
  //         duration: 2091,
  //         game_mode: 3,
  //         lobby_type: 7,
  //         hero_id: 120,
  //         start_time: 1615048580,
  //         version: 21,
  //         kills: 8,
  //         deaths: 9,
  //         assists: 10,
  //         skill: 1,
  //         xp_per_min: 566,
  //         gold_per_min: 388,
  //         hero_damage: 18487,
  //         tower_damage: 36,
  //         hero_healing: 0,
  //         last_hits: 143,
  //         lane: 3,
  //         lane_role: 3,
  //         is_roaming: false,
  //         cluster: 227,
  //         leaver_status: 0,
  //         party_size: 1
  //     },
  //     {
  //         match_id: 5870870900,
  //         player_slot: 4,
  //         radiant_win: false,
  //         duration: 2876,
  //         game_mode: 3,
  //         lobby_type: 7,
  //         hero_id: 19,
  //         start_time: 1615043754,
  //         version: 21,
  //         kills: 8,
  //         deaths: 11,
  //         assists: 11,
  //         skill: null,
  //         xp_per_min: 590,
  //         gold_per_min: 365,
  //         hero_damage: 23182,
  //         tower_damage: 474,
  //         hero_healing: 0,
  //         last_hits: 163,
  //         lane: 3,
  //         lane_role: 3,
  //         is_roaming: false,
  //         cluster: 225,
  //         leaver_status: 0,
  //         party_size: 1
  //     },
  //     {
  //         match_id: 5870765933,
  //         player_slot: 129,
  //         radiant_win: true,
  //         duration: 1937,
  //         game_mode: 3,
  //         lobby_type: 7,
  //         hero_id: 47,
  //         start_time: 1615041245,
  //         version: 21,
  //         kills: 5,
  //         deaths: 8,
  //         assists: 6,
  //         skill: 1,
  //         xp_per_min: 322,
  //         gold_per_min: 270,
  //         hero_damage: 13002,
  //         tower_damage: 155,
  //         hero_healing: 0,
  //         last_hits: 75,
  //         lane: 1,
  //         lane_role: 3,
  //         is_roaming: false,
  //         cluster: 227,
  //         leaver_status: 0,
  //         party_size: 1
  //     },
  //     {
  //         match_id: 5870170823,
  //         player_slot: 128,
  //         radiant_win: true,
  //         duration: 1518,
  //         game_mode: 22,
  //         lobby_type: 7,
  //         hero_id: 62,
  //         start_time: 1615023184,
  //         version: 21,
  //         kills: 2,
  //         deaths: 10,
  //         assists: 6,
  //         skill: 1,
  //         xp_per_min: 321,
  //         gold_per_min: 232,
  //         hero_damage: 8084,
  //         tower_damage: 0,
  //         hero_healing: 0,
  //         last_hits: 7,
  //         lane: 1,
  //         lane_role: 3,
  //         is_roaming: false,
  //         cluster: 227,
  //         leaver_status: 0,
  //         party_size: 1
  //     },
  //     {
  //         match_id: 5869987149,
  //         player_slot: 132,
  //         radiant_win: false,
  //         duration: 2188,
  //         game_mode: 3,
  //         lobby_type: 7,
  //         hero_id: 128,
  //         start_time: 1615015714,
  //         version: null,
  //         kills: 4,
  //         deaths: 5,
  //         assists: 18,
  //         skill: null,
  //         xp_per_min: 552,
  //         gold_per_min: 336,
  //         hero_damage: 18796,
  //         tower_damage: 1141,
  //         hero_healing: 516,
  //         last_hits: 58,
  //         lane: null,
  //         lane_role: null,
  //         is_roaming: null,
  //         cluster: 227,
  //         leaver_status: 0,
  //         party_size: null
  //     },
  //     {
  //         match_id: 5869829061,
  //         player_slot: 1,
  //         radiant_win: false,
  //         duration: 2249,
  //         game_mode: 3,
  //         lobby_type: 7,
  //         hero_id: 19,
  //         start_time: 1615009220,
  //         version: 21,
  //         kills: 2,
  //         deaths: 8,
  //         assists: 5,
  //         skill: 1,
  //         xp_per_min: 300,
  //         gold_per_min: 203,
  //         hero_damage: 12807,
  //         tower_damage: 58,
  //         hero_healing: 0,
  //         last_hits: 47,
  //         lane: 3,
  //         lane_role: 3,
  //         is_roaming: false,
  //         cluster: 227,
  //         leaver_status: 0,
  //         party_size: 1
  //     },
  //     {
  //         match_id: 5868740811,
  //         player_slot: 0,
  //         radiant_win: true,
  //         duration: 1876,
  //         game_mode: 3,
  //         lobby_type: 7,
  //         hero_id: 18,
  //         start_time: 1614954560,
  //         version: 21,
  //         kills: 3,
  //         deaths: 5,
  //         assists: 14,
  //         skill: 2,
  //         xp_per_min: 385,
  //         gold_per_min: 282,
  //         hero_damage: 7369,
  //         tower_damage: 3179,
  //         hero_healing: 0,
  //         last_hits: 22,
  //         lane: 3,
  //         lane_role: 3,
  //         is_roaming: false,
  //         cluster: 227,
  //         leaver_status: 0,
  //         party_size: 1
  //     },
  //     {
  //         match_id: 5868644393,
  //         player_slot: 1,
  //         radiant_win: true,
  //         duration: 1839,
  //         game_mode: 3,
  //         lobby_type: 7,
  //         hero_id: 28,
  //         start_time: 1614951819,
  //         version: 21,
  //         kills: 1,
  //         deaths: 8,
  //         assists: 13,
  //         skill: 1,
  //         xp_per_min: 451,
  //         gold_per_min: 306,
  //         hero_damage: 6476,
  //         tower_damage: 869,
  //         hero_healing: 0,
  //         last_hits: 74,
  //         lane: 3,
  //         lane_role: 3,
  //         is_roaming: false,
  //         cluster: 227,
  //         leaver_status: 0,
  //         party_size: 1
  //     }
  // ];
  queryParams;

  heroes: any = heroes;
  finalData = {
    winRate: 0,
    length: 0,
  };
  extraList: string[] = [
    'kills',
    'deaths',
    'assists',
    'gold_per_min',
    'xp_per_min',
    'last_hits',
    'hero_damage',
    'hero_healing',
    'tower_damage',
    'duration'
  ];
  constructor(
    private activatedRoute: ActivatedRoute,
    private durationFormat: DurationFormatPipe,
    private greaterNum: GreaterNumPipe,
  ) { }

  ngOnInit(): void {
    this.activatedRoute.queryParamMap.subscribe(data => this.queryParams = data);
    this.checkQueryParams();
  }

  // parse/extra recent matches or matches
  parseAvgMaxData(data, enableTurbo): any {
    if (!enableTurbo) {
      data = data.filter(i => i.game_mode !== 23);
    }
    //   force only analizy the 20 item
    if (data.length > 20) {
      data = data.slice(0, 20);
    }

    this.finalData.winRate = this.winRate(data);
    this.finalData.length = data.length;

    this.extraList.forEach(item => {
      this.finalData[item] = this.filterMax(data, item);
    });
    // console.log(this.finalData);
    return this.finalData;
  }

  // calculate win rate
  winRate(data): any {
    // win: (element.player_slot > 120 && !element.radiant_win) || (element.player_slot <= 120 && element.radiant_win)
    const winLength = data.filter(i => {
      return (i.player_slot > 120 && !i.radiant_win) || (i.player_slot <= 120 && i.radiant_win);
    }).length;
    const totalMatchLength = data.length;
    // console.log(winLength, totalMatchLength);
    return winLength / totalMatchLength;
  }

  // filter the specific field/key maximun and average data
  filterMax(data, field): any {
    const maximums = {
      match_id: null,
      hero_id: null,
    };
    const filterData = {
      average: null,
      maximums,
    };
    const max = (Math.max.apply(Math, data.map(i => i[field])));
    //   we only need the match_id, hero_id for icon, and field data
    maximums.match_id = data.find(i => i[field] === max).match_id;
    maximums.hero_id = data.find(i => i[field] === max).hero_id;
    if (field !== 'duration') {
      filterData.average = this.greaterNum.transform(
        data.map(i => i[field]).reduce((cur, total) => cur + total / data.length, 0).toFixed(), 1000, 'k'
      );
      maximums[field] = this.greaterNum.transform(data.find(i => i[field] === max)[field].toFixed(), 1000, 'k');
    } else {
      filterData.average = this.durationFormat.transform(
        data.map(i => i[field]).reduce((cur, total) => cur + total / data.length, 0).toFixed()
      );
      maximums[field] = this.durationFormat.transform(data.find(i => i[field] === max)[field]);
    }
    filterData.maximums = maximums;
    return filterData;
  }

  checkQueryParams(): string[] {
    if (Object.keys(this.queryParams.params).length > 0) {
      return this.extraList = [
        'kills',
        'deaths',
        'assists',
        'duration'
      ];
    } else {
      return this.extraList = [
        'kills',
        'deaths',
        'assists',
        'gold_per_min',
        'xp_per_min',
        'last_hits',
        'hero_damage',
        'hero_healing',
        'tower_damage',
        'duration'
      ];
    }
  }

}
