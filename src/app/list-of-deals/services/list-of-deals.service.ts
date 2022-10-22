import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, tap } from 'rxjs';
import { ListOfDealsItem } from '../models/list-of-deals-item.model';

@Injectable({
  providedIn: 'root',
})
export class ListOfDealsService {
  public totalPages = 0;

  constructor(private http: HttpClient) {}

  public getListOfDeals(pageNumber: number) {
    return this.http
      .get<ListOfDealsItem[]>(
        `https://www.cheapshark.com/api/1.0/deals?storeID=1&pageNumber=${pageNumber}`,
        { observe: 'response' }
      )
      .pipe(map((res) => res.body));
  }
}
