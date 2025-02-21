import { AuthGoogleServiceService } from './auth-google-service.service';
import { ForgotPasswordServiceService } from './forgot-password-service.service';
import { UserServiceService } from './user-service.service';
import { ResetPasswordService } from './reset-password.service';

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
//
@Injectable({
  providedIn: 'root',
})
export class ApiService {
  public API_URL = 'https://localhost:3000';

  constructor(
    private http: HttpClient,
    public authGoogleServiceService: AuthGoogleServiceService,
    public forgotPasswordServiceService: ForgotPasswordServiceService,
    public userServiceService: UserServiceService,
    public resetPasswordService: ResetPasswordService
  ) {
    this.authGoogleServiceService.setApiUrl(`${this.API_URL}/auth`);
    this.forgotPasswordServiceService.setApiUrl(`${this.API_URL}/fopass`);
    this.resetPasswordService.setApiUrl(`${this.API_URL}/repass`);
    this.userServiceService.setApiUrl(`${this.API_URL}/user`);
  }

  getUsers(): Observable<any> {
    return this.http.get(`${this.API_URL}/users/ge`, {
      headers: { Accept: 'application/json' },
      // Option để bỏ qua lỗi SSL (chỉ dùng trong môi trường phát triển)
      withCredentials: true,
    });
  }
}
