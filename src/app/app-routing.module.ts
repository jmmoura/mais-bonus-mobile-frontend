import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./sign-in/sign-in.module').then( m => m.SignInPageModule)
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
    loadChildren: () => import('./score/score.module').then( m => m.ScorePageModule)
  },
  {
    path: 'customer/redeem/:balance',
    loadChildren: () => import('./redeem/redeem.module').then( m => m.RedeemPageModule)
  },
  {
    path: 'customer/redeem/code/get',
    loadChildren: () => import('./redeem-code/redeem-code.module').then( m => m.RedeemCodePageModule)
  },
  {
    path: 'company/redeem',
    loadChildren: () => import('./redeem-company/redeem-company.module').then( m => m.RedeemCompanyPageModule)
  }


];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
