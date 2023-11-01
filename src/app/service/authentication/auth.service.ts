import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
// import * as moment from "moment";

import { Authentication } from 'src/app/model/Authentication';
import { User } from 'src/app/model/User';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly API_URL = 'api/v1/sign-in';
  private _userRole: string = '';

  constructor(private httpClient: HttpClient) {
  }

  public get userRole(): string {
    return this._userRole;
  }
  public set userRole(value: string) {
    this._userRole = value;
  }

  login(user: User) {
    return this.httpClient.post<Authentication>(this.API_URL, user);
  }

  logout() {
      localStorage.removeItem('token');
      // localStorage.removeItem("expires_at");
  }


  // public isLoggedIn() {
  //     return moment().isBefore(this.getExpiration());
  // }

  // isLoggedOut() {
  //     return !this.isLoggedIn();
  // }

  // getExpiration() {
  //     const expiration = localStorage.getItem("expires_at");
  //     const expiresAt = JSON.parse(expiration);
  //     return moment(expiresAt);
  // }
}
