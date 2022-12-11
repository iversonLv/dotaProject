import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

// ngrx
import { Store } from '@ngrx/store';
import * as searchActions from '../../../search/store/search.actions';
import * as playersActions from 'src/app/players/store/players.actions';
import * as matchesActions from 'src/app/matches/store/matches.actions';
import { GeneralService } from 'src/app/services/general.service';

import { environment } from '../../../../environments/environment';

// model
import { IPeerData } from 'src/app/players/model/peer';
import { IProData } from 'src/app/players/model/pro';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.scss']
})
export class MainNavComponent implements OnInit {
  currentVersion = environment.currentVersion;
  searchTerm = '';
  searchQuery;
  isLogined = false;
  loginedAccountId;
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private store: Store<{playersPros: IProData, playersPeers: IPeerData}>,
    private generalService: GeneralService
  ) {
    this.generalService.isLogined.subscribe(isLogined => {
      this.isLogined = isLogined;
      this.loginedAccountId = localStorage.getItem('loginedAccountId');
      !!this.loginedAccountId ? this.isLogined = true : this.isLogined = false;
    });
  }

  ngOnInit(): void {
    // this.getUser();
    this.activatedRoute.queryParams.subscribe(data => {
      this.searchTerm = data.q;
    }, err => {
      console.log(err);
    });
  }

  login(): any {
    let host = window.location.protocol + '//' + window.location.host;
    if (host.includes('github.io')) {
      host += '/dotaProject';
    }
    const url = `https://steamcommunity.com/openid/login?openid.ns=http://specs.openid.net/auth/2.0&openid.mode=checkid_setup&openid.return_to=${host}/login&openid.realm=${host}&openid.ns.sreg=https://openid.net/extensions/sreg/1.1&openid.claimed_id=http://specs.openid.net/auth/2.0/identifier_select&openid.identity=http://specs.openid.net/auth/2.0/identifier_select`;
    window.location.href = url;
  }


  doSearch(e): any {
    // when enter key down
    if (e.keyCode === 13 && e.target.value !== '') {
      this.router.navigate(['/search'], {
        queryParams: {
          q: e.target.value
        }
      });
      this.store.dispatch(new playersActions.LoadProPlayers());
      this.store.dispatch(new searchActions.LoadSearch({params: {q: e.target.value}}));

      // if e.target.value is only number will dispatch matches
      // first remove all prefix '000' then verfiy whether only input number
      if (/^[0-9]*$/.test(e.target.value.replace(/\b(0+)/gi, ''))) {
        this.store.dispatch(new matchesActions.LoadMatch(e.target.value.replace(/\b(0+)/gi, '')));
      }
    }
  }

  logout(): any {
    this.generalService.getLogout();
    this.generalService.isLogined.subscribe(isLogined => this.isLogined = isLogined);
  }

  async goAccountOverviewPage(): Promise<any> {
    // const accountId = 128741677;
    await this.router.navigate([`/players/${this.loginedAccountId}/overview`]);
    // TODO: after router navigate, we need dispatch all data again to refetch new data
    this.store.dispatch(new playersActions.LoadPlayersGeneral(this.loginedAccountId));
    this.store.dispatch(new playersActions.LoadPlayersPeers(this.loginedAccountId));
    this.store.dispatch(new playersActions.LoadPlayersWinLoseCount(this.loginedAccountId));
    this.store.dispatch(new playersActions.LoadPlayersHeroesPlayed(this.loginedAccountId));
    this.store.dispatch(new playersActions.LoadPlayersRecentMatches(this.loginedAccountId));
    this.store.dispatch(new playersActions.LoadPlayersCounts(this.loginedAccountId));
    // tslint:disable-next-line:max-line-length
    this.store.dispatch(new playersActions.LoadPlayersMyRecordWithWinLoseCount(this.loginedAccountId, {params: { included_account_id: this.loginedAccountId } }));
  }

}
