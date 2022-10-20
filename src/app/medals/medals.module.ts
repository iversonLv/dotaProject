import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MedalsRoutingModule } from './medals-routing.module';

// echart
import { NgxEchartsModule } from 'ngx-echarts';

// shared model
import { SharedModule } from '../shared/shared.module';

// material
import { MaterialModule } from '../material.module';

// components
import { MedalsComponent } from './medals.component';
import { DistributionsComponent } from './pages/distributions/distributions.component';
import { MedalsIconComponent } from './pages/medals-icon/medals-icon.component';
import { DistributionsColChartComponent } from './components/distributions-col-chart/distributions-col-chart.component';


@NgModule({
  declarations: [
    MedalsComponent,
    DistributionsComponent,
    MedalsIconComponent,
    DistributionsColChartComponent
  ],
  imports: [
    CommonModule,
    MedalsRoutingModule,
    MaterialModule,
    SharedModule,
    NgxEchartsModule,
  ]
})
export class MedalsModule { }
