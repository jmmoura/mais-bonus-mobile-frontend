import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Score } from 'src/app/model/Score';

@Injectable({
  providedIn: 'root'
})
export class ScoringService {

  private readonly API_URL = 'api/v1/scoring';

  constructor(private httpClient: HttpClient) { }

  list(companyId: number | null) {
    const options = companyId ? { params: new HttpParams().set('companyId', companyId) } : {};

    return this.httpClient.get<Score[]>(this.API_URL, options);
  }

  save(record: Partial<Score>) {
    return this.httpClient.post<Score>(this.API_URL, record);
  }

}
