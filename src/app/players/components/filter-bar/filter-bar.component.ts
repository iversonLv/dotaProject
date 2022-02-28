import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

// model
import { IHero, IHeroData } from '../../../heros/model/hero';
import { IQuery } from '../../model/query';
import { IOption } from '../../../shared/model/option';
import { IPeerData } from '../../model/peer';
import { IheroLocal } from 'src/app/heros/model/heroLocal';

// ngrx
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as herosActions from 'src/app/heros/store/heros.actions';
import * as playersActions from '../../store/players.actions';

// service
import { PlayersService } from '../../services/players.service';

// dotaconstant
import patch from 'dotaconstants/build/patch.json';
import heroes from 'dotaconstants/build/heroes.json';
import gameMode from 'dotaconstants/build/game_mode.json';
import region from 'dotaconstants/build/region.json';
import lobbyType from 'dotaconstants/build/lobby_type.json';

// local assets json which is not from dotaconstant
import laneRole from '../../../../assets/data/lane_role.json';
import queryParamsData from '../../../../assets/data/queryParams.json';


@Component({
  selector: 'app-filter-bar',
  templateUrl: './filter-bar.component.html',
  styleUrls: ['./filter-bar.component.scss']
})
export class FilterBarComponent implements OnInit {
  heroGeneral$: Observable<IHeroData>;
  playersPeersFilter$: Observable<IPeerData>;
  playersPeersFilterDataDe: any;
  // for filter bar, load all peers without queryParams

  hideFilter = true;

  heroes: any = heroes;
  laneRole: any = laneRole;
  patch: any = patch;
  gameMode: any = gameMode;
  region: any; // need refactor the data structure
  lobbyType: any = lobbyType;

  sidesData: any = queryParamsData.sidesData;
  datesData: any = queryParamsData.datesData;
  resultsData: any = queryParamsData.resultsData;
  partySizeData: any = queryParamsData.partySizeData;
  havingData: any = queryParamsData.havingData;
  insignificantData: any = queryParamsData.insignificantData;

  queryParams;
  queryParamsHasValue = false;

  currentSelectedHero = '';
  currentSelectedSide = '';
  currentSelectedResult = '';
  currentSelectedLand = '';
  currentSelectedDate = '';
  currentSelectedPartySize = '';
  currentSelectedAlliedHero = '';
  currentSelectedOpposingHero = '';
  currentSelectedHaving = '';
  currentSelectedIncludedAccountId = '';
  currentSelectedExcludedAccountId = '';
  currentSelectedLobbyType = '';
  currentSelectedRegion = '';
  currentSelectedGameMode = '';
  currentSelectedPatch = '';
  currentSelectedInsignification = '';

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private store: Store<{ heroGeneral: IHeroData, playersPeersFilter: IPeerData}>
  ) {
    this.heroGeneral$ = store.select('heroGeneral');
    this.playersPeersFilter$ = store.select('playersPeersFilter');
  }

  ngOnInit(): void {

    this.activatedRoute.queryParamMap.subscribe(data => this.queryParams = data);


    const accountId = +this.activatedRoute.snapshot.paramMap.get('id');
    // get heroes list
    this.store.dispatch(new herosActions.LoadHerosGeneral());
    // get player peers
    this.store.dispatch(new playersActions.LoadPlayersPeersFilter(accountId));
    this.store.select('playersPeersFilter').subscribe(data => {
      const newData = {};
      for (const key in data.peers) {
        if (data.peers.hasOwnProperty(key)) {
          newData[data.peers[key].account_id] = {...data.peers[key], id: data.peers[key].account_id};
        }
      }
      this.playersPeersFilterDataDe = newData;
      return this.playersPeersFilterDataDe;
    });

    this.checkQueryParams();
    this.getRegionLocal();
  }

  checkQueryParams(): boolean {
    if (Object.keys(this.queryParams.params).length > 0) {
      return this.queryParamsHasValue = true;
    } else {
      return this.queryParamsHasValue = false;
    }
  }

  async clearQueryParams(): Promise<void> {
    const accountId = +this.activatedRoute.snapshot.paramMap.get('id');
    const field = this.router.url.split('/')[4] === undefined ? 'kills' : this.router.url.split('/')[4].split('?')[0];
    await this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: {},
    });
    await this.activatedRoute.queryParamMap.subscribe(data => this.queryParams = data);
    this.checkQueryParams();

    this.store.dispatch(new playersActions.LoadPlayersWinLoseCount(accountId, this.queryParams));
    this.store.dispatch(new playersActions.LoadPlayersPeersFilter(accountId));

    // if current url is player/{accountId}/heroes
    if (this.router.url.split('/')[3].split('?')[0] === 'overview') {
      this.store.dispatch(new playersActions.LoadPlayersCounts(accountId, this.queryParams));
      this.store.dispatch(new playersActions.LoadPlayersPeers(accountId, this.queryParams));
      this.store.dispatch(new playersActions.LoadPlayersHeroesPlayed(accountId, this.queryParams));

      // clear queryParams should load recent matches
      this.store.dispatch(new playersActions.LoadPlayersRecentMatches(accountId));

    } else if (this.router.url.split('/')[3].split('?')[0] === 'matches') {
      this.store.dispatch(new playersActions.LoadPlayersMatches(accountId, this.queryParams));

    } else if (this.router.url.split('/')[3].split('?')[0] === 'heroes') {
      this.store.dispatch(new playersActions.LoadPlayersHeroesPlayed(accountId, this.queryParams));

    } else if (this.router.url.split('/')[3].split('?')[0] === 'peers') {
      this.store.dispatch(new playersActions.LoadPlayersPeers(accountId, this.queryParams));

    } else if (this.router.url.split('/')[3].split('?')[0] === 'pros') {
      this.store.dispatch(new playersActions.LoadPlayersPros(accountId, this.queryParams));

    } else if (this.router.url.split('/')[3].split('?')[0] === 'records') {
      this.store.dispatch(new playersActions.LoadPlayersRecords(accountId, field, this.queryParams));

    } else if (this.router.url.split('/')[3].split('?')[0] === 'totals') {
      this.store.dispatch(new playersActions.LoadPlayersTotals(accountId, this.queryParams));

    } else if (this.router.url.split('/')[3].split('?')[0] === 'counts') {
      this.store.dispatch(new playersActions.LoadPlayersCounts(accountId, this.queryParams));

    } else if (this.router.url.split('/')[3].split('?')[0] === 'histograms') {
      this.store.dispatch(new playersActions.LoadPlayersHistograms(accountId, field, this.queryParams));

    } else if (this.router.url.split('/')[3].split('?')[0] === 'trends') {
      this.store.dispatch(new playersActions.LoadPlayersTrends(accountId, field, this.queryParams));

    } else if (this.router.url.split('/')[3].split('?')[0] === 'wardmap') {
      this.store.dispatch(new playersActions.LoadPlayersWardMaps(accountId, this.queryParams));

    } else if (this.router.url.split('/')[3].split('?')[0] === 'wordcloud') {
      this.store.dispatch(new playersActions.LoadPlayersWordClouds(accountId, this.queryParams));

    } else if (this.router.url.split('/')[3].split('?')[0] === 'mmr') {
      // rating does not need filter queryparams, just for placeholder
      this.store.dispatch(new playersActions.LoadPlayersRatings(accountId));

    } else if (this.router.url.split('/')[3].split('?')[0] === 'rankings') {
      // rankings does not need filter queryparams, just for placeholder
      this.store.dispatch(new playersActions.LoadPlayersRankings(accountId));

    } else if (this.router.url.split('/')[3].split('?')[0] === 'actvity') {
      this.store.dispatch(new playersActions.LoadPlayersMatches(accountId, this.queryParams));
    }

    // this.store.dispatch(new playersActions.LoadPlayersWinLoseCount(accountId, this.queryParams));
    // this.store.dispatch(new playersActions.LoadPlayersPeersFilter(accountId));
    // this.store.dispatch(new playersActions.LoadPlayersCounts(accountId, this.queryParams));
    // this.store.dispatch(new playersActions.LoadPlayersPeers(accountId, this.queryParams));
    // this.store.dispatch(new playersActions.LoadPlayersHeroesPlayed(accountId, this.queryParams));
    // this.store.dispatch(new playersActions.LoadPlayersTotals(accountId, this.queryParams));
    // clear queryParams should load recent matches
    // this.store.dispatch(new playersActions.LoadPlayersRecentMatches(accountId));

    // reset dropdown default option to none
    this.currentSelectedHero = 'None';
    this.currentSelectedSide = 'None';
    this.currentSelectedResult = 'None';
    this.currentSelectedLand = 'None';
    this.currentSelectedDate = 'None';
    this.currentSelectedPartySize = 'None';
    this.currentSelectedAlliedHero = 'None';
    this.currentSelectedOpposingHero = 'None';
    this.currentSelectedIncludedAccountId = 'None';
    this.currentSelectedExcludedAccountId = 'None';
    this.currentSelectedLobbyType = 'None';
    this.currentSelectedRegion = 'None';
    this.currentSelectedGameMode = 'None';
    this.currentSelectedPatch = 'None';
    this.currentSelectedInsignification = 'None';
  }

  // set Hero id to update players win lose data
  async setQueryParams([value, key]): Promise<void> {
    const params = {};
    params[key] = value;
    // get current players id
    const accountId = +this.activatedRoute.snapshot.paramMap.get('id');
    const field = this.router.url.split('/')[4] === undefined ? 'kills' : this.router.url.split('/')[4].split('?')[0];
    // TODO: navigate to current page with heroId params
    // now static for overview page
    await this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: params,
      queryParamsHandling: 'merge',
    });
    // get current url queryParams
    await this.activatedRoute.queryParamMap.subscribe(data => this.queryParams = data);
    this.checkQueryParams();

    // this.store.dispatch(new playersActions.LoadPlayersWinLoseCount(accountId, this.queryParams));
    // this.store.dispatch(new playersActions.LoadPlayersPeersFilter(accountId));

    // this.store.dispatch(new playersActions.LoadPlayersCounts(accountId, this.queryParams));
    // this.store.dispatch(new playersActions.LoadPlayersPeers(accountId, this.queryParams));
    // this.store.dispatch(new playersActions.LoadPlayersHeroesPlayed(accountId, this.queryParams));
    // this.store.dispatch(new playersActions.LoadPlayersTotals(accountId, this.queryParams));

    // // if there is queryParams, should load player matches
    // this.store.dispatch(new playersActions.LoadPlayersMatches(accountId, this.queryParams));

    this.store.dispatch(new playersActions.LoadPlayersWinLoseCount(accountId, this.queryParams));
    this.store.dispatch(new playersActions.LoadPlayersPeersFilter(accountId));

    // if current url is player/{accountId}/heroes
    if (this.router.url.split('/')[3].split('?')[0] === 'overview') {
      this.store.dispatch(new playersActions.LoadPlayersCounts(accountId, this.queryParams));
      this.store.dispatch(new playersActions.LoadPlayersPeers(accountId, this.queryParams));
      this.store.dispatch(new playersActions.LoadPlayersHeroesPlayed(accountId, this.queryParams));

      // if there is queryParams, should load player matches
      this.store.dispatch(new playersActions.LoadPlayersMatches(accountId, this.queryParams));

    } else if (this.router.url.split('/')[3].split('?')[0] === 'matches') {
      this.store.dispatch(new playersActions.LoadPlayersMatches(accountId, this.queryParams));

    } else if (this.router.url.split('/')[3].split('?')[0] === 'heroes') {
      this.store.dispatch(new playersActions.LoadPlayersHeroesPlayed(accountId, this.queryParams));

    }  else if (this.router.url.split('/')[3].split('?')[0] === 'peers') {
      this.store.dispatch(new playersActions.LoadPlayersPeers(accountId, this.queryParams));

    } else if (this.router.url.split('/')[3].split('?')[0] === 'pros') {
      this.store.dispatch(new playersActions.LoadPlayersPros(accountId, this.queryParams));

    } else if (this.router.url.split('/')[3].split('?')[0] === 'records') {
      this.store.dispatch(new playersActions.LoadPlayersRecords(accountId, field, this.queryParams));

    } else if (this.router.url.split('/')[3].split('?')[0] === 'totals') {
      this.store.dispatch(new playersActions.LoadPlayersTotals(accountId, this.queryParams));

    } else if (this.router.url.split('/')[3].split('?')[0] === 'counts') {
      this.store.dispatch(new playersActions.LoadPlayersCounts(accountId, this.queryParams));

    } else if (this.router.url.split('/')[3].split('?')[0] === 'histograms') {
      this.store.dispatch(new playersActions.LoadPlayersHistograms(accountId, field, this.queryParams));

    } else if (this.router.url.split('/')[3].split('?')[0] === 'trends') {
      this.store.dispatch(new playersActions.LoadPlayersTrends(accountId, field, this.queryParams));

    } else if (this.router.url.split('/')[3].split('?')[0] === 'wardmap') {
      this.store.dispatch(new playersActions.LoadPlayersWardMaps(accountId, this.queryParams));

    } else if (this.router.url.split('/')[3].split('?')[0] === 'wordcloud') {
      this.store.dispatch(new playersActions.LoadPlayersWordClouds(accountId, this.queryParams));

    } else if (this.router.url.split('/')[3].split('?')[0] === 'mmr') {
      // rating does not need filter queryparams, just for placeholder
      this.store.dispatch(new playersActions.LoadPlayersRatings(accountId));

    } else if (this.router.url.split('/')[3].split('?')[0] === 'rankings') {
      // rankings does not need filter queryparams, just for placeholder
      this.store.dispatch(new playersActions.LoadPlayersRankings(accountId));

    } else if (this.router.url.split('/')[3].split('?')[0] === 'actvity') {
      this.store.dispatch(new playersActions.LoadPlayersMatches(accountId, this.queryParams));
    }
    // call disapatch
    // use material select does not need validate
    // if (value !== '') {
    //   this.store.dispatch(new playersActions.LoadPlayersWinLoseCount(accountId, this.queryParams));
    // } else {
    //   this.store.dispatch(new playersActions.LoadPlayersWinLoseCount(accountId));
    // }

    // TODO: if heroId === '' should remove the hero_id queryParams
  }

  getRegionLocal(): any {
      const newData = {};
      for (const key in region) {
        if (region.hasOwnProperty(key)) {
          newData[key] = {
            name: region[key],
            id: key
          };
        }
      }
      return this.region = newData;
  }

  setDropdownDefaultValue([defaultValue, paramsKey, data]): any {
    // console.log(defaultValue, paramsKey)
    if (
      this.queryParams.params[paramsKey] && // check whether current queryParams.params has such key
      data && // check whether heroes
      data[this.queryParams.params[paramsKey]] // Check whether heroes[xxx] has value
    ) {
      if (data[this.queryParams.params[paramsKey]].localized_name) {
        return data[this.queryParams.params[paramsKey]].localized_name; // for hero
      } else if (data[this.queryParams.params[paramsKey]].personaname) {
        return data[this.queryParams.params[paramsKey]].personaname; // for includ/ exclude peers
      } else if (data[this.queryParams.params[paramsKey]].name) {
        return data[this.queryParams.params[paramsKey]].name;
      } else {
        return data[this.queryParams.params[paramsKey]].value;  // general
      }
    } else {
      return defaultValue;
    }
  }


}

// TODO: Now filter bar clearQueryParams() and setQueryParams() are global, for performance, should be base on the router
// Example, overview might dispatch some method however /players/{accountId}/heroes only wl and heroes
