import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RedeemCompanyPage } from './redeem-company.page';

const routes: Routes = [
  {
    path: '',
    component: RedeemCompanyPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RedeemCompanyPageRoutingModule {}
