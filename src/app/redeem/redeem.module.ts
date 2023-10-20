import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RedeemPageRoutingModule } from './redeem-routing.module';

import { RedeemPage } from './redeem.page';
import { MaskitoModule } from '@maskito/angular';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RedeemPageRoutingModule,
    MaskitoModule,
    ReactiveFormsModule
  ],
  declarations: [RedeemPage]
})
export class RedeemPageModule {}
