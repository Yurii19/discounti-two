import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SEARCH_URL } from 'src/app/shared/constants';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})

export class HeadService {
  constructor(private http: HttpClient) {
  }

  searchDiscount(param: string): Observable<any> {
    return this.http.get(`${SEARCH_URL}?${param}`);
  }
}
