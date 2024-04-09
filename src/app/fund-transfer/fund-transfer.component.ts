import {Component, OnInit} from '@angular/core';
import {LoadermodelService} from "../Services/loadermodel.service";
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
    private loader: LoadermodelService
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
        this.loader.show('Transferring funds...');
        this.apiService.fundTransfer(amount, targetAccountNumber).subscribe(
          (response) => {
            this.loader.hide();
            this.fundTransferForm.reset()
            this._toastService.success(response.msg);
            console.log('Fund transfer successful!', response);
          },
          (error) => {
            this.loader.hide();
            this._toastService.error(error.error);
            console.error('Fund transfer failed:', error);
          }
        );
      }
    }
  }
}
