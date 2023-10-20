import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

interface score {
  description: string;
  value: number;
  date: Date;
}

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.page.html',
  styleUrls: ['./wallet.page.scss'],
})
export class WalletPage implements OnInit {
  balance: number = 20.00;
  statement: score[] = [];

  constructor(private router: Router) { }

  ngOnInit() {;
    this.statement = [
      {
        description: "Compra 1",
        value: 10.00,
        date: new Date()
      },
      {
        description: "Compra 2",
        value: 15.00,
        date: new Date()
      }
    ]
  }

  redeem() {
    this.router.navigate([ '/customer/redeem', this.balance ])
  }

  score() {
    this.router.navigate([ '/customer/score' ])
  }

}
