import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MedalsRoutingModule } from './medals-routing.module';
import { MedalsComponent } from './medals.component';

// shared model
import { SharedModule } from '../shared/shared.module';

// material
import { MaterialModule } from '../material.module';


@NgModule({
  declarations: [MedalsComponent],
  imports: [
    CommonModule,
    SharedModule,
    MaterialModule,
    MedalsRoutingModule
  ]
})
export class MedalsModule { }
