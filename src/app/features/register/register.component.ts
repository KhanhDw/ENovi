import { ApiService } from '@app/services/api.service';
import { CommonModule } from '@angular/common';
import { NgForm } from '@angular/forms';
import { Component, OnInit, NgZone, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
  standalone: false,
})
export class RegisterComponent {
  @ViewChild('registerForm') registerForm!: NgForm;

  response: { message: string } = { message: '' };
  showNotification: boolean = false;
  countdown: number = 6;
  private countdownInterval: any;

  formRegister = {
    email: '',
    username: '',
    password: '',
    repassword: '',
  };

  // kết nối backend
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private apiService: ApiService,
    private ngZone: NgZone
  ) {}

  loginWithGoogle() {
    this.apiService.authGoogleServiceService.authGoogle(); // Thay thế bằng URL backend của bạn
  }

  registerUser() {
    // Kiểm tra form hợp lệ
    if (this.registerForm.invalid) {
      this.response = { message: 'Vui lòng điền đầy đủ thông tin.' };
      this.showNotification = true;
      this.markAllControlsAsTouched(); // Gọi hàm tự định nghĩa
      return;
    }

    // Kiểm tra mật khẩu khớp nhau
    if (this.formRegister.password !== this.formRegister.repassword) {
      this.response = { message: 'Mật khẩu không khớp.' };
      this.showNotification = true;
      this.markAllControlsAsTouched(); // Đánh dấu để hiển thị lỗi nếu cần
      return;
    }

    // Hiển thị thông báo đang xử lý
    this.response = { message: 'Đang xử lý đăng ký người dùng...' };
    this.showNotification = true;

    // Gọi API server đăng ký người dùng
    this.apiService.registerServiceService
      .registerUserAPI(
        this.formRegister.username,
        this.formRegister.email,
        this.formRegister.password
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
    Object.keys(this.registerForm.controls).forEach((controlName) => {
      this.registerForm.controls[controlName].markAsTouched();
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
