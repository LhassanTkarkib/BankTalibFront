import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormArray, FormBuilder, FormGroup, ValidationErrors, Validators} from "@angular/forms";
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatLegacyChipInputEvent} from "@angular/material/legacy-chips";
import {ApiService} from "../Services/api.service";
import {ToastService} from "angular-toastify";
import {forkJoin} from "rxjs";

@Component({
  selector: 'app-bills-board',
  templateUrl: './bills-board.component.html',
  styleUrls: ['./bills-board.component.css']
})
export class BillsBoardComponent implements OnInit {
  billsForm!: FormGroup;
  showBillsForm: boolean = false;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private _toastService: ToastService,
) {
  }

  ngOnInit(): void {
    this.billsForm = this.fb.group({
      billName: ['', Validators.required],
      amount: ['', Validators.required],
      dueDate: ['', {
        validators: [Validators.required, this.futureDateValidator()],
        updateOn: 'blur'
      }],
      payementStatus: ['UNPAID', Validators.required],
      payersAccountNumber: this.fb.array([])  // Add this line
    });
  }

  futureDateValidator(): (control: AbstractControl) => ValidationErrors | null {
    return (control: AbstractControl): ValidationErrors | null => {
      const controlDate = new Date(control.value);
      const today = new Date();
      today.setHours(0, 0, 0, 0); // Remove time component of today's date
      return controlDate < today ? { 'pastDate': {value: control.value} } : null;
    };
  }
  addPayer(event: MatLegacyChipInputEvent) {
    const input = event.input;
    const value = event.value;

    // Add payer
    if ((value || '').trim()) {
      this.payers.push(this.fb.control(value.trim()));
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  removePayer(index: number): void {
    this.payers.removeAt(index);
  }

  removeAllPayers(): void {
    this.payers.clear();
  }

  get payers(): FormArray {
    return this.billsForm.get('payersAccountNumber') as FormArray;
  }

  toggleBillsForm(): void {
    this.showBillsForm = !this.showBillsForm;
    if (!this.showBillsForm) {
      this.billsForm.reset();
      this.removeAllPayers();
    }
  }
  onSubmit(): void {
    if (this.billsForm?.valid) {
      const payers = this.billsForm.get('payersAccountNumber')?.value;
      const billData = this.billsForm.value;

      const requests = payers.map((payer: any) => {
        // Clone the bill data and replace the payersAccountNumber with the current payer
        const data = { ...billData, payersAccountNumber: payer };
        return this.apiService.createBill(data);
      });

      forkJoin(requests).subscribe(
        (responses: any[]) => {
          // Handle successful bill creation if needed
          responses.forEach((response: any, index: number) => {
            this._toastService.success(`Bill for payer ${payers[index]} created successfully}`);
            console.log(`Bill for payer ${payers[index]} created successfully!`, response);
          });
        },
        (error) => {
          // Handle error if the bill creation request fails
          this._toastService.error(error.error || 'Bill creation failed');
          console.error('Bill creation failed:', error);
        }
      );
    }
  }
}
