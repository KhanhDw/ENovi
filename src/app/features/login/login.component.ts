import { Component, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '@app/services/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  standalone: false,
})
export class LoginComponent {
  response: { message: string } | null = null;

  constructor(
    private apiService: ApiService,
    private ngZone: NgZone,
    private router: Router
  ) {} //import và inject đúng service

  loginWithGoogle() {
    this.apiService.authGoogleServiceService.authGoogle();
  }

  loginWithENovi(email: string, password: string) {
    this.apiService.loginServiceService.loginAPI(email, password).subscribe({
      next: (res) => {
        if (res.success) {
          setTimeout(() => {
            this.ngZone.run(() => this.router.navigate(['/home']));
          }, 500);
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
