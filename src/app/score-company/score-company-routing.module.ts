import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ScoreCompanyPage } from './score-company.page';

const routes: Routes = [
  {
    path: '',
    component: ScoreCompanyPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ScoreCompanyPageRoutingModule {}
