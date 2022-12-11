import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

// model
import { IPlayerData } from './players/model/general';

// ngrx
import { Store } from '@ngrx/store';
import * as playersActions from './players/store/players.actions';
import { NameDestructPipe } from './shared/utils/name-destruct.pipe';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [NameDestructPipe]
})
export class AppComponent implements OnInit {

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private titleService: Title,
    private store: Store<{ playersGeneral: IPlayerData }>,
    private nameDestruct: NameDestructPipe,
  ) {}

ngOnInit(): void {
  // let id = +this.activatedRoute.snapshot.paramMap.get('id'); // heroId, playerAccountId
  let currentRoute = '';
  currentRoute = currentRoute?.charAt(0).toUpperCase() + currentRoute?.slice(1);
  const initTitle = this.titleService.getTitle();
  // this.getPlayerData(id, currentRoute, initTitle);
  this.router.events
  .subscribe((event) => {
    if (event instanceof NavigationEnd) {
      this.titleService.setTitle(`${this.nameDestruct.transform(event?.urlAfterRedirects, '/', 1, 'upperCase', ' - ')} - ${initTitle}`);
      // // example url is /players/:id/overview
      // if (event.url?.split('/')[1] === 'players') {
      //   // Grab last route 'overview'
      //   currentRoute = event.url?.split('/')[3]?.split('?')[0];
      //   // last route 'overview' to toUpperCase() first letter
      //   currentRoute = currentRoute?.charAt(0)?.toUpperCase() + currentRoute?.slice(1);
      //   // if id change will dispatch the player data or won't dispatch
      //   if (id !== +event.url?.split('/')[2]?.split('?')[0] || currentRoute !== 'overview') {
      //     id = +event.url?.split('/')[2]?.split('?')[0]; // Grab middle id
      //     this.getPlayerData(id, currentRoute, initTitle); // Rerun the getPlayerData data
      //   }
      // }
      // // herees
      // else if (event.url?.split('/')[1] === 'heroes') {
      //   // example url is heroes/:id/rankings
      //   // Grab last route 'rankings'
      //   currentRoute = event.url?.split('/')[3]?.split('?')[0];
      //   // last route 'rankings' to toUpperCase() first letter
      //   currentRoute = currentRoute?.charAt(0)?.toUpperCase() + currentRoute?.slice(1);
      //   // if heroId change will dispatch the player data or won't dispatch
      //   if (id !== +event.url?.split('/')[2]?.split('?')[0] || currentRoute !== 'rankings') {
      //     id = +event.url?.split('/')[2]?.split('?')[0]; // Grab middle id
      //     this.getHeroData(id, currentRoute, initTitle); // Rerun the getHeroData data
      //   }

      // }
      // // other
      // else {
      // }
    }
  });
}

// getHeroData(id, currentRoute, initTitle): any {
//   this.store.dispatch(new playersActions.LoadPlayersGeneral(id));
//   this.store.select('playersGeneral').subscribe(data => {
//     if (data.player) {
//       if (data?.player?.profile?.name) {
//         this.titleService.setTitle(`${data.player?.profile?.name} - ${currentRoute} - ${initTitle}`);
//       } else {
//         this.titleService.setTitle(`${data.player?.profile?.personaname} - ${currentRoute} - ${initTitle}`);
//       }
//     }
//   }, err => {
//     console.log(err);
//   });
// }

// getPlayerData(id, currentRoute, initTitle): any {
//   this.store.dispatch(new playersActions.LoadPlayersGeneral(id));
//   this.store.select('playersGeneral').subscribe(data => {
//     if (data.player) {
//       if (data?.player?.profile?.name) {
//         this.titleService.setTitle(`${data.player?.profile?.name} - ${currentRoute} - ${initTitle}`);
//       } else {
//         this.titleService.setTitle(`${data.player?.profile?.personaname} - ${currentRoute} - ${initTitle}`);
//       }
//     }
//   }, err => {
//     console.log(err);
//   });
// }

}
