import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// shared
import { SharedModule } from '../shared/shared.module';

// material
import { MaterialModule } from '../material.module';

// ngrx
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import * as fromMatchesReducers from './store/matches.reducers';
import { MatchesEffects } from './store/matches.effects';

import { MatchesRoutingModule } from './matches-routing.module';

import { MatchesComponent } from './matches.component';
import { MatchDetailComponent } from './pages/match-detail/match-detail.component';
import { ListsComponent } from './components/lists/lists.component';
import { ProComponent } from './pages/pro/pro.component';
import { PublicComponent } from './pages/public/public.component';
import { OverviewComponent } from './pages/overview/overview.component';
import { BenchmarksComponent } from './pages/benchmarks/benchmarks.component';
import { DraftComponent } from './pages/draft/draft.component';
import { PerformancesComponent } from './pages/performances/performances.component';
import { LaningComponent } from './pages/laning/laning.component';
import { CombatComponent } from './pages/combat/combat.component';
import { FarmComponent } from './pages/farm/farm.component';
import { ItemsComponent } from './pages/items/items.component';
import { GraphsComponent } from './pages/graphs/graphs.component';
import { CastsComponent } from './pages/casts/casts.component';
import { ObjectivesComponent } from './pages/objectives/objectives.component';
import { VisionComponent } from './pages/vision/vision.component';
import { ActionsComponent } from './pages/actions/actions.component';
import { TeamfightsComponent } from './pages/teamfights/teamfights.component';
import { AnalysisComponent } from './pages/analysis/analysis.component';
import { CosmeticsComponent } from './pages/cosmetics/cosmetics.component';
import { LogComponent } from './pages/log/log.component';
import { FantasyComponent } from './pages/fantasy/fantasy.component';
import { ChatComponent } from './pages/chat/chat.component';
import { StoryComponent } from './pages/story/story.component';
import { MatchListComponent } from './pages/match-list/match-list.component';
import { MatchHeroComponent } from './components/match-hero/match-hero.component';
import { TableMatchesProComponent } from './components/table-matches-pro/table-matches-pro.component';
import { TableMatchesPublicComponent } from './components/table-matches-public/table-matches-public.component';
import { DraftListComponent } from './components/draft-list/draft-list.component';
import { TableMatchDetailBenchmarksComponent } from './components/table-match-detail-benchmarks/table-match-detail-benchmarks.component';
import { PlayerBoxComponent } from './components/player-box/player-box.component';
import { TableMatchDetailActionsComponent } from './components/table-match-detail-actions/table-match-detail-actions.component';
import { TableMatchDetailPerformancesComponent } from './components/table-match-detail-performances/table-match-detail-performances.component';
import { TableCosmeticsComponent } from './components/table-cosmetics/table-cosmetics.component';


@NgModule({
  declarations: [
    MatchesComponent,
    MatchDetailComponent,
    ListsComponent,
    ProComponent,
    PublicComponent,
    OverviewComponent,
    BenchmarksComponent,
    DraftComponent,
    PerformancesComponent,
    LaningComponent,
    CombatComponent,
    FarmComponent,
    ItemsComponent,
    GraphsComponent,
    CastsComponent,
    ObjectivesComponent,
    VisionComponent,
    ActionsComponent,
    TeamfightsComponent,
    AnalysisComponent,
    CosmeticsComponent,
    LogComponent,
    FantasyComponent,
    ChatComponent,
    StoryComponent,
    MatchListComponent,
    MatchHeroComponent,
    TableMatchesProComponent,
    TableMatchesPublicComponent,
    DraftListComponent,
    TableMatchDetailBenchmarksComponent,
    PlayerBoxComponent,
    TableMatchDetailActionsComponent,
    TableMatchDetailPerformancesComponent,
    TableCosmeticsComponent
  ],
  imports: [
    CommonModule,
    MatchesRoutingModule,
    SharedModule,
    MaterialModule,
    StoreModule.forFeature('matches', {
      singleMatch: fromMatchesReducers.singleMatch,
      proMatches: fromMatchesReducers.proMatches,
      publicMatches: fromMatchesReducers.publicMatches,
    }),
    EffectsModule.forFeature([MatchesEffects]),

  ]
})
export class MatchesModule { }
