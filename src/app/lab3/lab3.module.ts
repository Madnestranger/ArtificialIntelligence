import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { Lab3RoutingModule } from './lab3-routing.module';
import { Lab3Component } from './lab3.component';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    Lab3RoutingModule
  ],
  declarations: [
    Lab3Component
  ]
})
export class Lab3Module { }
