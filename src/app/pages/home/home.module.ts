import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {HomeRoutingModule} from './home-routing.module';
import {HomeComponent} from './home.component';
import {ChartModule} from "primeng/chart";
import {HighchartsChartModule} from "highcharts-angular";


@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    ChartModule,
    HighchartsChartModule
  ]
})
export class HomeModule {
}
