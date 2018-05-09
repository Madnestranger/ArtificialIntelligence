import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Route } from '../core/route.service';
import { extract } from '../core/i18n.service';
import { Lab4Component } from './lab4.component';

const routes: Routes = Route.withShell([
  { path: 'lab4', component: Lab4Component, data: { title: extract('Lab 4') } }
]);

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class Lab4RoutingModule { }
