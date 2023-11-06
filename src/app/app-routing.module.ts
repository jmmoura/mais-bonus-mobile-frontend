import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { authGuard } from './service/authentication/auth.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./sign-in/sign-in.module').then( m => m.SignInPageModule),
    canActivate: [ authGuard(null, '', true) ]
  },
  {
    path: 'tabs',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'sign-up',
    loadChildren: () => import('./sign-up/sign-up.module').then( m => m.SignUpPageModule)
  },
  {
    path: 'customer/score',
    loadChildren: () => import('./score/score.module').then( m => m.ScorePageModule),
    canActivate: [ authGuard('CUSTOMER') ]
  },
  {
    path: 'customer/redeem/:balance',
    loadChildren: () => import('./redeem/redeem.module').then( m => m.RedeemPageModule),
    canActivate: [ authGuard('CUSTOMER') ]
  },
  {
    path: 'customer/redeem/get/code/:code',
    loadChildren: () => import('./redeem-code/redeem-code.module').then( m => m.RedeemCodePageModule),
    canActivate: [ authGuard('CUSTOMER') ]
  },
  {
    path: 'company/redeem',
    loadChildren: () => import('./redeem-company/redeem-company.module').then( m => m.RedeemCompanyPageModule),
    canActivate: [ authGuard('COMPANY') ]
  },
  {
    path: 'company/score',
    loadChildren: () => import('./score-company/score-company.module').then( m => m.ScoreCompanyPageModule),
    canActivate: [ authGuard('COMPANY') ]
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
