import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cashback',
  templateUrl: './cashback.page.html',
  styleUrls: ['./cashback.page.scss'],
})
export class CashbackPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  redeemClientScore() {
    this.router.navigate([ 'company/redeem' ]);
  }

  scoreClient() {

  }

}
