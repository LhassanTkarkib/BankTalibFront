import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class JwtService {
  getToken(): string | null {
    const token = localStorage.getItem('authToken');
    return token;
  }

  saveToken(token: string) {
    localStorage.setItem('authToken', token);
  }

  destroyToken() {
    localStorage.removeItem('authToken');
  }

  getRefreshToken(): string | null {
    return localStorage.getItem('authToken');
  }

  saveRefreshToken(token: string) {
    localStorage.setItem('authToken', token);
  }

  destroyRefreshToken() {
    localStorage.removeItem('authToken');
  }
}
