import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// material
import { MaterialModule } from '../material.module';

import { ItemsRoutingModule } from './items-routing.module';
import { SharedModule } from '../shared/shared.module';

import { ItemsComponent } from './items.component';


@NgModule({
  declarations: [ItemsComponent],
  imports: [
    CommonModule,
    MaterialModule,
    ItemsRoutingModule,
    SharedModule,
  ]
})
export class ItemsModule { }
