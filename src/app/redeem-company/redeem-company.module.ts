import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RedeemCompanyPageRoutingModule } from './redeem-company-routing.module';

import { RedeemCompanyPage } from './redeem-company.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RedeemCompanyPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [RedeemCompanyPage]
})
export class RedeemCompanyPageModule {}
