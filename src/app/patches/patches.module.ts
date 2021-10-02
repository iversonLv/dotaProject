import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PatchesRoutingModule } from './patches-routing.module';
import { PatchesComponent } from './patches.component';
import { PatchDetailComponent } from './components/patch-detail/patch-detail.component';
import { PatchesListComponent } from './components/patches-list/patches-list.component';


// shared model
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [PatchesComponent, PatchDetailComponent, PatchesListComponent],
  imports: [
    CommonModule,
    SharedModule,
    PatchesRoutingModule
  ]
})
export class PatchesModule { }
