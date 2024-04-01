import { Injectable } from '@angular/core';
import {environment} from "../../environment/environment";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = environment.apiUrl; // Replace with your actual API base URL
  private authtokenName = environment.tokenName

  constructor(private http: HttpClient, private router: Router) { }

  registerUser(data: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/Auth/authenticate`, data);
  }
}
