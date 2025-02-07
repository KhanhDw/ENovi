import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-security',
    templateUrl: './security.component.html',
    styleUrl: './security.component.css',
    standalone: false
})
export class SecurityComponent {
  accountForm: FormGroup;
  email: string = 'ngothanhphong215@gmail.com'; // Get this from your user data

  constructor(private fb: FormBuilder) {
    this.accountForm = this.fb.group(
      {
        newPassword: ['', [Validators.required, Validators.minLength(8)]], // Add validation as needed
        confirmPassword: ['', Validators.required],
      },
      { validator: this.passwordMatchValidator }
    );
  }

  passwordMatchValidator(form: FormGroup) {
    const newPassword = form.get('newPassword')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;
    return newPassword === confirmPassword ? null : { mismatch: true };
  }

  onSubmit() {
    if (this.accountForm.valid) {
      // Send data to backend API for password update
      console.log(this.accountForm.value);
    }
  }
}
