import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RedeemCodePageRoutingModule } from './redeem-code-routing.module';

import { RedeemCodePage } from './redeem-code.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RedeemCodePageRoutingModule
  ],
  declarations: [RedeemCodePage]
})
export class RedeemCodePageModule {}
