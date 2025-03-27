import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentHistoryService {

  private apiUrl!: string;

  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  setApiUrl(apiUrl: string) {
    this.apiUrl = apiUrl;
  }

  getPaymentHistoryByUserId(userId: string): Observable<any> {
    const url = `${this.apiUrl}/payment_history_by_user/${userId}`;
    return this.http.get<any>(url);
  }

  getPaymentHistoryByCourseTitleAndUserId(courseTitle: string, userId: string): Observable<any> {
    const url = `${this.apiUrl}/payment_history_by_course`;
    return this.http.get<any>(url, { params: { title: courseTitle, userId } });
  }
}
