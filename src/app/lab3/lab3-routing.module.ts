import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Route } from '../core/route.service';
import { extract } from '../core/i18n.service';
import { Lab3Component } from './lab3.component';

const routes: Routes = Route.withShell([
  { path: 'lab3', component: Lab3Component, data: { title: extract('Lab 3') } }
]);

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class Lab3RoutingModule { }
