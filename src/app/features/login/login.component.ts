import { Component, NgZone, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '@app/services/api.service';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { User } from '@app/interface/user';
import { CookieStorageService } from '@app/services/cookie_storage/cookie-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  standalone: false,
})
export class LoginComponent {
  @ViewChild('resetForm') resetForm!: NgForm;
  showNotification: boolean = false;
  response: { message: string } = { message: '' };

  email: string = '';
  password: string = '';
  rememeber: boolean = false;

  formLogin = {
    email: '',
    password: '',
    rememeberPassword: false,
  };

  constructor(
    private apiService: ApiService,
    private ngZone: NgZone,
    private router: Router,
    private cookieService: CookieStorageService
  ) {}



  loginWithGoogle() {
    this.apiService.authGoogleServiceService.authGoogle();
  }

  loginWithENovi() {
    this.email = this.formLogin.email;
    this.password = this.formLogin.password;
    this.rememeber = this.formLogin.rememeberPassword;

    if (this.resetForm.invalid) {
      this.response = { message: 'Vui lòng điền đầy đủ thông tin.' };
      this.showNotification = true;
      return;
    }

    this.apiService.loginServiceService
      .loginAPI(this.email, this.password)
      .subscribe({
        next: (res) => {
          if (res.success) {
            this.cookieService.setCookie('user', JSON.stringify(res.user[0]), 1); // line 95 at file:authRoutes in backend  to edit value response.user
            this.response = { message: res.message };
            this.showNotification = true;

            if (this.cookieService.getCookie('user')) {
              setTimeout(() => {
                this.ngZone.run(() => this.router.navigate(['/home']).then(()=>{window.location.reload();}));
              }, 1000);
            }
          } else {
            this.response = { message: res.message };
            this.showNotification = true;
          }
        },
        error: (err) => {
          this.response = { message: err.error.message || 'Có lỗi xảy ra!' };
        },
      });
    this.showNotification = false;
  }
}
