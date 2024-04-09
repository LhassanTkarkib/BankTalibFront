// transaction-history.component.ts

import { Component, OnInit } from '@angular/core';
import jwt_decode from "jwt-decode";
import { environment } from 'src/environment/environment';
import {ApiService} from "../Services/api.service";
import {JwtService} from "../Services/jwt.service";


@Component({
  selector: 'app-transaction-history',
  templateUrl: './transaction-history.component.html',
  styleUrls: ['./transaction-history.component.css']
})
export class TransactionHistoryComponent implements OnInit {
  private authtokenNameName = environment.tokenName;

  transactionHistory: any[] = [];
  userAccountNumber: string | null = null;
  filteredTransactionHistory: any[] = [];
  filterCriteria: string = ''; // Holds the filter criteria selected by the user

  constructor(
    private apiService: ApiService,
    private jwt:JwtService
  ) { }

  ngOnInit(): void {
    this.loadTransactionHistory();
    console.log(this.transactionHistory);
  }
  loadTransactionHistory(): void {
    this.userAccountNumber = this.getAccountNumberFromToken();

    this.apiService.getTransactions().subscribe(
      (data) => {
        this.transactionHistory = data;
        this.filterTransactions();
        console.log(this.transactionHistory); // Now the data will be logged in the console
      },
      (error) => {
        console.error('Error fetching transaction history:', error);
      }
    );
  }

  getTransactionStatus(transaction: any): string {
    if (transaction.typeTransaction === 'CASH_TRANSFER') {
      if (transaction.senderAccountNumber === this.userAccountNumber) {
        return 'Transfer';
      } else if (transaction.receiverAccountNumber === this.userAccountNumber) {
        return 'Credited';
      }
    } else if (transaction.typeTransaction === 'CASH_WITHDRAWAL') {
      return 'Withdraw';
    } else if (transaction.typeTransaction === 'CASH_DEPOSIT') {
      return 'Deposited';
    }
    return 'N/A';
  }

  getAccountNumberFromToken(): string | null {
    const token = this.jwt.getToken();
    if (token) {
      const decodedToken: any = jwt_decode(token);
      return decodedToken.accountNumber;
    }
    return null;
  }

  filterTransactions(): void {
    // Reset the filteredTransactionHistory array
    this.filteredTransactionHistory = this.transactionHistory.slice();

    if (this.filterCriteria === 'Deposit') {
      // Filter transactions for deposits
      this.filteredTransactionHistory = this.filteredTransactionHistory.filter(transaction =>
        transaction.typeTransaction === 'CASH_DEPOSIT'
      );
    } else if (this.filterCriteria === 'Withdrawal') {
      // Filter transactions for withdrawals
      this.filteredTransactionHistory = this.filteredTransactionHistory.filter(transaction =>
        transaction.typeTransaction === 'CASH_WITHDRAWAL'
      );
    } else if (this.filterCriteria === 'Transfer') {
      // Filter transactions for fund transfers
      this.filteredTransactionHistory = this.filteredTransactionHistory.filter(transaction =>
        transaction.typeTransaction === 'CASH_TRANSFER'
      );
    }
  }

  onFilterCriteriaChange(event: any): void {
    this.filterCriteria = event.target.value;
    this.filterTransactions();
  }
}
