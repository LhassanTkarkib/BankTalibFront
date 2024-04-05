import { Injectable } from '@angular/core';
import {environment} from "../../environment/environment";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {tap} from "rxjs/operators";
import jwt_decode from "jwt-decode";


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = environment.apiUrl; // Replace with your actual API base URL
  private authtokenName = environment.tokenName

  constructor(private http: HttpClient, private router: Router) { }


  registerUser(data: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/Auth/register`, data
    );
  }

  getUserDetails(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/dashboard/user`);
  }

  updateUserProfile(payload: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/users/update`, payload);
  }

  login(email: string, password: string): Observable<any> {
    const body = {
      email: email,
      password: password
    };

    console.log(this.isLoggedIn());

      return this.http.post<any>(`${this.baseUrl}/Auth/authenticate`, body);
  }

  isLoggedIn() {
    const token = localStorage.getItem(this.authtokenName);
    if (token) {
      try {
        const decodedToken: any = jwt_decode(token);
        if (decodedToken && decodedToken.exp && decodedToken.exp * 1000 > Date.now()) {
          return true;
        }
      } catch (error) {
        console.error('Error decoding JWT token:', error);
      }
    }
    return false;
  }

  logOutUser() {
    localStorage.removeItem(this.authtokenName)
    this.router.navigate(['/']);
  }
}
