import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';

import { AuthService } from '../service/authentication/auth.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage implements OnInit, OnDestroy {
  userRole: string | null;

  constructor(private authService: AuthService) {
    this.userRole = this.authService.getUserRole();
  }

  ngOnInit(): void {
    this.userRole = this.authService.getUserRole();
  }

  ionViewWillEnter() {
    this.userRole = this.authService.getUserRole();
  }

  @HostListener('unloaded')
  ngOnDestroy() {
    console.log('Items destroyed');
  }

}
