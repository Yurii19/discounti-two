import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IDiscount } from 'src/app/shared/interfaces';
import { API_URL } from '../../shared/constants';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class DiscountService {
  constructor(private http: HttpClient) {}

  removeDiscountById(discountId: string){
    return this.http.delete(`${API_URL}/discounts/${discountId}`)
  }

  getDiscountById(discountId: string): Observable<any> {
    return this.http.get(`${API_URL}/discounts/${discountId}`);
  }

  getDiscounts(): Observable<IDiscount[]> {
    return this.http.get<IDiscount[]>(`${API_URL}/discounts`);
  }

  createDiscount(discount: any): Observable<any> {
    return this.http.post<IDiscount>(
      `${API_URL}/discounts`,
      discount,
      httpOptions
    );
  }

  updateDiscount(discount: any, discountId: string): Observable<any> {
    return this.http.put<IDiscount>(
      `${API_URL}/discounts/${discountId}`,
      discount,
      httpOptions
    );
  }
}
