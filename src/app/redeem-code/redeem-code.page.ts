import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-redeem-code',
  templateUrl: './redeem-code.page.html',
  styleUrls: ['./redeem-code.page.scss'],
})
export class RedeemCodePage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  back() {
    this.router.navigate([ "/tabs/wallet" ]);
  }

}
