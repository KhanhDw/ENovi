import { NgForm } from '@angular/forms';
import { Component, ViewChild, AfterViewInit, NgZone } from '@angular/core';
import { ApiService } from '@app/services/api.service';
import { CookieStorageService } from '@app/services/cookie_storage/cookie-storage.service';
import { SharedDataService } from '@app/services/share/shared-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-instructor',
  standalone: false,
  templateUrl: './register-instructor.component.html',
  styleUrl: './register-instructor.component.css',
})
export class RegisterInstructorComponent implements AfterViewInit {
  @ViewChild('registerInstructorFrom') registerInstructorFrom!: NgForm;

  aceptTerms: boolean = false;
  role: any;
  idUser: any;

  constructor(
    private apiService: ApiService,
    private cookieStorageService: CookieStorageService,
    private sharedDataService: SharedDataService,
    private router: Router,
    private ngZone: NgZone
  ) {}

  ngAfterViewInit() {
    console.log('Form đã khởi tạo:', this.registerInstructorFrom);
  }

  onSubmit() {
    const userString = this.cookieStorageService.getCookie('user');
    // console.log(userString);
    if (userString) {
      try {
        const user = JSON.parse(userString);
        this.role = user.role || '';

        this.idUser = user.id || -1;
      } catch (err) {}
    }

    if (this.aceptTerms) {
      this.apiService.userServiceService
        .registerInstructor(this.idUser)
        .subscribe({
          next: (res) => {
            if (res.success) {
              console.log('Thanah công giảng viên');
              // this.sharedDataService.callHeaderMethodLogout(); // thực hiện đăng xuất
              this.cookieStorageService.setCookie(
                'user',
                JSON.stringify(res.userUpdate),
                1
              );
              console.warn(JSON.stringify(res.userUpdate[0]));
              if (this.cookieStorageService.getCookie('user')) {
                setTimeout(() => {
                  this.ngZone.run(() =>
                    this.router.navigate(['/home']).then(() => {
                      window.location.reload();
                    })
                  );
                }, 500);
                console.log('đssdsds');
                window.location.href = res.redictUrl;
              }
            }
          },
          error: (err) => {
            console.log('Thanah công giảng viên', err);
          },
        });
    } else {
      console.log('Bạn cần đồng ý với điều khoản.');
    }
  }
}
