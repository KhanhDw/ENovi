import { Component, OnInit, NgZone, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '@app/services/api.service';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';

@Component({
  selector: 'app-reset-password',
  standalone: false,
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css',
})
export class ResetPasswordComponent implements OnInit {
  resetToken: string | null = null;
  @ViewChild('resetForm') resetForm!: NgForm;
  email: string | null = null;
  response: { message: string } = { message: '' };

  formResetPassword = {
    password: '',
    confirmPassword: '',
    newsletter: false,
    email: '',
  };

  PasswordType: string = 'password';
  showPassword: boolean = false;
  showNotification: boolean = false;

  countdown: number = 6;
  private countdownInterval: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private apiService: ApiService,
    private ngZone: NgZone
  ) {}

  ngOnInit() {
    // lắng nghe url và các tham số truyền vào trên url từ backend
    this.resetToken = this.route.snapshot.queryParamMap.get('token');
    this.email = this.route.snapshot.queryParamMap.get('email');
    this.formResetPassword.email = this.email ?? '';
    this.showNotification = false;
  }

  toggleshowPassword() {
    this.showPassword = !this.showPassword;
    this.PasswordType = this.showPassword ? 'text' : 'password';
  }

  onSubmitResetPassword() {
    // Kiểm tra form hợp lệ
    if (this.resetForm.invalid) {
      this.response = { message: 'Vui lòng điền đầy đủ thông tin.' };
      this.showNotification = true;
      this.markAllControlsAsTouched(); // Gọi hàm tự định nghĩa
      return;
    }

    // Kiểm tra mật khẩu khớp nhau
    if (
      this.formResetPassword.password !== this.formResetPassword.confirmPassword
    ) {
      this.response = { message: 'Mật khẩu không khớp.' };
      this.showNotification = true;
      this.markAllControlsAsTouched(); // Đánh dấu để hiển thị lỗi nếu cần
      return;
    }

    // Kiểm tra token
    if (!this.resetToken) {
      this.response = { message: 'Token không hợp lệ.' };
      this.showNotification = true;
      return;
    }

    // Hiển thị thông báo đang xử lý
    this.response = { message: 'Đang xử lý thay đổi mật khẩu...' };
    this.showNotification = true;

    // Gọi API reset password
    this.apiService.resetPasswordService
      .submitResetPassword(
        this.resetToken,
        this.formResetPassword.password,
        this.email!
      )
      .subscribe({
        next: (res) => {
          this.response = { message: res.message };
          this.showNotification = true;
          if (res.success) {
            this.startCountdown();
          }
        },
        error: (err) => {
          this.response = {
            message: err.error?.message || 'Có lỗi xảy ra, vui lòng thử lại!',
          };
          this.showNotification = true;
        },
      });
  }

  // Hàm tự định nghĩa để đánh dấu tất cả controls là touched
  private markAllControlsAsTouched() {
    Object.keys(this.resetForm.controls).forEach((controlName) => {
      this.resetForm.controls[controlName].markAsTouched();
    });
  }

  startCountdown() {
    this.countdown = 6; // Bắt đầu từ 6 giây
    this.countdownInterval = setInterval(() => {
      this.ngZone.run(() => {
        this.countdown--;
        if (this.countdown <= 0) {
          clearInterval(this.countdownInterval);
          this.router.navigate(['/login']);
        }
      });
    }, 1000);
  }

  ngOnDestroy() {
    if (this.countdownInterval) {
      clearInterval(this.countdownInterval);
    }
  }
}
