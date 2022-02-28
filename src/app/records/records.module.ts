import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// reouting
import { RecordsRoutingModule } from './records-routing.module';

// store, ngrx, reducer
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { RecordsEffects } from './store/records.effects';
import * as fromRecordsReducers from './store/records.reducers';

// material
import { MaterialModule } from '../material.module';

// shared model
import { SharedModule } from '../shared/shared.module';

// peges components
import { RecordsComponent } from './records.component';
import { DurationComponent } from './pages/duration/duration.component';
import { KillsComponent } from './pages/kills/kills.component';
import { DeathsComponent } from './pages/deaths/deaths.component';
import { AssistsComponent } from './pages/assists/assists.component';
import { GoldPerMinComponent } from './pages/gold-per-min/gold-per-min.component';
import { XpPerMinComponent } from './pages/xp-per-min/xp-per-min.component';
import { LastHitsComponent } from './pages/last-hits/last-hits.component';
import { DeniesComponent } from './pages/denies/denies.component';
import { HeroDamageComponent } from './pages/hero-damage/hero-damage.component';
import { TowerDamageComponent } from './pages/tower-damage/tower-damage.component';
import { HeroHealingComponent } from './pages/hero-healing/hero-healing.component';
import { TableRecordsComponent } from './components/table-records/table-records.component';



@NgModule({
  declarations: [
    RecordsComponent,
    DurationComponent,
    KillsComponent,
    DeathsComponent,
    AssistsComponent,
    GoldPerMinComponent,
    XpPerMinComponent,
    LastHitsComponent,
    DeniesComponent,
    HeroDamageComponent,
    TowerDamageComponent,
    HeroHealingComponent,
    TableRecordsComponent
  ],
  imports: [
    CommonModule,
    RecordsRoutingModule,
    SharedModule,
    MaterialModule,
  ]
})
export class RecordsModule { }
