import { Injectable } from '@angular/core';
import { IToken } from '../../shared/interfaces';

const TOKEN_KEY_ACCESS = 'accessToken';
const TOKEN_KEY_REFRESH = 'refreshToken';
const USER_KEY = 'auth-user';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {

  constructor() { }

  clearSession(): void {
    window.sessionStorage.clear()
  }

  public saveToken(token: IToken): void {
    window.sessionStorage.removeItem(TOKEN_KEY_ACCESS)
    window.sessionStorage.setItem(TOKEN_KEY_ACCESS, token.accessToken)
    window.sessionStorage.removeItem(TOKEN_KEY_REFRESH)
    window.sessionStorage.setItem(TOKEN_KEY_REFRESH, token.refreshToken)
  }

  public getToken(): string | null {
    return window.sessionStorage.getItem(TOKEN_KEY_ACCESS)
  }

  public saveUser(user: any): void {
    window.sessionStorage.removeItem(USER_KEY)
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user))
  }

  public getUser(): any {
    const user = window.sessionStorage.getItem(USER_KEY)
    if (user) {
      return JSON.stringify(user)
    }

    return {}
  }
}
