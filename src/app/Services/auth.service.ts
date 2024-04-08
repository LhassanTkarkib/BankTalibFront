import {Injectable} from '@angular/core';
import {environment} from "../../environment/environment";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {ToastService} from "angular-toastify";
import {tap} from "rxjs/operators";
import jwt_decode from "jwt-decode";
import { JwtService } from "./jwt.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = environment.apiUrl; // Replace with your actual API base URL

  constructor(
    private http: HttpClient,
    private router: Router,
    private jwt: JwtService,
    private toastService: ToastService
  ) {
  }


  registerUser(data: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/Auth/register`, data
    );
  }

  getUserDetails(): Observable<any> {
    const token = this.jwt.getToken()
    let decodedToken: any;
    if (token) {
      decodedToken = jwt_decode(token);
    }
    return this.http.get<any>(`${this.baseUrl}/users/getUserByUserName/${decodedToken.preferred_username}`);
  }

  updateUserProfile(payload: any): Observable<any> {
    const token = this.jwt.getToken()
    let decodedToken: any;
    if (token) {
      decodedToken = jwt_decode(token);
    }
    return this.http.put<any>(`${this.baseUrl}/Auth/update/${decodedToken.preferred_username}`, payload);
  }

  login(email: string, password: string): Observable<any> {
    const body = {
      email: email,
      password: password
    };
    return this.http.post<any>(`${this.baseUrl}/Auth/authenticate`, body);
  }

  isLoggedIn() {
    const token = this.jwt.getToken()
    if (token) {
      try {
        const decodedToken: any = jwt_decode(token);
        if (decodedToken && decodedToken.exp * 1000 > Date.now()) {
          return true;
        }
      } catch (error) {
        console.error('Error decoding JWT token:', error);
      }
    }
    return false;
  }

  logOutUser() {
    this.jwt.destroyToken();
    this.toastService.warn('Logged Out')
    this.router.navigate(['/']);
  }
}
