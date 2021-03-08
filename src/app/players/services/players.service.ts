import { Injectable } from '@angular/core';
import { GeneralService } from '../../services/general.service';

import { Observable } from 'rxjs';

// modal
import { IWinlose } from '../model/winlose';
import { IQuery } from '../model/query';
import { IPlayer } from '../model/general';
import { IPeer } from '../model/peer';
import { IHeroesPlayed } from '../model/hero-played';
import { IMatch } from 'src/app/matches/model/match';
import { IRecentMatch } from 'src/app/matches/model/recent-match';
import { ICount } from '../model/count';
import { ITotal } from '../model/total';
import { IRanking } from '../model/ranking';
import { IPro } from '../model/pro';
import { IHistogram } from '../model/histogram';
import { IRecord } from '../model/record';
import { ITrend } from '../model/trend';
import { IRating } from '../model/rating';

@Injectable({
  providedIn: 'root'
})
export class PlayersService {


  constructor(
    private generalService: GeneralService,
  ) { }

  httpOptions = () => {
    return {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      // tslint:disable-next-line:object-literal-key-quotes
      'Authorization': `Bearer 9738300E5F82FF7FC0B7F7DC6AFC605C`
    };
  }

  // GET Player data
  // Steam32 account ID
  getPlayerData(accountId: number): Observable<IPlayer> {
    return this.generalService.get(`/players/${accountId}`);
  }

  // GET Win/Loss count
  getWinLoseCount(accountId: number, queryParams: IQuery): Observable<IWinlose> {
    return this.generalService.get(`/players/${accountId}/wl`, queryParams);
  }

  // GET Player recent matches
  getPlayerRecentMatches(accountId: number): Observable<IRecentMatch[]> {
    return this.generalService.get(`/players/${accountId}/recentMatches`);
  }

  // GET Player matches
  getPlayerMatches(accountId: number, queryParams?: IQuery): Observable<IMatch[]> {
    return this.generalService.get(`/players/${accountId}/matches?significant=0&project=duration&project=game_mode&project=lobby_type&project=start_time&project=hero_id&project=start_time&project=version&project=kills&project=deaths&project=assists&project=skill&project=leaver_status&project=party_size&project=item_0&project=item_1&project=item_2&project=item_3&project=item_4&project=item_5&project=backpack_0`, queryParams);
  }

  // GET player heroes played
  getPlayerHeroesPlayed(accountId: number, queryParams?: IQuery): Observable<IHeroesPlayed[]> {
    return this.generalService.get(`/players/${accountId}/heroes`, queryParams);
  }

  // GET player peers
  getPlayerPeers(accountId: number, queryParams?: IQuery): Observable<IPeer[]> {
    return this.generalService.get(`/players/${accountId}/peers`, queryParams);
  }

  // GET player pros
  getPlayersPros(accountId: number, queryParams?: IQuery): Observable<IPro[]> {
    return this.generalService.get(`/players/${accountId}/pros`, queryParams);
  }

  // GET Player records
  getPlayerRecords(accountId: number, field: string, queryParams?: IQuery): Observable<IRecord[]> {
    return this.generalService.get(`/players/${accountId}/matches?sort=${field}&limit=20`, queryParams);
  }

  // GET player totals
  getPlayerTotals(accountId: number, queryParams?: IQuery): Observable<ITotal[]> {
    return this.generalService.get(`/players/${accountId}/totals`, queryParams);
  }

  // GET Player counts
  getPlayerCounts(accountId: number, queryParams?: IQuery): Observable<ICount> {
    return this.generalService.get(`/players/${accountId}/counts`, queryParams);
  }

  // GET Player histograms
  // /players/{account_id}/histograms/{field}
  getPlayerHistograms(accountId: number, field: string, queryParams?: IQuery): Observable<IHistogram[]> {
    return this.generalService.get(`/players/${accountId}/histograms/${field}`, queryParams);
  }

  // GET Player trends
  // matches?limit=1000&project=kills&project=hero_id&project=start_time
  getPlayerTrends(accountId: number, field: string, queryParams?: IQuery): Observable<ITrend[]> {
    return this.generalService.get(`/players/${accountId}/matches?limit=1000&project=${field}&project=hero_id&project=start_time`,
      queryParams
    );
  }

  // GET player wardmap

  // GET player wordcloud

  // GET player ratings
  getPlayerRatings(accountId: number): Observable<IRating[]> {
    return this.generalService.get(`/players/${accountId}/ratings`);
  }


  // GET player ranking
  getPlayerRankings(accountId: number): Observable<IRanking[]> {
    return this.generalService.get(`/players/${accountId}/rankings`);
  }


  // POST Refresh player match history
  refreshAccount(accountId: number): any {
    return this.generalService.post(`/players/${accountId}/refresh`, {}, this.httpOptions());
  }


  // GET filter query params from local json
  getFilterQueryParams(): Observable<any> {
    return this.generalService.getLocalData(`/queryParams.json`);
  }

  // GET pro players
  getProPlayers(): Observable<IPro[]> {
    return this.generalService.get(`/proPlayers`);
  }


  // GET fields
  getFields(): Observable<any> {
    return this.generalService.getLocalData(`/fields.json`);
  }

}
