import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IDiscount, IFavoritesProfile, IUser } from 'src/app/shared/interfaces';
import { COUPONS_URL, USERS_URL } from 'src/app/shared/constants';
import { FAVORITE_URL } from 'src/app/shared/constants';
import { DISCOUNT_URL } from 'src/app/shared/constants';
import { IDescription } from '../../shared/interfaces';
import { TokenStorageService } from './token-storage.service';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  tokenParsed: any;
  
  constructor(
    private http: HttpClient,
    private tokenStorage: TokenStorageService
  ) {
    let token: any = this.tokenStorage.getToken();
    this.tokenParsed = JSON.parse(atob(token.split('.')[1]));
  }

  getUser(): Observable<IUser> {
    return this.http.get<IUser>(`${USERS_URL}${this.tokenParsed.id}`);
  }
  getFavorite(): Observable<IDiscount[]> {
    return this.http.get<IDiscount[]>(
      `${FAVORITE_URL}/?userId=${this.tokenParsed.id}`
    );
  }
  getCoupons(): Observable<IFavoritesProfile[]> {
    return this.http.get<IFavoritesProfile[]>(
      `${COUPONS_URL}?userId=${this.tokenParsed.id}`
    );
  }
}
