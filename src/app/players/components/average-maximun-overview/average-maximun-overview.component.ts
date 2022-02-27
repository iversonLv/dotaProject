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
