import { HTTP_INTERCEPTORS, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable, throwError } from "rxjs";
import { finalize, tap} from 'rxjs/operators';

import { TokenStorageService } from './token-storage.service';
import { NotificationService } from "./notification.service";
import { AuthService } from "./auth.service";
import {NgxSpinnerService} from "ngx-spinner";

const TOKEN_HEADER_KEY = 'Authorization'; // for Spring Boot back-end

// Function for adding token to http request
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  count = 0;
  constructor(private token: TokenStorageService,
              private notification: NotificationService,
              private auth: AuthService,
              private spinner: NgxSpinnerService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.spinner.show();
    this.count++;
    let authReq = req;
    const token = this.token.getToken();

    if (token != null){
      authReq = req.clone({headers: req.headers.set(TOKEN_HEADER_KEY, 'Bearer ' + token)})
      if(authReq.url.startsWith('https://api.github.com/users') ){
        authReq = req;
      }
      if(authReq.url.endsWith('/authenticate/refresh') ){
        const refreshToken = window.sessionStorage.getItem('refreshToken');
        authReq = req.clone({headers: req.headers.set(TOKEN_HEADER_KEY, 'Bearer ' + refreshToken)})
      }
    }
    return next.handle(authReq).pipe ( tap (

      event => {},
      error => {
        let errorMessage = `Error: ${error.error.message}`;
        this.notification.error(errorMessage);
        if(error.status === 401) {
          this.auth.logout();
        }
        return throwError(errorMessage);
      }), finalize(() => {
        this.count--;
        if ( this.count == 0 ) this.spinner.hide ();
      })
    );
  }
}

export const authInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
];
