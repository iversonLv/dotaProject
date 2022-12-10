import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'home', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },
  { path: 'players/:id', loadChildren: () => import('./players/players.module').then(m => m.PlayersModule) },
  { path: 'heroes', loadChildren: () => import('./heros/heros.module').then(m => m.HerosModule) },
  { path: 'matches', loadChildren: () => import('./matches/matches.module').then(m => m.MatchesModule) },
  { path: 'teams', loadChildren: () => import('./teams/teams.module').then(m => m.TeamsModule) },
  { path: 'rank-tier', loadChildren: () => import('./medals/medals.module').then(m => m.MedalsModule) },
  { path: 'records', loadChildren: () => import('./records/records.module').then(m => m.RecordsModule) },
  { path: 'search', loadChildren: () => import('./search/search.module').then(m => m.SearchModule) },
  { path: 'patches', loadChildren: () => import('./patches/patches.module').then(m => m.PatchesModule) },
  { path: 'items', loadChildren: () => import('./items/items.module').then(m => m.ItemsModule) },
  { path: 'login', loadChildren: () => import('./login/login.module').then(m => m.LoginModule) },
  { path: '**', loadChildren: () => import('./page-not-found/page-not-found.module').then(m => m.PageNotFoundModule) },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

