import { Component, Input, OnInit, ViewChild } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';

import { Observable } from 'rxjs';
// ngrx
import { Store } from '@ngrx/store';
import * as playersActions from '../../store/players.actions';

// material
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

// model

import { IHeroes, IMatch, IMatchData } from 'src/app/matches/model/match';
import { IheroLocal } from 'src/app/heros/model/heroLocal';
import { IItemColorLocal } from 'src/app/shared/model/item_color';

// service
import { HerosService } from 'src/app/heros/services/heros.service';
import { LobbyTypeService } from 'src/app/services/lobby-type.service';
import { GameModeService } from 'src/app/services/game-mode.service';
import { SkillService } from 'src/app/services/skill.service';
import { ItemsService } from 'src/app/services/items.service';
import { IRecentMatch, IRecentMatchData } from 'src/app/matches/model/recent-match';
import { LaneRoleService } from 'src/app/services/lane-role.service';

@Component({
  selector: 'app-table-matches',
  templateUrl: './table-matches.component.html',
  styleUrls: ['./table-matches.component.scss']
})
export class TableMatchesComponent implements OnInit {
  @Input() isRecentMatches = false;
  @Input() displayedColumns: string[] = ['hero_id', 'lobby_type', 'game_mode', 'duration', 'kills', 'deaths', 'assists'];
  @ViewChild(MatSort) set matSort(mp: MatSort) {
    this.sort = mp;
  }

  // material table bottom paginator
  // officaly, material table only support one paginator
  @ViewChild(MatPaginator) set matPaginator(mp: MatPaginator) {
    this.paginator = mp;
    this.setDataSourceAttributes();
  }
  paginator;
  sort;

  playersMatches: IMatch[];
  playersRecentMatches: IRecentMatch[];
  isLoading = true;

  playersMatches$: Observable<IMatchData>;
  playersRecentMatches$: Observable<IRecentMatchData>;

  queryParams;
  items: number[];

  // hero modal default hidden
  showHeroModal = false;
  showItemModal = false;
  currentMouseOverHero: IheroLocal = null;
  currentMouseOverItem: any = null;
  pageXY = [];

  // if include_account_id will show agaist or with
  agaistOrWith;

  // User for hero modal to mapping
  heroesLocal: IheroLocal;
  lobbyTypeLocal: any;
  gameModeLocal: any;
  skillLocal: any;
  laneRoleLocal: any;
  itemIdsLocal: any;
  itemsLocal: any;
  itemColorLocal: IItemColorLocal;

  // table for matches
  // displayedColumnsItems: string[] = ['hero_id', 'result', 'game_mode', 'duration', 'kills', 'deaths', 'assists', 'items'];
  dataSource = new MatTableDataSource();

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private herosService: HerosService,
    private lobbyTypeService: LobbyTypeService,
    private gameModeService: GameModeService,
    private itemsService: ItemsService,
    private skillService: SkillService,
    private laneRoleService: LaneRoleService,
    private store: Store<{
      playersMatches: IMatchData,
      playersRecentMatches: IRecentMatchData,
    }>
  ) { }

  ngOnInit(): void {
    const currentUrl = this.router.url;
    const accountId = +currentUrl.split('/')[2];
    this.activatedRoute.queryParamMap.subscribe(data => this.queryParams = data);

    if (!this.isRecentMatches) {
      this.store.dispatch(new playersActions.LoadPlayersMatches(accountId, this.queryParams));

      // load player matches
      this.store.select('playersMatches').subscribe(data => {
        this.isLoading = data.isLoading;
        if (!data.isLoading) {
            const dataMatches = [...data.matches];
            this.isLoading = data.isLoading;
            return this.dataSource.data = dataMatches;
          }
      }, err => {
        console.log(err);
      });
    } else {
      this.store.dispatch(new playersActions.LoadPlayersRecentMatches(accountId));
      this.store.select('playersRecentMatches').subscribe(data => {
        this.isLoading = data.isLoading;
        if (!data.isLoading) {
            const dataRecentMatches = [...data.matches];
            this.isLoading = data.isLoading;
            return this.dataSource.data = dataRecentMatches;
          }
      }, err => {
        console.log(err);
      });
    }

    // get all heroes local data
    this.getHeroesLocal();
    this.getLobbyTypeLocal();
    this.getGameModeLocal();
    this.getSkillLocal();
    this.getLaneRoleLocal();
    this.getItemIdsLocal();
    this.getItemsLocal();
    this.getItemColorLocal();
  }

  calAgaistOrWith(mySlot: number, heroes: IHeroes): any {
    // grab user agaist or width id from queryParams
    const agaistOrWithId = +this.queryParams.params.included_account_id;
    // find user from request data heroes obj to match the id
    const agaistOrWithHero = Object.values(heroes).find(item => item.account_id === agaistOrWithId);
    // find this user slot
    const agaistOrWithSlot = agaistOrWithHero?.player_slot;
    // console.log(mySlot, agaistOrWithHero)
    // comapre 2 players slot whether they are at the same side
    if ((mySlot > 100 && agaistOrWithSlot > 100) || (mySlot < 5 && agaistOrWithSlot < 5)) {
     return 'With';
    } else {
     return 'Agaist';
    }
  }


  setDataSourceAttributes(): any {
    this.dataSource.sort = this.sort;
    if (!this.isRecentMatches) {
      this.dataSource.paginator = this.paginator;
    }
  }

  // material table bottom paginator
  syncPrimaryPaginator(event: PageEvent): any {
    if (!this.isRecentMatches) {
      this.paginator.pageIndex = event.pageIndex;
      this.paginator.pageSize = event.pageSize;
      this.paginator.page.emit(event);
    }
  }

  getHeroesLocal(): any {
    this.herosService.getHeroesLocal().subscribe(data => {
      this.heroesLocal = data;
    }, err => {
      console.log(err);
    });
  }

  getLobbyTypeLocal(): any {
    this.lobbyTypeService.getLobbyTypeLocal().subscribe(data => {
      this.lobbyTypeLocal = data;
    }, err => {
      console.log(err);
    });
  }

  getGameModeLocal(): any {
    this.gameModeService.getGameModeLocal().subscribe(data => {
      this.gameModeLocal = data;
    }, err => {
      console.log(err);
    });
  }


  getLaneRoleLocal(): any {
    this.laneRoleService.getLaneRoleLocal().subscribe(data => {
      this.laneRoleLocal = data;
    }, err => {
      console.log(err);
    });
  }

  getSkillLocal(): any {
    this.skillService.getSkillLocal().subscribe(data => {
      this.skillLocal = data;
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

  getItemColorLocal(): any {
    this.itemsService.getItemColorLocal().subscribe(data => {
      this.itemColorLocal = data;
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

  showHeroModalFn(e, id): any {
    this.pageXY = [e.pageX + 50, e.pageY - 120];
    this.showHeroModal = true;
    this.currentMouseOverHero = this.heroesLocal[id];
  }

  showItemModalFn(e, id): any {
    this.pageXY = [e.pageX - 350, e.pageY - 120];
    this.showItemModal = true;
    this.currentMouseOverItem = this.itemsLocal[this.itemIdsLocal[id]];
  }

}
