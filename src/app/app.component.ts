import { Component, HostListener } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
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
          event.url === '/lecture'
        );
        this.hiddenFooter = !(
          event.url === '/login' ||
          event.url === '/register' ||
          event.url === '/lecture' ||
          event.url === '/setting/courses-instructor' ||
          event.url === '/setting/courses-instructor/course-update' ||
          event.url === '/setting/revenue' ||
          event.url === '/setting/message'
        );
      }
    });
  }

  @HostListener('contextmenu', ['$event'])
  onRightClick(event: MouseEvent) {
    event.preventDefault();
  }
}
