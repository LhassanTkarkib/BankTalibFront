import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environment/environment";

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

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

  withdraw(amount: string, pin: string): Observable<any> {
    const body = {
      amount: amount,
      pin: pin
    };
    return this.http.post<any>(`${this.baseUrl}/account/withdraw`, body);
  }

  deposit(amount: string): Observable<any> {
    const body = {
      amount: amount,
    };
    return this.http.post<any>(`${this.baseUrl}/deposit`, body);
  }

  fundTransfer(amount: string, pin: string, targetAccountNumber: number): Observable<any> {
    const body = {
      amount: amount,
      pin: pin,
      targetAccountNumber: targetAccountNumber
    };
    return this.http.post<any>(`${this.baseUrl}/account/fund-transfer`, body);
  }

  getTransactions(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/account/transactions`);
  }

  getAccountDetails(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/dashboard/account`);
  }
}

