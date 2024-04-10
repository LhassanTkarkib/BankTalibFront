import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';

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
      dueDate: ['', Validators.required],
      paid: [false],
      payers: this.fb.array([])  // Add this line
    });
  }

  addPayer(event: MatChipInputEvent) {
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
