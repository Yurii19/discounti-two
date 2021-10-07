import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';
import { API_URL } from 'src/app/shared/constants';

@Injectable({
  providedIn: 'root',
})
export class FilterService {
  constructor(private http: HttpClient) {}

  requestFilteredData = (param: any) => {
    let reqParam = [];
    if (param.vendors.length) {
      for (const key in param.vendors) {
        const paramString = `vendorId=${param.vendors[key]}`;
        reqParam.push(paramString);
      }
    }

    if (param.categories.length) {
      for (const it of param.categories) {
        const paramString = `categoryId=${it}`;
        reqParam.push(paramString);
      }
    }

    if (param.city) {
      const paramString = `cityId=${param.city}`;
      reqParam.push(paramString);
    }

    if (param.chips.length) {
      for (const it of param.chips) {
        const paramString = `tagId=${it.id}`;
        reqParam.push(paramString);
      }
    }

    const strParam = reqParam.join('&');
    return strParam;
  };

  requestRawData = (): Observable<any> => {
    const response = forkJoin([
      this.http.get(API_URL + '/countries'),
      this.http.get(API_URL + '/categories'),
      this.http.get(API_URL + '/tags'),
      this.http.get(API_URL + '/vendors'),
    ]);
    return response;
  };
}
