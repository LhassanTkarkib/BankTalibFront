import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {ToastService} from "angular-toastify";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ApiService} from "../Services/api.service";

@Component({
  selector: 'app-fund-transfer',
  templateUrl: './fund-transfer.component.html',
  styleUrls: ['./fund-transfer.component.css']
})
export class FundTransferComponent implements OnInit {
  fundTransferForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private _toastService: ToastService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.initFundTransferForm();
  }

  initFundTransferForm(): void {
    this.fundTransferForm = this.fb.group({
      amount: ['', [Validators.required, Validators.min(0)]],
      targetAccountNumber: ['', [Validators.required]]
    });
  }
  onSubmit(): void {
    if (this.fundTransferForm?.valid) {
      const amount = this.fundTransferForm.get('amount')?.value;
      const targetAccountNumber = this.fundTransferForm.get('targetAccountNumber')?.value;

      if (amount !== null && targetAccountNumber !== null) {
        this.apiService.fundTransfer(amount, targetAccountNumber).subscribe(
          (response) => {
            this.fundTransferForm.reset()
            this._toastService.success(response.msg);
            console.log('Fund transfer successful!', response);
          },
          (error) => {
            this._toastService.error(error.error);
            console.error('Fund transfer failed:', error);
          }
        );
      }
    }
  }
}
