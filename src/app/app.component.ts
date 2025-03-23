import { catchError } from 'rxjs/operators';
import {
  Component,
  HostListener,
  Directive,
  OnInit,
  NgZone,
  ChangeDetectorRef,
  ElementRef,
  AfterViewInit,
} from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { CookieStorageService } from '@app/services/cookie_storage/cookie-storage.service';
import { ApiService } from '@app/services/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  standalone: false,
})
export class AppComponent implements OnInit, AfterViewInit {
  constructor(
    private router: Router,
    private cookieService: CookieStorageService,
    private cdr: ChangeDetectorRef,
    private ngZone: NgZone,
    private apiService: ApiService,
    private elementRef: ElementRef
  ) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // Kiểm tra nếu route hiện tại là 'login' hoặc 'register'
        this.hiddenHeader = !(
          event.url === '/login' ||
          event.url === '/register' ||
          event.url === '/lecture' ||
          event.url === '/user' ||
          event.url === '/forgot-password' ||
          event.url.includes('/reset-password') ||
          event.url === '/admin' ||
          event.url === '/admin/courses' ||
          event.url === '/admin/user' ||
          event.url === '/admin/revenue' ||
          event.url === '/admin/pay' ||
          event.url === '/user/courses-instructor' ||
          event.url === '/user/basic-information' ||
          event.url === '/user/photo' ||
          event.url === '/user/delete-account' ||
          event.url === '/user/profile' ||
          event.url === '/user/security' ||
          event.url === '/user/instructor' ||
          event.url === '/user/instructor/revenue' ||
          event.url === '/user/instructor/register' ||
          event.url === '/user/instructor/ratting' ||
          event.url === '/user/instructor/courses-instructor' ||
          event.url.includes('/user/instructor/courses-instructor/update')  ||
          event.url === '/user/instructor/courses-instructor/new' ||
          event.url === '/user/instructor/message' ||
          event.url === '/user/instructor/basic-information' ||
          event.url === '/user/instructor/photo' ||
          event.url === '/user/instructor/payments/transfer' ||
          event.url === '/user/instructor/payments' ||
          event.url === '/user/edit-information' ||
          event.url === '/user/basic-information' ||
          event.url === '/user/edit-information/photo' ||
          event.url === '/user/edit-information/basic-information' ||
          event.url === '/user/instructor/profile' ||
          event.url === '/user/payments/recive' ||
          event.url === '/course/lecture' ||
          event.url ===
            '/user/instructor/profile/updateInfo/basic-information' ||
          event.url === '/admin/courses/detail' ||
          event.url === '/admin/categories' ||
          event.url === '/user/purchase-history'
        );
        this.hiddenFooter = !(
          event.url === '/login' ||
          event.url === '/payment' ||
          event.url === '/register' ||
          event.url === '/reset-password' ||
          event.url.includes('/reset-password') ||
          event.url === '/lecture' ||
          event.url === '/user' ||
          event.url === '/admin' ||
          event.url === '/admin/courses' ||
          event.url === '/admin/user' ||
          event.url ===
            '/user/instructor/profile/updateInfo/basic-information' ||
          event.url === '/admin/revenue' ||
          event.url === '/admin/pay' ||
          event.url === '/user/courses-instructor' ||
          event.url === '/user/basic-information' ||
          event.url === '/user/photo' ||
          event.url === '/user/delete-account' ||
          event.url === '/user/profile' ||
          event.url.includes('/user/security') ||
          event.url === '/user/instructor' ||
          event.url === '/user/instructor/register' ||
          event.url === '/user/instructor/revenue' ||
          event.url === '/user/instructor/ratting' ||
          event.url.includes('/user/instructor/courses-instructor/update') ||
          event.url === '/user/instructor/courses-instructor/new' ||
          event.url === '/user/instructor/courses-instructor' ||
          event.url === '/user/instructor/message' ||
          event.url === '/user/instructor/basic-information' ||
          event.url === '/user/instructor/photo' ||
          event.url === '/user/instructor/payments/transfer' ||
          event.url === '/user/instructor/payments' ||
          event.url === '/user/edit-information' ||
          event.url === '/user/basic-information' ||
          event.url === '/user/edit-information/photo' ||
          event.url === '/user/edit-information/basic-information' ||
          event.url === '/user/instructor/profile' ||
          event.url === '/user/payments/recive' ||
          event.url === '/course/lecture' ||
          event.url === '/admin/courses/detail' ||
          event.url === '/admin/categories' ||
          event.url === '/user/purchase-history'
        );
      }
    });
  }

  ngAfterViewInit(): void {
    this.cdr.detectChanges(); // Cập nhật lại vòng kiểm tra
    const allCookies = this.cookieService.getAllCookieNames();
    console.log('Cookies lúc khởi chạy:', allCookies);

    this.ngZone.runOutsideAngular(() => {
      setInterval(() => {
        this.ngZone.run(() => {
          this.updateInforUser();
         
        });
      }, 500);
    });
  }

  updateInforUser(): void {
    const userString = this.cookieService.getCookie('user');
    if (userString) {
    }
  }

  ngOnInit(): void {
    if (
      this.cookieService.getCookie('categories') === undefined ||
      this.cookieService.getCookie('categories') === null
    ) {
      this.getCaterogyAPI();
    }
  }

  getCaterogyAPI() {
    this.apiService.categoriesServiceService.GetCategoryAPI().subscribe({
      next: (res) => {
        if (res?.success) {
          console.log('categories:', res.categories);
          console.log('categoriesV1:', res.categoriesV1);
          console.log('categoriesV2:', res.categoriesV2);

          this.cookieService.setCookie(
            'categories',
            res.categories ? JSON.stringify(res.categories) : '[]'
          );
          this.cookieService.setCookie(
            'categoriesV1',
            res.categoriesV1 ? JSON.stringify(res.categoriesV1) : '[]'
          );
          this.cookieService.setCookie(
            'categoriesV2',
            res.categoriesV2 ? JSON.stringify(res.categoriesV2) : '[]'
          );
        } else {
          console.log('Lỗi khi server trả dữ liệu về:');
        }
      },
      error: (err) => {
        // console.error('Lỗi khi gửi yêu cầu:', err);
      },
    });
  }

  title = 'ENovi';

  hiddenHeader: boolean = true;
  hiddenFooter: boolean = true;

  // Chặn chuột phải
  @HostListener('contextmenu', ['$event'])
  onRightClick(event: MouseEvent) {
    event.preventDefault();
  }

  // chặn người dùng mở devtool - thành công
  // @HostListener('document:keydown', ['$event'])
  // handleKeyboardEvent(event: KeyboardEvent): boolean {
  //   // Chặn F12
  //   if (event.key === 'F12') {
  //     event.preventDefault();
  //     return false;
  //   }

  //   // Chặn Ctrl+Shift+I (Inspect Element) hoặc Ctrl+Shift+J (Console)
  //   if (event.ctrlKey && event.shiftKey && (event.key === 'I' || event.key === 'J')) {
  //     event.preventDefault();
  //     return false;
  //   }

  //   // Chặn Ctrl+U (View Source) - tùy chọn
  //   if (event.ctrlKey && event.key === 'U') {
  //     event.preventDefault();
  //     return false;
  //   }

  //   return true;
  // }

 
}
