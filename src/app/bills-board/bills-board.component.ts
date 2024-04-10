import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormArray, FormBuilder, FormGroup, ValidationErrors, Validators} from "@angular/forms";
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatLegacyChipInputEvent} from "@angular/material/legacy-chips";

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
      paid: [false],
      payers: this.fb.array([])  // Add this line
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

  get payers(): FormArray {
    return this.billsForm.get('payers') as FormArray;
  }

  toggleBillsForm(): void {
    this.showBillsForm = !this.showBillsForm;
    if (!this.showBillsForm) {
      this.billsForm.reset();
    }
  }

  onSubmit(): void {
    // Handle form submission here
    console.log(this.billsForm.value);
  }
}
