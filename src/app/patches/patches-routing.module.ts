import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PatchesComponent } from './patches.component';

const routes: Routes = [
  { path: '', component: PatchesComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PatchesRoutingModule { }
