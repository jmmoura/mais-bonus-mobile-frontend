import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
// import * as moment from "moment";

import { environment } from './../../../environments/environment';
import { Authentication } from 'src/app/model/Authentication';
import { User } from 'src/app/model/User';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly BASE_URL = environment.baseUrl;
  private readonly API_URL = '/api/v1/sign-in';

  constructor(private httpClient: HttpClient) {
  }

  login(user: User) {
    return this.httpClient.post<Authentication>(this.BASE_URL + this.API_URL, user);
  }

  logout() {
    localStorage.removeItem('companyId');
    localStorage.removeItem('customerId');
    localStorage.removeItem('userRole');
    localStorage.removeItem('customerPersonalId');
    localStorage.removeItem('token');

    // localStorage.removeItem("expires_at");
  }

  isLoggedIn() {
    return localStorage.getItem('token') != null && localStorage.getItem('token') != '';
    // return moment().isBefore(this.getExpiration());
  }

  // isLoggedOut() {
  //     return !this.isLoggedIn();
  // }

  // getExpiration() {
  //     const expiration = localStorage.getItem("expires_at");
  //     const expiresAt = JSON.parse(expiration);
  //     return moment(expiresAt);
  // }

  hasRole(userRole: string) {
    return localStorage.getItem('userRole')?.toUpperCase() == userRole.toUpperCase();
  }

  isCustomer() {
    return this.hasRole('CUSTOMER');
  }

  isCompany() {
    return this.hasRole('COMPANY');
  }

  getCustomerId() {
    return localStorage.getItem('customerId');
  }

  getCompanyId() {
    return localStorage.getItem('companyId');
  }

  getUserRole() {
    return localStorage.getItem('userRole');
  }

}
