import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Company } from './../../model/Company';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  private readonly BASE_URL = environment.baseUrl;
  private readonly API_URL = '/api/v1/company';

  constructor(private httpClient: HttpClient) { }

  list() {
    return this.httpClient.get<Company[]>(this.BASE_URL + this.API_URL);
  }

  save(record: Partial<Company>) {
    if (record.id) {
      return this.update(record);
    } else {
      return this.create(record);
    }
  }

  private create(record: Partial<Company>) {
    return this.httpClient.post<Company>(this.BASE_URL + this.API_URL + '/sign-up', record);
  }

  private update(record: Partial<Company>) {
    return this.httpClient.put<Company>(this.BASE_URL + this.API_URL, record);
  }

}

