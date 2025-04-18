import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '@app/services/api.service';
import { CookieStorageService } from '@app/services/cookie_storage/cookie-storage.service';

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
    private apiService: ApiService,
    private cookieService: CookieStorageService
  ) {}

  loading = true;
  error: string | null = null;

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      const error = params['error'];
      if (error) {
        this.router.navigate(['/login'], { queryParams: { error } });
        return;
      }


      this.apiService.authGoogleServiceService.GetDataGoogleCallback().subscribe({
        next: (response: any) => {
          console.log("API Response:", response);
          if (response.success && response.token && response.user) {
            this.cookieService.setCookie("token", response.token, 1);
            this.cookieService.setCookie(
              "user",
              JSON.stringify(response.user),
              1
            );
            this.router.navigate(["/home"]);
          } else {
            this.router.navigate(["/login"], {
              queryParams: { error: response.message || "auth_failed" },
            });
          }
        },
        error: (err) => {
          console.error("API Error:", err);
          this.router.navigate(["/login"], {
            queryParams: { error: "server_error" },
          });
        },
      });
      // Gọi API để lấy dữ liệu
    //   this.apiService.authGoogleServiceService
    //     .GetDataGoogleCallback()
    //     .subscribe({
    //       next: (response: any) => {
    //         if (response.success && response.token) {
    //           this.cookieService.setCookie('token', response.token, 1);
    //           this.cookieService.setCookie(
    //             'user',
    //             JSON.stringify(response.user),
    //             1
    //           ); // line 95 at file:authRoutes in backend to edit value response.user

    //           console.log(
    //             'Token:',
    //             JSON.stringify(this.cookieService.getCookie('token'))
    //           );
    //           console.log(
    //             'User:',
    //             JSON.stringify(this.cookieService.getCookie('user'))
    //           );

    //           this.router.navigate(['/home']);
    //         } else {
    //           this.router.navigate(['/login'], {
    //             queryParams: { error: response.message || 'auth_failed' },
    //           });
    //         }
    //       },
    //       error: (err) => {
    //         this.router.navigate(['/login'], {
    //           queryParams: { error: 'server_error' },
    //         });
    //       },
    //     });
    });
  }
}
