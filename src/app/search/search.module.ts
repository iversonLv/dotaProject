import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// material
import { MaterialModule } from '../material.module';

// sharedModule
import { SharedModule } from '../shared/shared.module';

import { SearchRoutingModule } from './search-routing.module';
import { SearchComponent } from './search.component';

// ngrx
import * as fromSearchReducers from './store/search.reducers';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { SearchEffects } from './store/search.effects';
import { TableResultComponent } from './components/table-result/table-result.component';
import { TableMatchComponent } from './components/table-match/table-match.component';

@NgModule({
  declarations: [SearchComponent, TableResultComponent, TableMatchComponent],
  imports: [
    CommonModule,
    SearchRoutingModule,
    SharedModule,
    MaterialModule,
  ]
})
export class SearchModule { }
