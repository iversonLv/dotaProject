import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// pages
import { PlayersComponent } from './players.component';
import { OverviewComponent } from './pages/overview/overview.component';
import { HeroesComponent } from './pages/heroes/heroes.component';
import { PeersComponent } from './pages/peers/peers.component';
import { CountsComponent } from './pages/counts/counts.component';
import { MatchesComponent } from './pages/matches/matches.component';
import { TotalsComponent } from './pages/totals/totals.component';
import { RankingsComponent } from './pages/rankings/rankings.component';
import { ProsComponent } from './pages/pros/pros.component';
import { RecordsComponent } from './pages/records/records.component';
import { HistogramsComponent } from './pages/histograms/histograms.component';
import { TrendsComponent } from './pages/trends/trends.component';
import { WardmapComponent } from './pages/wardmap/wardmap.component';
import { WordcloudComponent } from './pages/wordcloud/wordcloud.component';
import { MmrComponent } from './pages/mmr/mmr.component';
import { ActvityComponent } from './pages/actvity/actvity.component';

const routes: Routes = [
  { path: '', component: PlayersComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'overview'},
      { path: 'overview', component: OverviewComponent },
      { path: 'matches', component: MatchesComponent },
      { path: 'heroes', component: HeroesComponent },
      { path: 'peers', component: PeersComponent },
      { path: 'pros', component: ProsComponent },
      { path: 'records', component: RecordsComponent },
      { path: 'totals', component: TotalsComponent },
      { path: 'counts', component: CountsComponent },
      { path: 'histograms', component: HistogramsComponent },
      { path: 'trends', component: TrendsComponent },
      { path: 'wardmap', component: WardmapComponent },
      { path: 'wordcloud', component: WordcloudComponent },
      { path: 'mmr', component: MmrComponent },
      { path: 'rankings', component: RankingsComponent },
      { path: 'actvity', component: ActvityComponent },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlayersRoutingModule { }
