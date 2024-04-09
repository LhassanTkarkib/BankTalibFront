import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environment/environment";
import jwt_decode from "jwt-decode";
// @ts-ignore
import {JwtService} from "./jwt.service";

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = environment.apiUrl;

  constructor(
    private http: HttpClient,
    private jwt: JwtService,
  ) {
  }

  // Account API Endpoints

  checkPinCreated(): Observable<any> {

    return this.http.get<any>(`${this.baseUrl}/account/pin/check`);
  }

  createPin(pin: string, password: string): Observable<any> {
    const body = {
      pin: pin,
      password: password
    };
    return this.http.post<any>(`${this.baseUrl}/account/pin/create`, body);
  }

  updatePin(oldPin: string, newPin: string, password: string): Observable<any> {
    const body = {
      oldPin: oldPin,
      newPin: newPin,
      password: password
    };
    return this.http.post<any>(`${this.baseUrl}/account/pin/update`, body);
  }

  withdraw(amount: string): Observable<any> {
    const body = {
      amount: amount,

    };
    const token = this.jwt.getToken()
    let decodedToken: any;
    if (token) {
      decodedToken = jwt_decode(token);
    }

    return this.http.post<any>(`${this.baseUrl}/transactions/withdraw/${decodedToken.accountNumber}`, body);
  }

  deposit(amount: string): Observable<any> {
    const body = {
      amount: amount,
    };
    const token = this.jwt.getToken()
    let decodedToken: any;
    if (token) {
      decodedToken = jwt_decode(token);
    }

    return this.http.post<any>(`${this.baseUrl}/transactions/deposit/${decodedToken.accountNumber}`, body);
  }

  fundTransfer(amount: string,targetAccountNumber: number ): Observable<any> {
    const body = {
      amount: amount,
      targetAccountNumber: targetAccountNumber
    };
    const token = this.jwt.getToken()
    let decodedToken: any;
    if (token) {
      decodedToken = jwt_decode(token);
    }
    return this.http.post<any>(`${this.baseUrl}/transactions/transfer/${decodedToken.accountNumber}`, body);
  }

  getTransactions(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/account/transactions`);
  }

  getAccountDetails(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/dashboard/account`);
  }
}
