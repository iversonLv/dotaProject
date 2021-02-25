import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MedalsComponent } from './medals.component';

const routes: Routes = [{ path: '', component: MedalsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MedalsRoutingModule { }
