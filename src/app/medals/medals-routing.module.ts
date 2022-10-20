import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MedalsComponent } from './medals.component';
import { DistributionsComponent } from './pages/distributions/distributions.component';
import { MedalsIconComponent } from './pages/medals-icon/medals-icon.component';


const routes: Routes = [
  {
    path: '', component: MedalsComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'distributions' },
      { path: 'distributions', component: DistributionsComponent },
      { path: 'medals_icon', component: MedalsIconComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MedalsRoutingModule { }
