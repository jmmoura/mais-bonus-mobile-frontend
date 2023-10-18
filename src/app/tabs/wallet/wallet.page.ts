import { Component, OnInit } from '@angular/core';

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
  statement: score[] = [];

  constructor() { }

  ngOnInit() {
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

  }

  score() {

  }

}
