import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-redeem-code',
  templateUrl: './redeem-code.page.html',
  styleUrls: ['./redeem-code.page.scss'],
})
export class RedeemCodePage implements OnInit {

  code: string = ''

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {

    this.activatedRoute.params.subscribe(params => {
      this.code = params['code'];
    });
  }

  ngOnInit() {
  }

  back() {
    this.router.navigate([ "/tabs/wallet" ]);
  }

}
