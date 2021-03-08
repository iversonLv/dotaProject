import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { SharedModule } from './shared/shared.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { environment } from '../environments/environment';


// ngrx dev tool
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

// ngrx
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import * as fromPlayersReducers from './players/store/players.reducers';
import { PlayersEffects } from './players/store/players.effects';

import * as fromHerosReducers from './heros/store/heros.reducers';
import { HerosEffects } from './heros/store/heros.effects';

import * as fromTeamsReducers from './teams/store/teams.reducers';
import { TeamsEffects } from './teams/store/teams.effects';

import * as fromRecordsReducers from './records/store/records.reducers';
import { RecordsEffects } from './records/store/records.effects';

import * as fromSearchReducers from './search/store/search.reducers';
import { SearchEffects } from './search/store/search.effects';

import * as fromMatchesReducers from './matches/store/matches.reducers';
import { MatchesEffects } from './matches/store/matches.effects';

// import { MainNavComponent } from './shared/components/main-nav/main-nav.component';


// ngrx dev tool
const devToolsOption = { name: 'Dota2 Project API', maxAge: 25, logOnly: environment.production };

@NgModule({
  declarations: [
    AppComponent,
     // MainNavComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    SharedModule,
    StoreModule.forRoot({
      // heroes
      heroGeneral: fromHerosReducers.heroGeneral,
      herosRankings: fromHerosReducers.herosRankings,
      herosBenchmarks: fromHerosReducers.herosBenchmarks,
      herosMatches: fromHerosReducers.herosMatches,
      herosMatchups: fromHerosReducers.herosMatchups,
      herosDurations: fromHerosReducers.herosDurations,
      herosPlayers: fromHerosReducers.herosPlayers,
      herosItemPopularity: fromHerosReducers.herosItemPopularity,

      heroStats: fromHerosReducers.heroStats,

      // teams
      teamsList: fromTeamsReducers.teamsList,
      teamsGeneral: fromTeamsReducers.teamsGeneral,
      teamsPlayers: fromTeamsReducers.teamsPlayers,
      teamsMatches: fromTeamsReducers.teamsMatches,
      teamsHeroes: fromTeamsReducers.teamsHeroes,

      // search
      searchList: fromSearchReducers.searchList,

      // players
      playersMyRecordWithWinLoseCount: fromPlayersReducers.playersMyRecordWithWinLoseCount,
      playersWinLoseCount: fromPlayersReducers.playersWinLoseCount,
      playersGeneral: fromPlayersReducers.playersGeneral,
      playersPeers: fromPlayersReducers.playersPeers,
      playersPeersFilter: fromPlayersReducers.playersPeersFilter,
      playersHeroesPlayed: fromPlayersReducers.playersHeroesPlayed,
      playersMatches: fromPlayersReducers.playersMatches,
      playersRecentMatches: fromPlayersReducers.playersRecentMatches,
      playersCounts: fromPlayersReducers.playersCounts,
      playersTotals: fromPlayersReducers.playersTotals,
      playersRankings: fromPlayersReducers.playersRankings,
      playersPros: fromPlayersReducers.playersPros,
      proPlayers: fromPlayersReducers.proPlayers,
      playersHistograms: fromPlayersReducers.playersHistograms,
      playersRecords: fromPlayersReducers.playersRecords,
      playersTrends: fromPlayersReducers.playersTrends,
      playersRatings: fromPlayersReducers.playersRatings,

      // records
      recordsList: fromRecordsReducers.recordsList,

      // match
      singleMatch: fromMatchesReducers.singleMatch,
      proMatches: fromMatchesReducers.proMatches,
      publicMatches: fromMatchesReducers.publicMatches,
    }),
    EffectsModule.forRoot([
      PlayersEffects,
      HerosEffects,
      TeamsEffects,
      RecordsEffects,
      SearchEffects,
      MatchesEffects
    ]),
    StoreDevtoolsModule.instrument(devToolsOption), // this need below StoreModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
