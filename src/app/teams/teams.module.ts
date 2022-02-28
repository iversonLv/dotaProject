import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// material
import { MaterialModule } from '../material.module';

// shared model
import { SharedModule } from '../shared/shared.module';

import { TeamsRoutingModule } from './teams-routing.module';
import { TeamsComponent } from './teams.component';
import { TeamsHeroComponent } from './components/teams-hero/teams-hero.component';
import { TeamDetailComponent } from './pages/team-detail/team-detail.component';
import { TeamListComponent } from './pages/team-list/team-list.component';

// ngrx
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import * as fromTeamsReducers from './store/teams.reducers';
import { TeamsEffects } from './store/teams.effects';
import { TableTeamsComponent } from './components/table-teams/table-teams.component';
import { TableTeamsMatchesComponent } from './components/table-teams-matches/table-teams-matches.component';
import { TableTeamsHeroesComponent } from './components/table-teams-heroes/table-teams-heroes.component';
import { TableTeamsPlayersComponent } from './components/table-teams-players/table-teams-players.component';
import { OverviewComponent } from './pages/overview/overview.component';
import { MatchesComponent } from './pages/matches/matches.component';
import { PlayersComponent } from './pages/players/players.component';
import { HeroesComponent } from './pages/heroes/heroes.component';

@NgModule({
  declarations: [
    TeamsComponent,
    TeamsHeroComponent,
    TeamDetailComponent,
    TeamListComponent,
    TableTeamsComponent,
    TableTeamsMatchesComponent,
    TableTeamsHeroesComponent,
    TableTeamsPlayersComponent,
    OverviewComponent,
    MatchesComponent,
    PlayersComponent,
    HeroesComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    SharedModule,
    TeamsRoutingModule,
  ]
})
export class TeamsModule { }
