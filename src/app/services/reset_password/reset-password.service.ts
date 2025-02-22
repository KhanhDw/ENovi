import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
@Injectable({
  providedIn: 'root',
})
export class ResetPasswordService {
  private apiUrl!: string;

  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  setApiUrl(apiUrl: string) {
    this.apiUrl = apiUrl;
  }

  submitResetPassword(
    token: string,
    newPassword: string,
    email: string
  ): Observable<any> {
    return this.http.post(`${this.apiUrl}/reset-password`, {
      token,
      newPassword,
      email,
    });
  }
}
