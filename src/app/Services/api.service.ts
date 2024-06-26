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
    const token = this.jwt.getToken()
    let decodedToken: any;
    if (token) {
      decodedToken = jwt_decode(token);
    }
    return this.http.get<any>(`${this.baseUrl}/transactions/${decodedToken.accountNumber}`);
  }

  createBill(data:any): Observable<any> {
    const token = this.jwt.getToken()
    let decodedToken: any;
    if (token) {
      decodedToken = jwt_decode(token);
    }
    return this.http.post<any>(`${this.baseUrl}/Bills/createBill/${decodedToken.accountNumber}`, data);
  }

  getMyBills(): Observable<any> {
    const token = this.jwt.getToken()
    let decodedToken: any;
    if (token) {
      decodedToken = jwt_decode(token);
    }
    return this.http.get<any>(`${this.baseUrl}/Bills/getBillByAccountNumberInitiated/${decodedToken.accountNumber}`);
  }

  getBillsToPay(): Observable<any> {
    const token = this.jwt.getToken()
    let decodedToken: any;
    if (token) {
      decodedToken = jwt_decode(token);
    }
    return this.http.get<any>(`${this.baseUrl}/Bills/getBillByAccountNumberInvolved/${decodedToken.accountNumber}`);
  }

  payBill(bill:any): Observable<any> {
    const billId=bill.idBill;
    const token = this.jwt.getToken()
    let decodedToken: any;
    if (token) {
      decodedToken = jwt_decode(token);
    }
    return this.http.put<any>(`${this.baseUrl}/Bills/payBill/${billId}/${decodedToken.accountNumber}`,bill);
  }

  getNotifications(): Observable<any> {
    const token = this.jwt.getToken()
    let decodedToken: any;
    if (token) {
      decodedToken = jwt_decode(token);
    }
    return this.http.get<any>(`${this.baseUrl}/Notification/getNotificationByAccountNumber/${decodedToken.accountNumber}`);
  }


}
