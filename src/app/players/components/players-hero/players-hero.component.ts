import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';

// services
import { PlayersService } from '../../services/players.service';

// ngrx
import { Store } from '@ngrx/store';
import * as playersActions from '../../store/players.actions';

// model
import { IWinloseData } from '../../model/winlose';
import { IPlayerData } from '../../model/general';

@Component({
  selector: 'app-players-hero',
  templateUrl: './players-hero.component.html',
  styleUrls: ['./players-hero.component.scss'],
})
export class PlayersHeroComponent implements OnInit {
  loginedAccountId = 128741677;
  componentActive = true;
  queryParams;
  playersGeneral$: Observable<IPlayerData>;
  playersWinLoseCount$: Observable<IWinloseData>;
  playersMyRecordWithWinLoseCount$: Observable<IWinloseData>;
  playersGeneral: IPlayerData;

  constructor(
    private router: Router,
    private playersService: PlayersService,
    private activatedRoute: ActivatedRoute,
    private store: Store<{ playersWinLoseCount: IWinloseData, playersGeneral: IPlayerData, playersMyRecordWithWinLoseCount: IWinloseData }>
  ) {
    this.playersWinLoseCount$ = store.select('playersWinLoseCount');
    this.playersGeneral$ = store.select('playersGeneral');
    this.playersMyRecordWithWinLoseCount$ = store.select('playersMyRecordWithWinLoseCount');
  }

  ngOnInit(): void {
    const accountId = +this.activatedRoute.snapshot.paramMap.get('id');
    this.activatedRoute.queryParamMap.subscribe(data => this.queryParams = data);
    this.getPlayerData(accountId);
    // this.getWinLossCount(accountId, {params: {hero_id: '102'}});
    this.getWinLossCount(accountId, this.queryParams);
    this.getWinLossCountWithLoginedUser(accountId);
  }

  // GET player data
  // getPlayerData(accountId): any {
  //   // const currentRoute = this.router.url.split('/')[3].split('?')[0];
  //   const currentRoute = 'abc';
  //   const initTitle = this.titleService.getTitle();
  //   this.playersService.getPlayerData(accountId).subscribe(data => {
  //     console.log(data);
  //     this.players = data;
  //     if (data.profile.name) {
  //       this.titleService.setTitle(`${data.profile.name} - ${currentRoute} - ${initTitle}`);
  //     } else {
  //       this.titleService.setTitle(`${data.profile.personaname} - ${currentRoute} - ${initTitle}`);
  //     }
  //   }, error => {
  //     console.log(error);
  //   });
  // }

  // GET player data
  getPlayerData(accountId): any {
    this.store.dispatch(new playersActions.LoadPlayersGeneral(accountId));
  }

  // GET player win lost
  // getWinLossCount(accountId, queryParams): any {
  //   this.playersService.getWinLoseCount(accountId, queryParams).subscribe(data => {
  //     console.log(data);
  //     // this.playersWinLoseCount = data;
  //   }, error => {
  //     console.log(error);
  //   });
  // }

  // ngrx
  getWinLossCount(accountId, queryParams): any {
    this.store.dispatch(new playersActions.LoadPlayersWinLoseCount(accountId, queryParams));
  }

  getWinLossCountWithLoginedUser(accountId): any {
    // tslint:disable-next-line:max-line-length
    this.store.dispatch(new playersActions.LoadPlayersMyRecordWithWinLoseCount(this.loginedAccountId, {params: { included_account_id: accountId } }));
  }

  // other player will have 'MY RECODE WITH' which played account_id with logined user
  async goPage(accountId): Promise<any> {
    await this.router.navigate([`../${this.loginedAccountId}/matches`], {
      relativeTo: this.activatedRoute,
      queryParams: {included_account_id: accountId},
    });
    await this.activatedRoute.queryParamMap.subscribe(data => this.queryParams = data);
    this.store.dispatch(new playersActions.LoadPlayersGeneral(this.loginedAccountId));
    this.store.dispatch(new playersActions.LoadPlayersWinLoseCount(this.loginedAccountId, this.queryParams));
  }

  // POST refresh account
  refreshAccount(): any {
    const accountId = parseInt(this.activatedRoute.snapshot.paramMap.get('id'), 2);
    this.playersService.refreshAccount(accountId).subscribe(data => {
    }, error => {
      console.log(error);
    });
  }
}
