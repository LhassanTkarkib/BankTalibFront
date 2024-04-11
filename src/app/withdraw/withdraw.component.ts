import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ApiService} from "../Services/api.service";
import {ToastService} from "angular-toastify";
import {Router} from "@angular/router";

@Component({
  selector: 'app-withdraw',
  templateUrl: './withdraw.component.html',
  styleUrls: ['./withdraw.component.css']
})
export class WithdrawComponent  implements OnInit {
  withdrawForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private _toastService: ToastService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.initWithDrawForm();
  }

  initWithDrawForm() {
    this.withdrawForm = this.fb.group({
      amount: ['', [Validators.required, Validators.min(0)]],
    });
  }

  onSubmit(): void {
    if (this.withdrawForm.valid) {
      const amount = this.withdrawForm.get('amount')?.value;

      this.apiService.withdraw(amount).subscribe(
        (response) => {
          this._toastService.success(response.msg);
          this.withdrawForm.reset()
          console.log('Withdrawal successful!', response);
        },
        (error) => {
          this._toastService.error(error.error);
          console.error('Withdrawal failed:', error);
        }
      );
    }
    this.initWithDrawForm();
  }
}
