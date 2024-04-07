import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class JwtService {
  getToken(): string | null {
    const token = sessionStorage.getItem('access_token');
    console.log('Retrieved token:', token);
    return token;
  }

  saveToken(token: string) {
    sessionStorage.setItem('access_token', token);
  }

  destroyToken() {
    sessionStorage.removeItem('access_token');
  }

  getRefreshToken(): string | null {
    return sessionStorage.getItem('refresh_token');
  }

  saveRefreshToken(token: string) {
    sessionStorage.setItem('refresh_token', token);
  }

  destroyRefreshToken() {
    sessionStorage.removeItem('refresh_token');
  }
}
