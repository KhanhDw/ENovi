import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '@app/services/api.service'; // Import ApiService

@Component({
  selector: 'app-security',
  templateUrl: './security.component.html',
  styleUrl: './security.component.css',
  standalone: false,
})
export class SecurityComponent {
  accountForm: FormGroup;
  email: string = 'ngothanhphong215@gmail.com'; // Get this from your user data
  successMessage: string | null = null;

  constructor(private fb: FormBuilder, private apiService: ApiService) {
    // Add ApiService
    this.accountForm = this.fb.group(
      {
        currPassword: ['', Validators.required],
        newPassword: ['', [Validators.required]],//, Validators.minLength(8)]],
        confirmPassword: ['', Validators.required],
      },
      {
        validators: this.passwordMatchValidator, // Sửa thành `validators`
      }
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
    const newPassword = form.get('newPassword');
    const confirmPassword = form.get('confirmPassword');

    if (newPassword?.value !== confirmPassword?.value) {
      confirmPassword?.setErrors({ mismatch: true });
    } else {
    }
    confirmPassword?.setErrors(null);
  }

  changePassword() {
    console.log('Form Valid:', this.accountForm.valid);
    console.log('Form Errors:', this.accountForm.errors);
    console.log('Form Values:', this.accountForm.value);

    if (!this.accountForm.valid) {
      return; // Nếu form không hợp lệ, không thực hiện tiếp
    }

    const userId = this.getInstructorId();
    const { newPassword, currPassword } = this.accountForm.value;

    this.apiService.resetPasswordService
      .changePassword(userId, currPassword, newPassword)
      .subscribe({
        next: () => {
          this.successMessage = 'Mật khẩu đã được thay đổi thành công!';
          this.accountForm.reset();
        },
        error: (err) => {
          console.error('Error updating password:', err);
        },
      });
  }
}
