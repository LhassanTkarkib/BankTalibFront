import { Component, OnInit } from '@angular/core';
import { ToastService } from 'angular-toastify';
import {AuthService} from "../Services/auth.service";

@Component({
  selector: 'app-accountdetailcard',
  templateUrl: './accountdetailcard.component.html',
  styleUrls: ['./accountdetailcard.component.css']
})
export class AccountdetailcardComponent implements OnInit {
  accountDetails: any;

  constructor(private authservice: AuthService , private _toastService: ToastService ) { }

  ngOnInit(): void {
    this.getAccountDetails();
  }

  getAccountDetails(): void {
    this.authservice.getUserDetails().subscribe(
      (data: any) => {
        this.accountDetails = data;
      },
      (error: any) => {
        this._toastService.error("Error fetching account details")
        console.log('Error fetching account details:', error);
      }
    );
  }
}
