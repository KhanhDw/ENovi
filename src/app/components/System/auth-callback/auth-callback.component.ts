import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '@app/services/api.service';

@Component({
  selector: 'app-auth-callback',
  standalone: false,
  templateUrl: './auth-callback.component.html',
  styleUrl: './auth-callback.component.css',
})
export class AuthCallbackComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private apiService: ApiService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      const token = params['token'];
      const message = params['message'];
      if (token) {
        localStorage.setItem('auth_token', token);

        console.log('token font end: ' + localStorage.getItem('auth_token'));

        if (message) {
          localStorage.setItem('login_method', message);
        }

        // Chuyển hướng đến trang chính
        this.router.navigate(['/home']);
      } else {
        // Xử lý lỗi
        this.router.navigate(['/login'], {
          queryParams: { error: 'auth_failed' },
        });
      }
    });
  }
}
