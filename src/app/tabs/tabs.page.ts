import { Component } from '@angular/core';

import { AuthService } from '../service/authentication/auth.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {
  userRole: string | null | undefined;

  constructor(private authService: AuthService) {

    this.userRole = this.authService.userRole;

  }

}
