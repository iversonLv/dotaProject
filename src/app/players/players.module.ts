import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlayersRoutingModule } from './players-routing.module';

import { NgxEchartsModule } from 'ngx-echarts';

// material
import { MaterialModule } from '../material.module';

// ngrx and reducer
import { StoreModule } from '@ngrx/store';
import * as fromPlayersReducers from './store/players.reducers';
import { EffectsModule } from '@ngrx/effects';
import { PlayersEffects } from './store/players.effects';

// shared model
import { SharedModule } from '../shared/shared.module';

import { PlayersComponent } from './players.component';
import { OverviewComponent } from './pages/overview/overview.component';
import { PlayersHeroComponent } from './components/players-hero/players-hero.component';
import { PlayersNavComponent } from './components/players-nav/players-nav.component';
import { FilterBarComponent } from './components/filter-bar/filter-bar.component';
import { PeersComponent } from './pages/peers/peers.component';
import { HeroesComponent } from './pages/heroes/heroes.component';
import { CountsComponent } from './pages/counts/counts.component';
import { MatchesComponent } from './pages/matches/matches.component';
import { TotalsComponent } from './pages/totals/totals.component';
import { RankingsComponent } from './pages/rankings/rankings.component';
import { TableMatchesComponent } from './components/table-matches/table-matches.component';
import { TableHeroesComponent } from './components/table-heroes/table-heroes.component';
import { ProsComponent } from './pages/pros/pros.component';
import { RecordsComponent } from './pages/records/records.component';
import { HistogramsComponent } from './pages/histograms/histograms.component';
import { TrendsComponent } from './pages/trends/trends.component';
import { WardmapComponent } from './pages/wardmap/wardmap.component';
import { WordcloudComponent } from './pages/wordcloud/wordcloud.component';
import { MmrComponent } from './pages/mmr/mmr.component';
import { ActvityComponent } from './pages/actvity/actvity.component';
import { TablePlayersComponent } from './components/table-players/table-players.component';
import { TableCountsComponent } from './components/table-counts/table-counts.component';
import { TableActivitiesComponent } from './components/table-activities/table-activities.component';
import { HistogramChartComponent } from './components/histogram-chart/histogram-chart.component';
import { TablePlayersRecordsComponent } from './components/table-players-records/table-players-records.component';
import { TrendsChartComponent } from './components/trends-chart/trends-chart.component';


@NgModule({
  declarations: [
    PlayersComponent,
    OverviewComponent,
    PlayersHeroComponent,
    PlayersNavComponent,
    FilterBarComponent,
    PeersComponent,
    HeroesComponent,
    CountsComponent,
    MatchesComponent,
    TotalsComponent,
    RankingsComponent,
    TableMatchesComponent,
    TableHeroesComponent,
    ProsComponent,
    RecordsComponent,
    HistogramsComponent,
    TrendsComponent,
    WardmapComponent,
    WordcloudComponent,
    MmrComponent,
    ActvityComponent,
    TablePlayersComponent,
    TableCountsComponent,
    TableActivitiesComponent,
    HistogramChartComponent,
    TablePlayersRecordsComponent,
    TrendsChartComponent
  ],
  imports: [
    CommonModule,
    PlayersRoutingModule,
    MaterialModule,
    SharedModule,
    NgxEchartsModule,
    StoreModule.forFeature('players', {
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
    }),
    EffectsModule.forFeature([PlayersEffects])
  ],
  exports: []
})
export class PlayersModule { }
