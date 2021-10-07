import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { COUPONS_URL } from 'src/app/shared/constants';
import { httpOptions } from './description.service';

@Injectable({
  providedIn: 'root',
})
export class NotificationsService {
  constructor(private http: HttpClient) {}

  requestPromo(discountId: string): Observable<any> {
    const response = this.http.post(
      `${COUPONS_URL}?discountId=${discountId}`, httpOptions
    );
    return response;
  }
}

