import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { Lab4RoutingModule } from './lab4-routing.module';
import { Lab4Component } from './lab4.component';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    Lab4RoutingModule
  ],
  declarations: [
    Lab4Component
  ]
})
export class Lab4Module { }
