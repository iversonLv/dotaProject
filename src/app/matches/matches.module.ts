import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// shared model
import { SharedModule } from '../shared/shared.module';

// ngrx
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import * as fromMatchesReducers from './store/matches.reducers';
import { MatchesEffects } from './store/matches.effects';

import { MatchesRoutingModule } from './matches-routing.module';

import { MatchesComponent } from './matches.component';
import { MatchDetailComponent } from './pages/match-detail/match-detail.component';
import { ListsComponent } from './components/lists/lists.component';


@NgModule({
  declarations: [MatchesComponent, MatchDetailComponent, ListsComponent],
  imports: [
    CommonModule,
    MatchesRoutingModule,
    SharedModule,
    StoreModule.forFeature('matches', {
    }),
    EffectsModule.forFeature([MatchesEffects]),

  ]
})
export class MatchesModule { }
