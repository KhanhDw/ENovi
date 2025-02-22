import { Component, OnInit, NgZone } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '@app/services/api.service';

@Component({
  selector: 'app-reset-password',
  standalone: false,
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css',
})
export class ResetPasswordComponent implements OnInit {
  resetToken: string | null = null;
  formResetPassword = { password: '', confirmPassword: '', email: '' };
  email: string | null = null;
  response: any;

showNotification: boolean = false;

  showPassword: boolean = false;

  PassordType: string = 'password';

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
    if (!this.showPassword) this.PassordType = 'password';
    else this.PassordType = 'text';
  }

  onSubmitResetPassword() {
    if (
      this.formResetPassword.password !== this.formResetPassword.confirmPassword
    ) {
      this.response = { message: 'Mật khẩu không khớp' };
      return;
    }else if (this.formResetPassword.password === '' || this.formResetPassword.confirmPassword === '') {
      return;
    }

    if (!this.resetToken) {
      this.response = { message: 'Token không hợp lệ' };
      return;
    }

    this.showNotification = true;

    this.apiService.resetPasswordService
      .submitResetPassword(
        this.resetToken,
        this.formResetPassword.confirmPassword,
        this.email!
      )
      .subscribe({
        next: (res) => {
          if (res.success) {
            this.response = { message: res.message };
            setTimeout(() => {
              this.ngZone.run(() => this.router.navigate(['/login']));
            }, 2000);
          } else {
            this.response = { message: res.message };
          }
        },
        error: (err) => {
          this.response = { message: err.error.message || 'Có lỗi xảy ra!' };
        },
      });
  }
}
