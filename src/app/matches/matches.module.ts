import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// shared
import { SharedModule } from '../shared/shared.module';

import { NgxEchartsModule } from 'ngx-echarts';

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
import { BandPickListComponent } from './components/band-pick-list/band-pick-list.component';
import { TableMatchDetailOverviewComponent } from './components/table-match-detail-overview/table-match-detail-overview.component';
import { TableMatchDetailOverviewAbilityBuildComponent } from './components/table-match-detail-overview-ability-build/table-match-detail-overview-ability-build.component';
import { TableMatchDetailCastsComponent } from './components/table-match-detail-casts/table-match-detail-casts.component';
import { TableMatchDetailRunesComponent } from './components/table-match-detail-runes/table-match-detail-runes.component';
import { TableMatchDetailObjectiveDamageComponent } from './components/table-match-detail-objective-damage/table-match-detail-objective-damage.component';
import { TableMatchDetailCombatKillsComponent } from './components/table-match-detail-combat-kills/table-match-detail-combat-kills.component';
import { TableMatchDetailCombatDamageComponent } from './components/table-match-detail-combat-damage/table-match-detail-combat-damage.component';
import { TableMatchDetailCombatDamageDetailComponent } from './components/table-match-detail-combat-damage-detail/table-match-detail-combat-damage-detail.component';
import { TableMatchDetailUnitKillsComponent } from './components/table-match-detail-unit-kills/table-match-detail-unit-kills.component';
import { TableMatchDetailLastHitsComponent } from './components/table-match-detail-last-hits/table-match-detail-last-hits.component';
import { ChartStackBarComponent } from './components/chart-stack-bar/chart-stack-bar.component';
import { TableMatchDetailItemsComponent } from './components/table-match-detail-items/table-match-detail-items.component';
import { ChartStatckLineComponent } from './components/chart-statck-line/chart-statck-line.component';
import { ChartStackLineWithMinusComponent } from './components/chart-stack-line-with-minus/chart-stack-line-with-minus.component';
import { TimeLineTeamfightComponent } from './components/time-line-teamfight/time-line-teamfight.component';
import { TableMatchDetailFantasyComponent } from './components/table-match-detail-fantasy/table-match-detail-fantasy.component';
import { TableMatchDetailTeamfightsComponent } from './components/table-match-detail-teamfights/table-match-detail-teamfights.component';
import { TableMatchDetailAnalysisComponent } from './components/table-match-detail-analysis/table-match-detail-analysis.component';
import { TableMatchDetailVisionComponent } from './components/table-match-detail-vision/table-match-detail-vision.component';
import { TableMatchDetailWardLogComponent } from './components/table-match-detail-ward-log/table-match-detail-ward-log.component';
import { VisionMapComponent } from './components/vision-map/vision-map.component';
import { TableMatchDetailVisionShowhideComponent } from './components/table-match-detail-vision-showhide/table-match-detail-vision-showhide.component';


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
    TableCosmeticsComponent,
    BandPickListComponent,
    TableMatchDetailOverviewComponent,
    TableMatchDetailOverviewAbilityBuildComponent,
    TableMatchDetailCastsComponent,
    TableMatchDetailRunesComponent,
    TableMatchDetailObjectiveDamageComponent,
    TableMatchDetailCombatKillsComponent,
    TableMatchDetailCombatDamageComponent,
    TableMatchDetailCombatDamageDetailComponent,
    TableMatchDetailUnitKillsComponent,
    TableMatchDetailLastHitsComponent,
    ChartStackBarComponent,
    TableMatchDetailItemsComponent,
    ChartStatckLineComponent,
    ChartStackLineWithMinusComponent,
    TimeLineTeamfightComponent,
    TableMatchDetailFantasyComponent,
    TableMatchDetailTeamfightsComponent,
    TableMatchDetailAnalysisComponent,
    TableMatchDetailVisionComponent,
    TableMatchDetailWardLogComponent,
    VisionMapComponent,
    TableMatchDetailVisionShowhideComponent
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

    NgxEchartsModule.forRoot({
      echarts: () => import('echarts')
    })
  ]
})
export class MatchesModule { }
