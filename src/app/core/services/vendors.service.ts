import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_URL } from 'src/app/shared/constants';


const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
@Injectable({
  providedIn: 'root'
})
export class VendorsService {

  constructor( private http: HttpClient ) { }

  getVendorLocations(id: string){
    return this.http.get<any>(`${API_URL}/locations?vendorId=${id}`);
  }

  getVendorDiscounts(id: string){
    return this.http.get<any>(`${API_URL}/discounts?vendorId=${id}`)
  }

  getVendors(): Observable<any> {
    return this.http.get<any>(`${API_URL}/vendors`);
  };

  
  getVendorsById(id: string): Observable<any> {
    return this.http.get<any>(`${API_URL}/vendors/${id}`)
  };

  
  createVendor(vendorFormData: Observable<any>): Observable<any> {
    return this.http.post<any>(`${API_URL}/vendors`, vendorFormData, httpOptions);
  };
}
