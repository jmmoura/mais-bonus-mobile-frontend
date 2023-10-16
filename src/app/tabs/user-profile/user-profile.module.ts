import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserProfilePage } from './user-profile.page';

import { MaskitoModule } from '@maskito/angular';

import { ExploreContainerComponentModule } from '../../containers/explore-container/explore-container.module';
import { UserProfilePageRoutingModule } from './user-profile-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    UserProfilePageRoutingModule,
    ReactiveFormsModule,
    MaskitoModule
  ],
  declarations: [UserProfilePage]
})
export class UserProfilePageModule {}
