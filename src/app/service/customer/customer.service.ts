import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Customer } from '../../model/Customer';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private readonly API_URL = 'api/v1/customer/sign-up';

  constructor(private httpClient: HttpClient) { }

  save(record: Partial<Customer>) {
    if (record.id) {
      return this.update(record);
    } else {
      return this.create(record);
    }
  }

  private create(record: Partial<Customer>) {
    return this.httpClient.post<Customer>(this.API_URL, record);
  }

  private update(record: Partial<Customer>) {
    return this.httpClient.put<Customer>(this.API_URL, record);
  }

}
