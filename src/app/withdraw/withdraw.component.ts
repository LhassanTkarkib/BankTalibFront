import {Component, OnInit} from '@angular/core';
import {LoadermodelService} from "../Services/loadermodel.service";
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
    private loader: LoadermodelService // Inject the LoaderService here
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

      this.loader.show('Withdrawing...'); // Show the loader before making the API call
      this.apiService.withdraw(amount).subscribe(
        (response) => {
          this.loader.hide(); // Hide the loader on successful withdrawal
          this._toastService.success(response.msg);
          this.withdrawForm.reset()
          console.log('Withdrawal successful!', response);
        },
        (error) => {
          this.loader.hide(); // Hide the loader on withdrawal request failure
          this._toastService.error(error.error);
          console.error('Withdrawal failed:', error);
        }
      );
    }
    this.initWithDrawForm();
  }
}
