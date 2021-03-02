import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HerosRoutingModule } from './heros-routing.module';

// material
import { MaterialModule } from '../material.module';

import { HerosComponent } from './heros.component';
import { ListsComponent } from './components/lists/lists.component';

import { SharedModule } from 'src/app/shared/shared.module';

// ngrx and reducer
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromHerosReducers from './store/heros.reducers';
import { HerosEffects } from './store/heros.effects';
import { HeroDetailComponent } from './pages/hero-detail/hero-detail.component';
import { HeroListComponent } from './pages/hero-list/hero-list.component';
import { HeroesHeroComponent } from './components/heroes-hero/heroes-hero.component';
import { RankingsComponent } from './pages/rankings/rankings.component';
import { BenchmarksComponent } from './pages/benchmarks/benchmarks.component';
import { RecentComponent } from './pages/recent/recent.component';
import { MatchupsComponent } from './pages/matchups/matchups.component';
import { DurationsComponent } from './pages/durations/durations.component';
import { PlayersComponent } from './pages/players/players.component';
import { ProComponent } from './pages/pro/pro.component';
import { PublicComponent } from './pages/public/public.component';
import { TurboComponent } from './pages/turbo/turbo.component';
import { TableRankingsComponent } from './components/table-rankings/table-rankings.component';
import { TableHerosMatchesComponent } from './components/table-heros-matches/table-heros-matches.component';
import { TableMatchupsPlayersComponent } from './components/table-matchups-players/table-matchups-players.component';
import { TableBenchmarksComponent } from './components/table-benchmarks/table-benchmarks.component';
import { TableProComponent } from './components/table-pro/table-pro.component';
import { TableTuboComponent } from './components/table-tubo/table-tubo.component';
import { TablePublicComponent } from './components/table-public/table-public.component';
import { TablePublicColComponent } from './components/table-public-col/table-public-col.component';


@NgModule({
  declarations: [
    HerosComponent,
    ListsComponent,
    HeroDetailComponent,
    HeroListComponent,
    HeroesHeroComponent,
    RankingsComponent,
    BenchmarksComponent,
    RecentComponent,
    MatchupsComponent,
    DurationsComponent,
    PlayersComponent,
    ProComponent,
    PublicComponent,
    TurboComponent,
    TableRankingsComponent,
    TableHerosMatchesComponent,
    TableMatchupsPlayersComponent,
    TableBenchmarksComponent,
    TableProComponent,
    TableTuboComponent,
    TablePublicComponent,
    TablePublicColComponent],
  imports: [
    CommonModule,
    HerosRoutingModule,
    MaterialModule,
    SharedModule,
    StoreModule.forFeature('heros', {
      heroGeneral: fromHerosReducers.heroGeneral,
      heroStats: fromHerosReducers.heroStats,
      herosRankings: fromHerosReducers.herosRankings,
      herosBenchmarks: fromHerosReducers.herosBenchmarks,
      herosMatches: fromHerosReducers.herosMatches,
      herosMatchups: fromHerosReducers.herosMatchups,
      herosDurations: fromHerosReducers.herosDurations,
      herosPlayers: fromHerosReducers.herosPlayers,
      herosItemPopularity: fromHerosReducers.herosItemPopularity,
    }),
    EffectsModule.forFeature([HerosEffects]),
  ]
})
export class HerosModule { }
