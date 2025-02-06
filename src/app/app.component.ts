import { Component, HostListener } from '@angular/core';
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
          event.url === '/user/courses-instructor' ||
          event.url === '/user/instructor/basic-information' ||
          event.url === '/user/instructor/photo' ||
          event.url === '/user/courses-instructor/course-update' ||
          event.url === '/user/revenue' ||
          event.url === '/user/message' ||
          event.url === '/user/instructor/basic-information' ||
          event.url === '/user/instructor/photo' ||
          event.url === '/user/instructor' ||
          event.url === '/user/payments' ||
          event.url === '/user/payments/recive' ||
          event.url === '/user/payments/transfer' ||
          event.url === '/user/purchase-history'
        );
        this.hiddenFooter = !(
          event.url === '/login' ||
          event.url === '/register' ||
          event.url === '/lecture' ||
          event.url === '/user' ||
          event.url === '/user/courses-instructor' ||
          event.url === '/user/instructor/basic-information' ||
          event.url === '/user/instructor/photo' ||
          event.url === '/user/courses-instructor/course-update' ||
          event.url === '/user/revenue' ||
          event.url === '/user/message' ||
          event.url === '/user/instructor/basic-information' ||
          event.url === '/user/instructor/photo' ||
          event.url === '/user/instructor' ||
          event.url === '/user/payments' ||
          event.url === '/user/payments/recive' ||
          event.url === '/user/payments/transfer' ||
          event.url === '/user/purchase-history'
        );
      }
    });
  }

  @HostListener('contextmenu', ['$event'])
  onRightClick(event: MouseEvent) {
    event.preventDefault();
  }
}
