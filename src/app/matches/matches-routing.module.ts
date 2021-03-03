import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// component
import { MatchListComponent } from './pages/match-list/match-list.component';
import { ProComponent } from './pages/pro/pro.component';
import { PublicComponent } from './pages/public/public.component';

import { MatchDetailComponent } from './pages/match-detail/match-detail.component';
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

const routes: Routes = [
  { path: '', component: MatchListComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'pro'},
      { path: 'pro', component: ProComponent },
      { path: 'public', component: PublicComponent },
    ]
  },
  { path: ':id', component: MatchDetailComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'overview'},
      { path: 'overview', component: OverviewComponent },
      { path: 'benchmarks', component: BenchmarksComponent },
      { path: 'draft', component: DraftComponent },
      { path: 'performances', component: PerformancesComponent },
      { path: 'laning', component: LaningComponent },
      { path: 'combat', component: CombatComponent },
      { path: 'farm', component: FarmComponent },
      { path: 'items', component: ItemsComponent },
      { path: 'graphs', component: GraphsComponent },
      { path: 'casts', component: CastsComponent },
      { path: 'objectives', component: ObjectivesComponent },
      { path: 'vision', component: VisionComponent },
      { path: 'actions', component: ActionsComponent },
      { path: 'teamfights', component: TeamfightsComponent },
      { path: 'analysis', component: AnalysisComponent },
      { path: 'cosmetics', component: CosmeticsComponent },
      { path: 'log', component: LogComponent },
      { path: 'fantasy', component: FantasyComponent },
      { path: 'chat', component: ChatComponent },
      { path: 'story', component: StoryComponent },
    ]

  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MatchesRoutingModule { }
