import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TeamDetailComponent } from '../teams/pages/team-detail/team-detail.component';

import { TeamListComponent } from '../teams/pages/team-list/team-list.component';
import { OverviewComponent } from '../teams/pages/overview/overview.component';
import { MatchesComponent } from '../teams/pages/matches/matches.component';
import { HeroesComponent } from '../teams/pages/heroes/heroes.component';
import { PlayersComponent } from '../teams/pages/players/players.component';

const routes: Routes = [
  { path: '', component: TeamListComponent},
  { path: ':id', component: TeamDetailComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'overview'},
      { path: 'overview', component: OverviewComponent },
      { path: 'matches', component: MatchesComponent },
      { path: 'heroes', component: HeroesComponent },
      { path: 'players', component: PlayersComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeamsRoutingModule { }
