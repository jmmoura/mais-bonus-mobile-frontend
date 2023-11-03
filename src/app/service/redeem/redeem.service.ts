import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Redeem } from 'src/app/model/Redeem';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RedeemService {

  private readonly BASE_URL = environment.baseUrl;
  private readonly API_URL = '/api/v1/redeem';

  constructor(private httpClient: HttpClient) { }

  find(code: string) {
    const options = code ? { params: new HttpParams().set('code', code) } : {}

    return this.httpClient.get<Redeem>(this.BASE_URL + this.API_URL, options);
  }

  save(record: Partial<Redeem>) {
    return this.httpClient.post<Redeem>(this.BASE_URL + this.API_URL, record);
  }

  withdraw(record: Partial<Redeem>) {
    return this.httpClient.post<Redeem>(this.BASE_URL + this.API_URL + '/withdraw', record);
  }

}
