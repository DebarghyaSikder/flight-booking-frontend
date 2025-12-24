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

  // ✅ NEW: decode JWT
  private decodeToken(): any | null {
    const token = this.get();
    if (!token) return null;

    try {
      const payload = token.split('.')[1];
      return JSON.parse(atob(payload));
    } catch {
      return null;
    }
  }

  getRole(): string | null {
    return this.decodeToken()?.role || null;
  }

  getEmail(): string | null {
    return this.decodeToken()?.sub || null;
  }
}
