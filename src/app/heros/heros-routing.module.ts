import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// model
import { HeroListComponent } from './pages/hero-list/hero-list.component';
import { ProComponent } from './pages/pro/pro.component';
import { PublicComponent } from './pages/public/public.component';
import { TurboComponent } from './pages/turbo/turbo.component';

import { HeroDetailComponent } from './pages/hero-detail/hero-detail.component';
import { RankingsComponent } from './pages/rankings/rankings.component';
import { BenchmarksComponent } from './pages/benchmarks/benchmarks.component';
import { RecentComponent } from './pages/recent/recent.component';
import { MatchupsComponent } from './pages/matchups/matchups.component';
import { DurationsComponent } from './pages/durations/durations.component';
import { PlayersComponent } from './pages/players/players.component';

const routes: Routes = [
  { path: '', component: HeroListComponent,
   children: [
    { path: '', pathMatch: 'full', redirectTo: 'pro'},
    { path: 'pro', component: ProComponent },
    { path: 'public', component: PublicComponent },
    { path: 'turbo', component: TurboComponent },
   ]
  },
  { path: ':id', component: HeroDetailComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'rankings'},
      { path: 'rankings', component: RankingsComponent },
      { path: 'benchmarks', component: BenchmarksComponent },
      { path: 'recent', component: RecentComponent },
      { path: 'matchups', component: MatchupsComponent },
      { path: 'durations', component: DurationsComponent },
      { path: 'players', component: PlayersComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HerosRoutingModule { }
