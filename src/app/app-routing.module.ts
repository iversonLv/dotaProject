import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { path: 'players/:id', loadChildren: () => import('./players/players.module').then(m => m.PlayersModule) },
  { path: 'heroes', loadChildren: () => import('./heros/heros.module').then(m => m.HerosModule) },
  { path: 'matches', loadChildren: () => import('./matches/matches.module').then(m => m.MatchesModule) },
  { path: 'teams', loadChildren: () => import('./teams/teams.module').then(m => m.TeamsModule) },
  { path: 'medals', loadChildren: () => import('./medals/medals.module').then(m => m.MedalsModule) },
  { path: 'records', loadChildren: () => import('./records/records.module').then(m => m.RecordsModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

