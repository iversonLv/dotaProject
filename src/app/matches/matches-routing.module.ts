import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// component
import { MatchesComponent } from './matches.component';
import { MatchDetailComponent } from './pages/match-detail/match-detail.component';

const routes: Routes = [
  { path: '', component: MatchesComponent,
    children: [
      { path: ':id', component: MatchDetailComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MatchesRoutingModule { }
