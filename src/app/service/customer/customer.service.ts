import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Customer } from '../../model/Customer';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private readonly BASE_URL = environment.baseUrl;
  private readonly API_URL = '/api/v1/customer/sign-up';

  constructor(private httpClient: HttpClient) { }

  save(record: Partial<Customer>) {
    if (record.id) {
      return this.update(record);
    } else {
      return this.create(record);
    }
  }

  private create(record: Partial<Customer>) {
    return this.httpClient.post<Customer>(this.BASE_URL + this.API_URL, record);
  }

  private update(record: Partial<Customer>) {
    return this.httpClient.put<Customer>(this.BASE_URL + this.API_URL, record);
  }

}
