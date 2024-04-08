import {Component, OnInit} from '@angular/core';
import {AuthService} from "../Services/auth.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  userProfile: any;
  getForm!: FormGroup;
  updateForm!: FormGroup;
  showUpdateForm: boolean = false;

  constructor(private authService: AuthService, private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.getUserProfileData();
    this.getForm = this.fb.group({
      name: ['', Validators.required],
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
    });

    this.updateForm = this.fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],

    });
  }

  getUserProfileData(): void {
    this.authService.getUserDetails().subscribe(
      (data) => {
        this.userProfile = data;
        this.getForm.patchValue(data);
      },
      (error) => {
        console.error('Error fetching user profile data:', error);
      }
    );
  }

  toggleUpdateForm(): void {
    this.updateForm.patchValue(this.userProfile);
    this.showUpdateForm = !this.showUpdateForm;
  }

  updateProfile(): void {

    console.log(this.updateForm.value);

    this.authService.updateUserProfile(this.updateForm.value).subscribe(
      (data) => {
        this.userProfile = data;
        console.log('Profile updated successfully:', data);
        this.showUpdateForm = false;
      },
      (error) => {
        console.error('Error updating user profile:', error);
      }
    );
  }
}

