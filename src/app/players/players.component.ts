import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';

// ngrx
import { Store } from '@ngrx/store';
import * as playersActions from './store/players.actions';

import { Title } from '@angular/platform-browser';
import { IPlayerData } from './model/general';

@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.scss']
})
export class PlayersComponent implements OnInit {

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private titleService: Title,
    private store: Store<{ playersGeneral: IPlayerData }>,
  ) { }

  ngOnInit(): void {
    // let accountId = +this.activatedRoute.snapshot.paramMap.get('id');
    // let currentRoute = this.router.url.split('/')[3].split('?')[0];
    // currentRoute = currentRoute.charAt(0).toUpperCase() + currentRoute.slice(1);
    // const initTitle = this.titleService.getTitle();
    // this.getPlayerData(accountId, currentRoute, initTitle);
    // this.router.events
    // .subscribe((event) => {
    //   if (event instanceof NavigationEnd) {
    //     // example url is /players/:id/overview
    //     currentRoute = event.url.split('/')[3].split('?')[0]; // Grab last route 'overview'
    // tslint:disable-next-line:max-line-length
    //     currentRoute = currentRoute.charAt(0).toUpperCase() + currentRoute.slice(1); // last route 'overview' to toUpperCase() first letter
    //     // if accountId change will dispatch the player data or won't dispatch
    //     if (accountId !== +event.url.split('/')[2].split('?')[0] && currentRoute !== 'overview') {
    //       accountId = +event.url.split('/')[2].split('?')[0]; // Grab middle id
    //       this.getPlayerData(accountId, currentRoute, initTitle); // Rerun the getPlayerData data
    //     }
    //   }
    // });
  }


  // getPlayerData(accountId, currentRoute, initTitle): any {
  //   this.store.dispatch(new playersActions.LoadPlayersGeneral(accountId));
  //   this.store.select('playersGeneral').subscribe(data => {
  //     if (data.player) {
  //       if (data?.player?.profile?.name) {
  //         this.titleService.setTitle(`${data.player.profile.name} - ${currentRoute} - ${initTitle}`);
  //       } else {
  //         this.titleService.setTitle(`${data.player.profile.personaname} - ${currentRoute} - ${initTitle}`);
  //       }
  //     }
  //   }, error => {
  //     console.log(error);
  //   });
  // }
}
