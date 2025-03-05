import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { isPlatformBrowser } from '@angular/common';
@Injectable({
  providedIn: 'root',
})
export class CookieStorageService {
  constructor(
    private cookieService: CookieService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}
  /**
   * Lưu giá trị cookie với các tùy chọn
   * @param name Tên cookie
   * @param value Giá trị cookie
   * @param days Số ngày sống (mặc định 7)
   * @param path Đường dẫn (mặc định '/')
   */
  setCookie(
    name: string,
    value: string,
    days: number = 7,
    path: string = '/'
  ): void {
    if (isPlatformBrowser(this.platformId)) {
      const date = new Date();
      date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
      const expires = 'expires=' + date.toUTCString();
      const cookieValue = `${name}=${encodeURIComponent(
        value
      )};${expires};path=${path}`;
      document.cookie = cookieValue;
    }
  }

  /**
   * Lấy giá trị cookie theo tên
   * @param name Tên cookie cần lấy
   * @returns Giá trị cookie hoặc null nếu không tồn tại
   */
  getCookie(name: string): string | null {
    const nameEQ = name + '=';
    // Kiểm tra xem có đang chạy ở trình duyệt không
    if (isPlatformBrowser(this.platformId)) {
      const ca = document.cookie.split(';');
      for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0) {
          return decodeURIComponent(c.substring(nameEQ.length, c.length));
        }
      }
      return null;
    }
    // Nếu không phải trình duyệt (ví dụ server), trả về null hoặc giá trị mặc định
    return null;
  }

  /**
   * Xóa cookie theo tên
   * @param name Tên cookie cần xóa
   * @param path Đường dẫn của cookie (mặc định '/')
   */
  removeCookie(name: string, path: string = '/'): void {
    if (isPlatformBrowser(this.platformId)) {
      // Chỉ truy cập document khi chạy trên trình duyệt
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
    } else {
      console.warn('Cannot remove cookie on non-browser platform');
    }
  }

  /**
   * Kiểm tra sự tồn tại của cookie
   * @param name Tên cookie cần kiểm tra
   * @returns true nếu cookie tồn tại, false nếu không
   */
  hasCookie(name: string): boolean {
    return this.getCookie(name) !== null;
  }

  // Phương thức mới: Lấy tất cả cookies
  getAllCookieNames() {
    const cookies = this.cookieService.getAll();
    return cookies;
  }

  // Trong file service hoặc component của bạn
  clearAllCookies() {
    const cookies = document.cookie.split(';');

    for (let cookie of cookies) {
      const eqPos = cookie.indexOf('=');
      const name = eqPos > -1 ? cookie.substr(0, eqPos).trim() : cookie.trim();
      document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
    }
  }

  // Kiểm tra cookie hết hạn
  checkCookieExpired(cookieName: string) {
    const cookieValue = this.cookieService.get(cookieName);
    if (!cookieValue) {
      // console.log('Cookie đã hết hạn hoặc không tồn tại.');
      return true;
    }
    // console.log('Cookie vẫn còn hiệu lực.');
    return false;
  }
}
