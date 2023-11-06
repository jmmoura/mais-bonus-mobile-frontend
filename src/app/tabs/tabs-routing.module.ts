import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';
import { authGuard } from '../service/authentication/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    canActivate: [ authGuard() ],
    children: [
      {
        path: 'wallet',
        loadChildren: () => import('./wallet/wallet.module').then(m => m.WalletPageModule),
        canActivate: [ authGuard('CUSTOMER') ]
      },
      {
        path: 'cashback',
        loadChildren: () => import('./cashback/cashback.module').then(m => m.CashbackPageModule),
        canActivate: [ authGuard('COMPANY') ]
      },
      {
        path: 'discounts',
        loadChildren: () => import('./discounts/discounts/discounts.module').then( m => m.DiscountsPageModule),
        canActivate: [ authGuard() ]
      },
      {
        path: 'user-profile',
        loadChildren: () => import('./user-profile/user-profile.module').then(m => m.UserProfilePageModule),
        canActivate: [ authGuard() ]
      },
      // {
      //   path: '',
      //   redirectTo: '/tabs/tab1',
      //   pathMatch: 'full'
      // }
    ]
  },
  // {
  //   path: '',
  //   redirectTo: '/tabs/tab1',
  //   pathMatch: 'full'
  // }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
