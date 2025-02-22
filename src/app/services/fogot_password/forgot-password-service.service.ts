import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class ForgotPasswordServiceService {
  private apiUrl!: string;

  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  setApiUrl(apiUrl: string) {
    this.apiUrl = apiUrl;
  }

  // Phương thức POST để gửi dữ liệu yêu cầu lấy lại mật khẩu
  SubmitFormPostForgotPassword(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/forgot-password`, data);
  }
}
