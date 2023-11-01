import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-score',
  templateUrl: './score.page.html',
  styleUrls: ['./score.page.scss'],
})
export class ScorePage implements OnInit {

  customerPersonalId: string | null = null;

  constructor(private router: Router) { }

  ngOnInit() {
    this.customerPersonalId = localStorage.getItem('customerPersonalId');
  }

  back() {
    this.router.navigate([ '/tabs/wallet' ]);
  }

}
