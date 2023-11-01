import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/service/authentication/auth.service';

@Component({
  selector: 'app-cashback',
  templateUrl: './cashback.page.html',
  styleUrls: ['./cashback.page.scss'],
})
export class CashbackPage implements OnInit {

  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit() {
  }

  redeemClientScore() {
    this.router.navigate([ 'company/redeem' ]);
  }

  scoreClient() {
    this.router.navigate([ 'company/score' ]);
  }

  logout() {
    this.authService.logout();
    this.router.navigate([ '' ]);
  }

}
