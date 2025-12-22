import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class TokenService {

  private TOKEN_KEY = 'jwt_token';

  save(token: string) {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  get(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  clear() {
    localStorage.removeItem(this.TOKEN_KEY);
  }

  isLoggedIn(): boolean {
    return !!this.get();
  }
}
