import { Injectable } from '@angular/core';
i


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = environment.apiUrl; // Replace with your actual API base URL
  private authtokenName = environment.tokenName

  constructor() { }

  registerUser(data: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/users/register`, data);
  }
}
