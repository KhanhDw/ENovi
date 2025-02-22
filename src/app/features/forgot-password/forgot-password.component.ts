import { Component, NgZone } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '@app/services/api.service';

@Component({
  selector: 'app-forgot-password',
  standalone: false,
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css',
})
export class ForgotPasswordComponent {
  formForgotPassword = {
    email: '',
  };
  response: any;
  showPassword: boolean = false;
  PassordType: string = 'password';
  btnSubmitPost: boolean = false;
  email: string | null = null;

  constructor(
    private apiService: ApiService,
    private ngZone: NgZone,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  toggleshowPassword() {
    this.showPassword = !this.showPassword;
    if (!this.showPassword) this.PassordType = 'password';
    else this.PassordType = 'text';
  }

  togglebtnSubmitPost() {
    this.btnSubmitPost = !this.btnSubmitPost;
  }

  onSubmit() {
    this.email = this.formForgotPassword.email;

    this.apiService.forgotPasswordServiceService
      .SubmitFormPostForgotPassword(this.formForgotPassword)
      .subscribe({
        next: (res) => {
          if (res.success) {
            this.response = res;
            console.log('Phản hồi từ server:', res);
            // Reset form sau khi gửi thành công
            this.formForgotPassword = { email: '' };
            setTimeout(() => {
              this.ngZone.run(() => this.router.navigate(['/login']));
            }, 2000);
          } else {
            this.response = { message: res.message };
          }
        },
        error: (err) => {
          console.error('Lỗi khi gửi dữ liệu:', err);
          this.response = {
            message: 'Đã có lỗi xảy ra! forgot password fontend',
          };
        },
      });
  }
}
