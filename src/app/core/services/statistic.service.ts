import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import {STATISTIC_DISCOUNTS_URL,
        STATISTIC_VENDORS_URL,
        STATISTIC_CATEGORIES_URL} from '../../shared/constants';

@Injectable({
  providedIn: 'root',
})
export class StatisticService {
  constructor(private http: HttpClient) {
  }

  getStatisticVendors(params: any) {
    if (params.sortBy === 'created') {
      return this.http.get<any>(`${STATISTIC_VENDORS_URL}`);
    } else {
      let paramsForRequest = `?sortBy=${params.sortBy}`
        + `&sortDirection=${params.sortDirection}`
        + `&page=${params.page}`;
      return this.http.get<any>(`${STATISTIC_VENDORS_URL}${paramsForRequest}`);
    }
  }

  getStatisticCategories(params: any) {
    if (params.sortBy === 'created') {
      return this.http.get<any>(`${STATISTIC_CATEGORIES_URL}`);
    } else {
      let paramsForRequest = `?sortBy=${params.sortBy}`
        + `&sortDirection=${params.sortDirection}`
        + `&page=${params.page}`;
      return this.http.get<any>(`${STATISTIC_CATEGORIES_URL}${paramsForRequest}`);
    }
  }

  getStatisticDiscounts() {
    return this.http.get<any>(`${STATISTIC_DISCOUNTS_URL}`);
  }
}
