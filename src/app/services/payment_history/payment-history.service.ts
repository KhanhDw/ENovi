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

  getRegisteredStudents(courseId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/registered-students/${courseId}`);
  }

  createPaymentRequest(userId: number, amount: number): Observable<any> {
    const url = `${this.apiUrl}/create_payment_request`;
    const paymentData = { userId, amount };
    return this.http.post<any>(url, paymentData);
  }

  getTotalRevenue(): Observable<any> {
    const url = `${this.apiUrl}/total_revenue`;
    return this.http.get<any>(url);
  }
  getMonthlyRevenue(): Observable<any> {
    const url = `${this.apiUrl}/monthly_revenue`;
    return this.http.get<any>(url);
  }

  
  getWithdrawalHistoryByInstructor(userId: number): Observable<any> {
    const url = `${this.apiUrl}/withdrawal_history`;
    return this.http.get<any>(url, { params: { userId } });
  }
  getWithdrawalHistoryByInstructor_confirmed(userId: number): Observable<any> {
    const url = `${this.apiUrl}/withdrawal_history_confirmed`;
    return this.http.get<any>(url, { params: { userId } });
  }

  updatePaymentStatus(paymentHistoryId: number, newStatus: string): Observable<any> {
    const url = `${this.apiUrl}/update_payment_status`;
    const updateData = { paymentHistoryId, newStatus };
    return this.http.put<any>(url, updateData);
  }

}
