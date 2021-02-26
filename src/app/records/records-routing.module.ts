import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// page components
import { DeathsComponent } from './pages/deaths/deaths.component';
import { DeniesComponent } from './pages/denies/denies.component';
import { DurationComponent } from './pages/duration/duration.component';
import { AssistsComponent } from './pages/assists/assists.component';
import { GoldPerMinComponent } from './pages/gold-per-min/gold-per-min.component';
import { HeroDamageComponent } from './pages/hero-damage/hero-damage.component';
import { HeroHealingComponent } from './pages/hero-healing/hero-healing.component';
import { KillsComponent } from './pages/kills/kills.component';
import { LastHitsComponent } from './pages/last-hits/last-hits.component';
import { TowerDamageComponent } from './pages/tower-damage/tower-damage.component';
import { XpPerMinComponent } from './pages/xp-per-min/xp-per-min.component';

import { RecordsComponent } from './records.component';

const routes: Routes = [
  { path: '', component: RecordsComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'duration'},
      { path: 'duration', component: DurationComponent },
      { path: 'kills', component: KillsComponent },
      { path: 'deaths', component: DeathsComponent },
      { path: 'assists', component: AssistsComponent },
      { path: 'gold_per_min', component: GoldPerMinComponent },
      { path: 'xp_per_min', component: XpPerMinComponent },
      { path: 'last_hits', component: LastHitsComponent },
      { path: 'denies', component: DeniesComponent },
      { path: 'hero_damage', component: HeroDamageComponent },
      { path: 'tower_damage', component: TowerDamageComponent },
      { path: 'hero_healing', component: HeroHealingComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecordsRoutingModule { }
