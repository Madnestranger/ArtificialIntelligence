import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { Lab2RoutingModule } from './lab2-routing.module';
import { Lab2Component } from './lab2.component';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    Lab2RoutingModule
  ],
  declarations: [
    Lab2Component
  ]
})
export class Lab2Module { }

