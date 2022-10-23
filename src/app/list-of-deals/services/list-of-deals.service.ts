import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ListOfDealsItem } from '../models/list-of-deals-item.model';

@Injectable({
  providedIn: 'root',
})
export class ListOfDealsService {
  public totalPages = 0;

  constructor(private http: HttpClient) {}

  public fetchListOfDeals(pageNumber: number, sortBy?: string, desc?: number) {
    const params = {
      pageNumber: pageNumber || 0,
      pageSize: 60,
      sortBy: sortBy || 'Deal Rating',
      desc: desc || 0,
    };
    return this.http.get<ListOfDealsItem[]>(
      `https://www.cheapshark.com/api/1.0/deals`,
      {
        params: params,
      }
    );
  }
}
