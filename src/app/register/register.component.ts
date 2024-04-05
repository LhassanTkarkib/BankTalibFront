import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../Services/auth.service";


function passwordMismatch(controlName: string, matchingControlName: string){

  return (formGroup: FormGroup) => {

    const control = formGroup.controls[controlName];

    const matchingControl = formGroup.controls[matchingControlName];

    if (matchingControl.errors && !matchingControl.errors.passwordMismatch) {

      return;

    }

    if (control.value !== matchingControl.value) {

      matchingControl.setErrors({ passwordMismatch: true });

    } else {
      matchingControl.setErrors(null);
    }

  }

}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{
  registerForm!: FormGroup;
  showRegistrationData = false;
  registrationData: any;
  print  =  console

  constructor(private formBuilder: FormBuilder, private authService: AuthService) { }
  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      username: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        firstname: ['', Validators.required],
      lastname: ['', Validators.required],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', [Validators.required]],
      }, {

        validator: passwordMismatch('password', 'confirmPassword')

      }
    );
  }





  // Convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }

  onSubmit() {
    if (this.registerForm.invalid) {
      return;
    }

    // Call the API service to register the user
    this.authService.registerUser(this.registerForm.value).subscribe(
      (response: any) => {
        // Store the registration data and show it on the page
        this.registrationData = response;
        this.showRegistrationData = true;
      },
      (error: any) => {
        console.error('Registration failed:', error);
      }
    );
  }
}


