import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Route } from '../core/route.service';
import { extract } from '../core/i18n.service';
import { Lab2Component } from './lab2.component';

const routes: Routes = Route.withShell([
  { path: 'lab2', component: Lab2Component, data: { title: extract('Lab 2') } }
]);

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class Lab2RoutingModule { }
