import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IToken, IUserLogin } from '../../shared/interfaces';
import { TokenStorageService } from './token-storage.service';
import { map } from "rxjs/operators";
import { NotificationService } from "./notification.service";

import {LOGIN_URL, REFRESH_URL} from '../../shared/constants';
import {Router} from "@angular/router";
import {NgxSpinnerService} from "ngx-spinner";

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private refreshTokenTimeout: any;

  constructor( private http: HttpClient,
               private tokenStorage: TokenStorageService,
               private router: Router,
               private spinner: NgxSpinnerService,
               private notification: NotificationService) { }

  login(user: IUserLogin): Observable<IToken> {
    return this.http.post<IToken>(`${LOGIN_URL}`, user, httpOptions)
  }

  logout() {//todo logout clear user data from storage
    this.stopRefreshTokenTimer();
    this.tokenStorage.clearSession();
    // this.userSubject.next(null);
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    return !!this.tokenStorage.getToken()
  }

  updateAccessToken() {
    return this.http.post(REFRESH_URL, null)
      .pipe(map((data: any) => {

        this.stopRefreshTokenTimer();

        if(data.accessToken) {
          let jwtToken: any = {
            accessToken: data.accessToken,
            refreshToken: window.sessionStorage.getItem('refreshToken')
          }
          this.tokenStorage.saveToken(jwtToken);
          this.startRefreshTokenTimer();
        } else {
          this.notification.error(data.message);
          this.logout();
        }
      }));
  }

  startRefreshTokenTimer() {
    let token = this.tokenStorage.getToken();
    if(token) {
      // parse json object from base64 encoded jwt token
      const expiry = (JSON.parse(atob(token.split('.')[1]))).exp;
      // set a timeout to refresh the token a 10 seconds before it expires
      const expires = new Date(expiry * 1000);
      const timeout = expires.getTime() - Date.now() - (10 * 1000);//60 minute or 10 seconds

      this.refreshTokenTimeout = setTimeout(() => {
        this.updateAccessToken().subscribe();
      }, timeout);
    }
  }

  private stopRefreshTokenTimer() {
    clearTimeout(this.refreshTokenTimeout);
  }
}

