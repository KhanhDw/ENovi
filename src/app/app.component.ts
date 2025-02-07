import { Component, HostListener, Directive } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  standalone: false,
})
export class AppComponent {
  title = 'ENovi';

  hiddenHeader: boolean = true;
  hiddenFooter: boolean = true;

  constructor(private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // Kiểm tra nếu route hiện tại là 'login' hoặc 'register'
        this.hiddenHeader = !(
          event.url === '/login' ||
          event.url === '/register' ||
          event.url === '/lecture' ||
          event.url === '/user' ||
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
          event.url === '/user/instructor/ratting' ||
          event.url === '/user/instructor/courses-instructor' ||
          event.url === '/user/instructor/courses-instructor/course-update' ||
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
          event.url === '/user/purchase-history'
        );
        this.hiddenFooter = !(
          event.url === '/login' ||
          event.url === '/register' ||
          event.url === '/lecture' ||
          event.url === '/user' ||
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
          event.url === '/user/instructor/ratting' ||
          event.url === '/user/instructor/courses-instructor/course-update' ||
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
          event.url === '/user/purchase-history'
        );
      }
    });
  }

  // Chặn chuột phải
  @HostListener('contextmenu', ['$event'])
  onRightClick(event: MouseEvent) {
    event.preventDefault();
  }

  // Chặn các phím tắt mở DevTools
  @HostListener('document:keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    // Chặn các phím tắt mở DevTools
    if (
      event.keyCode === 123 || // F12
      (event.ctrlKey && event.shiftKey && event.keyCode === 73) || // Ctrl + Shift + I
      (event.ctrlKey && event.shiftKey && event.keyCode === 74) || // Ctrl + Shift + J
      (event.ctrlKey && event.keyCode === 85) // Ctrl + U
    ) {
      // event.preventDefault();
      // alert('DevTools is blocked!');
    }
  }
}
