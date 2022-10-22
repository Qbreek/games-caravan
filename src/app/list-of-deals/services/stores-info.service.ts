import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StoresInfoService {
  constructor(private http: HttpClient) {}

  public getStoresInfo() {
    return this.http.get('https://www.cheapshark.com/api/1.0/stores');
  }
}
