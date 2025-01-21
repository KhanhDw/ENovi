import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'ENovi';

  showHeaderAndFooter: boolean = true;

  constructor(private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // Kiểm tra nếu route hiện tại là 'login' hoặc 'register'
        this.showHeaderAndFooter = !(
          event.url === '/login' || event.url === '/register'
        );
      }
    });
  }
}
