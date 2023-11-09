import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Score } from 'src/app/model/Score';
import { AuthService } from 'src/app/service/authentication/auth.service';
import { ScoringService } from './../../service/scoring/scoring.service';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.page.html',
  styleUrls: ['./wallet.page.scss'],
})
export class WalletPage implements OnInit, OnDestroy {

  balance: number = 0;
  statement: Score[] = [];
  statementLoaded: boolean = false;

  constructor(
    private router: Router,
    private scoringService: ScoringService,
    private authService: AuthService
  ) { }

  ngOnInit() {
  }

  @HostListener('unloaded')
  ngOnDestroy() {
    console.log('Items destroyed');
  }

  ionViewWillEnter() {

    const companyIdStr = localStorage.getItem('companyId');
    const companyId = companyIdStr ? Number.parseInt(companyIdStr) : null;
    this.scoringService.list(companyId).subscribe(result => {
      this.statement = result.sort((a, b) => Number(new Date(b.timestamp || '')) - Number(new Date(a.timestamp || '')) );
      this.statementLoaded = true;
      this.balance = result.reduce((acc, current) => { return acc + current.cashbackAmount }, 0)
    });

  }

  redeem() {
    this.router.navigate([ '/customer/redeem', this.balance ]);
  }

  score() {
    this.router.navigate([ '/customer/score' ]);
  }

  logout() {
    this.authService.logout();
    this.router.navigate([ '' ]);
  }

}
