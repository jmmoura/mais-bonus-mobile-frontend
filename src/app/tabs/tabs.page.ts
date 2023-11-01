import { Component } from '@angular/core';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {
  userRole: string | null | undefined;

  constructor() {

    this.userRole = localStorage.getItem('userRole');

  }

}
