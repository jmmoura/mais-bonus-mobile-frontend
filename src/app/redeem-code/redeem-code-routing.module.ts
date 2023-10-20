import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RedeemCodePage } from './redeem-code.page';

const routes: Routes = [
  {
    path: '',
    component: RedeemCodePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RedeemCodePageRoutingModule {}
