import { inject } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from './auth.service';

export const authGuard = (
  userRole: string | null = null,
  redirectRoute: string = '',
  isLoginPage:boolean = false
) => {
  return () => {
    const authService = inject(AuthService);
    const router = inject(Router);

    if (isLoginPage) {
      if (!authService.isLoggedIn()) {
        return true;
      } else {
        return redirect();
      }
    }

    if (authService.isLoggedIn()) {
      if (!userRole || authService.hasRole(userRole)) {
        return true;
      } else {
        return redirect();
      }
    }

    return router.parseUrl(redirectRoute);

    function redirect() {
      if (authService.isCompany()) {
        return router.parseUrl('/tabs/cashback');
      } else if (authService.isCustomer()) {
        return router.parseUrl('/tabs/wallet');
      }
      return router.parseUrl('');
    }
  }

};
