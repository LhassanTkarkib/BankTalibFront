import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormArray, FormBuilder, FormGroup, ValidationErrors, Validators} from "@angular/forms";
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatLegacyChipInputEvent} from "@angular/material/legacy-chips";
import {ApiService} from "../Services/api.service";
import {ToastService} from "angular-toastify";
import {forkJoin} from "rxjs";
import {Router} from "@angular/router";

@Component({
  selector: 'app-bills-board',
  templateUrl: './bills-board.component.html',
  styleUrls: ['./bills-board.component.css']
})
export class BillsBoardComponent implements OnInit {
  billsForm!: FormGroup;
  showBillsForm: boolean = false;
  showMyBills: boolean = false;
  showBillsToPay: boolean = false;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  Mybills: any[] = [];
  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private _toastService: ToastService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.loadMyBills();
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

  toggleBillsForm(): void {
    this.showBillsForm = !this.showBillsForm;
    this.showBillsToPay = false;
    this.showMyBills = false;
    if (!this.showBillsForm) {
      this.billsForm.reset();
      this.removeAllPayers();

    }
  }

  toggleMyBills(): void {
    this.showMyBills = !this.showMyBills;
    this.showBillsToPay = false;
    this.showBillsForm = false;
  }

  toggleBillsToPay(): void {
    this.showBillsToPay = !this.showBillsToPay;
    this.showMyBills = false;
    this.showBillsForm = false;

  }

  futureDateValidator(): (control: AbstractControl) => ValidationErrors | null {
    return (control: AbstractControl): ValidationErrors | null => {
      const controlDate = new Date(control.value);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return controlDate < today ? {'pastDate': {value: control.value}} : null;
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

  onSubmit(): void {
    if (this.billsForm?.valid) {
      const payers = this.billsForm.get('payersAccountNumber')?.value;
      const billData = this.billsForm.value;

      // Calculate the amount per payer
      const amountPerPayer = billData.amount / payers.length;

      const requests = payers.map((payer: any) => {
        // Assign the amount per payer to each payer
        const data = {...billData, amount: amountPerPayer, payersAccountNumber: payer};
        return this.apiService.createBill(data);
      });

      forkJoin(requests).subscribe(
        (responses: any[]) => {
          responses.forEach((response: any, index: number) => {
            this._toastService.success(`Bill for payer ${payers[index]} created successfully}`);
            console.log(`Bill for payer ${payers[index]} created successfully!`, response);
          });
          this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
            this.router.navigate(['/dashboard']);
          });
        },
        (error) => {
          this._toastService.error(error.error || 'Bill creation failed');
          console.error('Bill creation failed:', error);
        }
      );
    }
  }

  loadMyBills(): void {
    this.toggleMyBills();
    this.apiService.getMyBills().subscribe(
      (bills) => {
        this.Mybills = bills;
      },
      (error) => {
        console.error('Error loading bills:', error);
      }
    );
  }

  loadMyBillsToPay(): void {
    this.toggleBillsToPay();
    this.apiService.getBillsToPay().subscribe(
      (bills) => {
        this.Mybills = bills;
      },
      (error) => {
        console.error('Error loading bills:', error);
      }
    );
  }

  getBillsStatus(bills: any): string {
    if (bills.payementStatus === 'UNPAID') {
      return 'NOT-PAID';
    } else if (bills.payementStatus === 'PAID') {
      return 'PAID';
    }
    return 'N/A';
  }

  onPayClick(bill: any) {
    this.apiService.payBill(bill).subscribe(
      (response) => {
        this._toastService.success('Bill paid successfully');
        this.loadMyBillsToPay();
      },
      (error) => {
        this._toastService.error(error.error || 'Bill payment failed');
        console.error('Bill payment failed:', error);
      }
    );

  }
}
