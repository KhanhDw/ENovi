import { AuthGoogleServiceService } from './authGoogle/auth-google-service.service';
import { ForgotPasswordServiceService } from './fogot_password/forgot-password-service.service';
import { UserServiceService } from './user/user-service.service';
import { ResetPasswordService } from './reset_password/reset-password.service';
import { LoginServiceService } from './login/login-service.service';
import { RegisterServiceService } from './register/register-service.service';
import { CategoriesServiceService } from './category/categories-service.service';


import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { from, Observable } from 'rxjs';
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
    public resetPasswordService: ResetPasswordService,
    public loginServiceService: LoginServiceService,
    public registerServiceService: RegisterServiceService,
    public categoriesServiceService: CategoriesServiceService
  ) {
    this.loginServiceService.setApiUrl(`${this.API_URL}/login`);
    this.authGoogleServiceService.setApiUrl(`${this.API_URL}/auth`);
    this.forgotPasswordServiceService.setApiUrl(`${this.API_URL}/fopass`);
    this.resetPasswordService.setApiUrl(`${this.API_URL}/repass`);
    this.userServiceService.setApiUrl(`${this.API_URL}/user`);
    this.registerServiceService.setApiUrl(`${this.API_URL}/register`);
    this.categoriesServiceService.setApiUrl(`${this.API_URL}/categories`);
  }
}
