import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material.module';
import { RouterModule } from '@angular/router';

import { NgxEchartsModule } from 'ngx-echarts';

// shared component
import { DropdownComponent } from './components/dropdown/dropdown.component';
import { NavTitleComponent } from './components/nav-title/nav-title.component';
import { SubNavComponent } from './components/sub-nav/sub-nav.component';
import { MainNavComponent } from './components/main-nav/main-nav.component';
import { HeroIconPlayerNameComponent } from './components/hero-icon-player-name/hero-icon-player-name.component';
import { ImgComponent } from './components/img/img.component';

// icon
import { HeroAttrStrComponent } from './components/icons/hero-attr-str/hero-attr-str.component';
import { HeroAttrAgiComponent } from './components/icons/hero-attr-agi/hero-attr-agi.component';
import { HeroAttrIntComponent } from './components/icons/hero-attr-int/hero-attr-int.component';
import { IconRoshanComponent } from './components/icons/icon-roshan/icon-roshan.component';
import { RadientComponent } from './components/icons/radient/radient.component';
import { DireComponent } from './components/icons/dire/dire.component';
import { WinComponent } from './components/icons/win/win.component';

// charts
import { CountChartComponent } from './components/count-chart/count-chart.component';
import { BarChartComponent } from './components/bar-chart/bar-chart.component';
import { LineChartComponent } from './components/line-chart/line-chart.component';
import { BarColumnChartComponent } from './components/bar-column-chart/bar-column-chart.component';
import { CalendarChartComponent } from './components/calendar-chart/calendar-chart.component';
import { PieChartComponent } from './components/pie-chart/pie-chart.component';
import { WorldPopulationChartComponent } from './components/world-population-chart/world-population-chart.component';
import { TableGeneralComponent } from './components/table-general/table-general.component';

// modals component
import { HeroModalComponent } from './components/hero-modal/hero-modal.component';
import { TalentModalComponent } from './components/talent-modal/talent-modal.component';
import { ItemModalComponent } from './components/item-modal/item-modal.component';
import { AbilityModalComponent } from './components/ability-modal/ability-modal.component';
import { CosmeticModalComponent } from './components/cosmetic-modal/cosmetic-modal.component';
import { FirstBloodModalComponent } from './components/first-blood-modal/first-blood-modal.component';
import { RoshanKilledModalComponent } from './components/roshan-killed-modal/roshan-killed-modal.component';
import { TeamFightModalComponent } from './components/team-fight-modal/team-fight-modal.component';
import { ObsSenModalComponent } from './components/obs-sen-modal/obs-sen-modal.component';

// dialogs
import { DialogPlayerListComponent } from './components/dialog-player-list/dialog-player-list.component';

// pipes
import { OrderByPipe } from './utils/order-by.pipe';
import { RankTierPipe } from './utils/rank-tier.pipe';
import { NameDestructPipe } from './utils/name-destruct.pipe';
import { DurationFormatPipe } from './utils/duration-format.pipe';
import { GreaterNumPipe } from './utils/greater-num.pipe';
import { DateTillTodayPipe } from './utils/date-till-today.pipe';
import { StringToArrayPipe } from './utils/string-to-array.pipe';
import { ExcludeTextPipe } from './utils/exclude-text.pipe';
import { OrdinalNumPipe } from './utils/ordinal-num.pipe';
import { FieldTooltipPipe } from './utils/field-tooltip.pipe';
import { ReplaceTextPipe } from './utils/replace-text.pipe';



@NgModule({
  declarations: [
    DropdownComponent,
    NavTitleComponent,
    SubNavComponent,
    MainNavComponent,
    HeroIconPlayerNameComponent,
    ImgComponent,

    // icons
    HeroAttrStrComponent,
    HeroAttrAgiComponent,
    HeroAttrIntComponent,
    WinComponent,
    RadientComponent,
    DireComponent,
    IconRoshanComponent,

    // modals
    HeroModalComponent,
    ItemModalComponent,
    AbilityModalComponent,
    TalentModalComponent,
    CosmeticModalComponent,
    FirstBloodModalComponent,
    RoshanKilledModalComponent,
    TeamFightModalComponent,
    ObsSenModalComponent,
    TableGeneralComponent,

    // dialogs
    DialogPlayerListComponent,

    // charts
    CountChartComponent,
    BarChartComponent,
    LineChartComponent,
    BarColumnChartComponent,
    CalendarChartComponent,
    PieChartComponent,
    WorldPopulationChartComponent,

    // pipes
    OrderByPipe,
    RankTierPipe,
    NameDestructPipe,
    DurationFormatPipe,
    GreaterNumPipe,
    DateTillTodayPipe,
    StringToArrayPipe,
    ExcludeTextPipe,
    OrdinalNumPipe,
    FieldTooltipPipe,
    ReplaceTextPipe,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    RouterModule,
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts')
    })
  ],
  exports: [
    DropdownComponent,
    NavTitleComponent,
    SubNavComponent,
    MainNavComponent,
    HeroIconPlayerNameComponent,
    ImgComponent,

    // icons
    HeroAttrStrComponent,
    HeroAttrAgiComponent,
    HeroAttrIntComponent,
    WinComponent,
    RadientComponent,
    DireComponent,
    IconRoshanComponent,

    // modals
    HeroModalComponent,
    ItemModalComponent,
    AbilityModalComponent,
    TalentModalComponent,
    CosmeticModalComponent,
    FirstBloodModalComponent,
    RoshanKilledModalComponent,
    TeamFightModalComponent,
    ObsSenModalComponent,
    TableGeneralComponent,

    // dialogs
    DialogPlayerListComponent,

    // charts
    CountChartComponent,
    BarChartComponent,
    LineChartComponent,
    BarColumnChartComponent,
    CalendarChartComponent,
    PieChartComponent,
    WorldPopulationChartComponent,

    // pipes
    OrderByPipe,
    RankTierPipe,
    NameDestructPipe,
    DurationFormatPipe,
    GreaterNumPipe,
    DateTillTodayPipe,
    StringToArrayPipe,
    ExcludeTextPipe,
    OrdinalNumPipe,
    FieldTooltipPipe,
    ReplaceTextPipe,
  ]
})
export class SharedModule { }
