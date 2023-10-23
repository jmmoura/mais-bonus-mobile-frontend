import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ScoreCompanyPageRoutingModule } from './score-company-routing.module';

import { ScoreCompanyPage } from './score-company.page';
import { MaskitoModule } from '@maskito/angular';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ScoreCompanyPageRoutingModule,
    ReactiveFormsModule,
    MaskitoModule
  ],
  declarations: [ScoreCompanyPage]
})
export class ScoreCompanyPageModule {}
