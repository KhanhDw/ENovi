import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGoogleServiceService {
  private apiUrl!: string;

  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  setApiUrl(apiUrl: string) {
    this.apiUrl = apiUrl;
  }

  authGoogle() {
    window.location.href = `${this.apiUrl}/google`;
  }

  // Kiểm tra người dùng đã đăng nhập chưa
  isLoggedIn(): boolean {
    return !!localStorage.getItem('auth_token');
  }

  // Lấy token từ localStorage
  getAuthToken(): string | null {
    return localStorage.getItem('auth_token');
  }

  // Đăng xuất
  logoutGoogle(): Observable<any> {
    // Gọi API logout từ backend (nếu cần)
    return this.http.get(`${this.apiUrl}/auth/logout`).pipe(
      tap(() => {
        // Xóa tất cả thông tin liên quan đến đăng nhập
        localStorage.removeItem('auth_token');
        localStorage.removeItem('login_method');
        localStorage.removeItem('user_info'); // nếu có lưu thông tin user

        // Chuyển hướng về trang đăng nhập
        this.router.navigate(['/home']);
      })
    );
  }

  // Đăng xuất local - sử dụng khi không cần gọi API backend
  logoutLocal(): void {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('login_method');
    localStorage.removeItem('user_info'); // nếu có lưu thông tin user

    // Chuyển hướng về trang đăng nhập
    this.router.navigate(['/home']);
  }
}
