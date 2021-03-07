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
import { HerosService } from 'src/app/heros/services/heros.service';
import { LaneRoleService } from 'src/app/services/lane-role.service';
import { PatchService } from 'src/app/services/patch.service';
import { GameModeService } from 'src/app/services/game-mode.service';
import { LobbyTypeService } from 'src/app/services/lobby-type.service';
import { RegionService } from 'src/app/services/region.service';

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

  heroesLocal: IheroLocal;
  laneRoleLocal: any;
  patchLocal: any;
  gameModeLocal: any;
  regionLocal: any;
  lobbyTypeLocal: any;

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


  filterQueryParams;
  // Date data
  datesData: IOption[] = [];
  // Side data
  sidesData: IOption[] = [];
  // Win lost data
  resultsData: IOption[] = [];
  // Land role data
  landsData: IOption[] = [];
  // Party size
  partySizeData: IOption[] = [];
  // Having data
  havingData: IOption[] = [];
  // Lobby type data
  lobbyTypeData: IOption[] = [];
  // Region data
  regionData: IOption[] = [];
  // Game mode data
  gameModeData: IOption[] = [];
  // patches data
  patchesData: IOption[] = [];
  // insignificant data
  insignificantData: IOption[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private playersServices: PlayersService,
    private herosService: HerosService,
    private laneRoleService: LaneRoleService,
    private lobbyTypeService: LobbyTypeService,
    private regionService: RegionService,
    private patchService: PatchService,
    private gameModeService: GameModeService,
    private store: Store<{ heroGeneral: IHeroData, playersPeersFilter: IPeerData}>
  ) {
    this.heroGeneral$ = store.select('heroGeneral');
    this.playersPeersFilter$ = store.select('playersPeersFilter');
  }

  ngOnInit(): void {

    this.activatedRoute.queryParamMap.subscribe(data => this.queryParams = data);


    const accountId = +this.activatedRoute.snapshot.paramMap.get('id');
    // get local static queryParams json data
    this.getFilterQueryParams();
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

    this.getHeroesLocal();
    this.getLaneRoleLocal();
    this.getPatchLocal();
    this.getGameModeLocal();
    this.getLobbyTypeLocal();
    this.getRegionLocal();

  }

  checkQueryParams(): boolean {
    if (Object.keys(this.queryParams.params).length > 0) {
      return this.queryParamsHasValue = true;
    } else {
      return this.queryParamsHasValue = false;
    }
  }
  // GET local json static data for filter queryparams
  getFilterQueryParams(): any {
    this.playersServices.getFilterQueryParams().subscribe(data => {
      this.sidesData = data.sidesData;
      this.datesData = data.datesData;
      this.resultsData = data.resultsData;
      // this.landsData = data.landsData;
      this.partySizeData = data.partySizeData;
      this.havingData = data.havingData;
      // this.lobbyTypeData = data.lobbyTypeData;
      // this.regionData = data.regionData;
      // this.gameModeData = data.gameModeData;
      // this.patchesData = data.patchesData;
      this.insignificantData = data.insignificantData;
    }, err => {
      console.log(err);
    });
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
      console.log('dispatch wardmap');
    } else if (this.router.url.split('/')[3].split('?')[0] === 'wordcloud') {
      console.log('dispatch wordcloud');
    } else if (this.router.url.split('/')[3].split('?')[0] === 'mmr') {
      console.log('dispatch mmr');
    } else if (this.router.url.split('/')[3].split('?')[0] === 'rankings') {
      // rankings does not need filter queryparams, just for placeholder
      console.log('dispatch rankings');
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
      console.log('dispatch wardmap');
    } else if (this.router.url.split('/')[3].split('?')[0] === 'wordcloud') {
      console.log('dispatch wordcloud');
    } else if (this.router.url.split('/')[3].split('?')[0] === 'mmr') {
      console.log('dispatch mmr');
    } else if (this.router.url.split('/')[3].split('?')[0] === 'rankings') {
      // rankings does not need filter queryparams, just for placeholder
      console.log('dispatch rankings');
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

  // grab heros to map with dropdown hero
  getHeroesLocal(): any {
    this.herosService.getHeroesLocal().subscribe(data => this.heroesLocal = data);
  }

  getLaneRoleLocal(): any {
    this.laneRoleService.getLaneRoleLocal().subscribe(data => this.laneRoleLocal = data);
  }

  getPatchLocal(): any {
    this.patchService.getPatchLocal().subscribe(data => this.patchLocal = data);
  }

  getGameModeLocal(): any {
    this.gameModeService.getGameModeLocal().subscribe(data => this.gameModeLocal = data);
  }

  getRegionLocal(): any {
    this.regionService.getRegionLocal().subscribe(data => {
      const newData = {};
      for (const key in data) {
        if (data.hasOwnProperty(key)) {
          newData[key] = {
            name: data[key],
            id: key
          };
        }
      }
      return this.regionLocal = newData;
    });
  }

  getLobbyTypeLocal(): any {
    this.lobbyTypeService.getLobbyTypeLocal().subscribe(data => this.lobbyTypeLocal = data);
  }

  setDropdownDefaultValue([defaultValue, paramsKey, data]): any {
    // console.log(defaultValue, paramsKey)
    if (
      this.queryParams.params[paramsKey] && // check whether current queryParams.params has such key
      data && // check whether heroesLocal
      data[this.queryParams.params[paramsKey]] // Check whether heroesLocal[xxx] has value
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
