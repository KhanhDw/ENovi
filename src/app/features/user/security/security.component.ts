import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '@app/services/api.service'; // Import ApiService

@Component({
    selector: 'app-security',
    templateUrl: './security.component.html',
    styleUrl: './security.component.css',
    standalone: false
})
export class SecurityComponent {
  accountForm: FormGroup;
  email: string = 'ngothanhphong215@gmail.com'; // Get this from your user data
  successMessage: string | null = null;

  constructor(private fb: FormBuilder, private apiService: ApiService) { // Add ApiService
    this.accountForm = this.fb.group(
      {
        newPassword: ['', [Validators.required, Validators.minLength(8)]], // Add validation as needed
        confirmPassword: ['', Validators.required],
      },
      { validator: this.passwordMatchValidator }
    );
  }


  getInstructorId(): number {
    const userInfo = this.apiService.userServiceService.getUserLogin();
    if (!userInfo || userInfo.id === -1) {
      return 0; // Trả về 0 nếu chưa đăng nhập
    }
    return userInfo.id;
  }


  passwordMatchValidator(form: FormGroup) {
    const currPassword = form.get('currPassword')?.value;
    const newPassword = form.get('newPassword')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;
    return newPassword === confirmPassword ? null : { mismatch: true };
  }

 

  changePassword() {
    const userId = this.getInstructorId();

    if (this.accountForm.valid) {
      const { newPassword , currPassword} = this.accountForm.value;
      this.apiService.resetPasswordService.changePassword(userId, currPassword, newPassword).subscribe({
        next: () => {
          this.successMessage = 'Mật khẩu đã được thay đổi thành công!';
          this.accountForm.reset();
        },
        error: (err) => {
          console.error('Error updating password:', err);
        }
      });
    }
  }
}
