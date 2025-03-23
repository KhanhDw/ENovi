import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap, catchError, finalize } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { CookieStorageService } from '@app/services/cookie_storage/cookie-storage.service';

interface AuthResponse {
  success: boolean;
  message: string;
  token: string;
  user: {
    id: string;
    googleId: string;
    name: string;
    email: string;
    picture: string;
  };
  isNewUser: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class AuthGoogleServiceService {
  private apiUrl!: string;

  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    private cookieService: CookieStorageService
  ) {}

  setApiUrl(apiUrl: string) {
    this.apiUrl = apiUrl;
  }

  authGoogle() {
    window.location.href = `${this.apiUrl}/google`;
  }

  GetDataGoogleCallback(): Observable<any> {
    return this.http.get(`${this.apiUrl}/google/data`, {
      withCredentials: true, // Để gửi cookie/session nếu cần
    });
  }

  saveAuthData(response: AuthResponse) {
    this.cookieService.setCookie('token', response.token);
    this.cookieService.setCookie('user', JSON.stringify(response.user)); // line 95 at file:authRoutes in backend to edit value response.user
  }

  isLoggedIn(): boolean {
    return !!this.cookieService.getCookie('token');
  }

  getUser() {
    const user = this.cookieService.getCookie('user');
    return user ? JSON.parse(user) : null;
  }

  // Đăng xuất
  logoutGoogle(): Observable<any> {
    return this.http.post(`${this.apiUrl}/logout`, {}).pipe(
      tap(() => {
        // ✅ Xóa cookie (Chỉ hiệu quả nếu có quyền xóa)
        this.deleteAllCookies();

        // ✅ Chuyển hướng về trang đăng nhập hoặc trang chủ
        this.router.navigate(['/home']);
      }),
      catchError((error) => {
        console.error('Logout failed:', error);
        return throwError(() => error);
      }),
      finalize(() => {
        console.log('Logout process completed');
      })
    );
  }

  // Đăng xuất local - sử dụng khi không cần gọi API backend
  logoutLocal(): void {
    // Xóa tất cả cookie chứa thông tin liên quan đến đăng nhập

    // Chuyển hướng về trang đăng nhập
    this.router.navigate(['/home']);
  }

  // ✅ Hàm xóa toàn bộ cookie trên trình duyệt
  deleteAllCookies() {
    document.cookie.split(';').forEach((c) => {
      document.cookie = c
        .replace(/^ +/, '')
        .replace(/=.*/, `=;expires=${new Date().toUTCString()};path=/`);
    });
  }
}
