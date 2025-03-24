import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class VnpayService {
  private apiUrl!: string;

  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  setApiUrl(apiUrl: string) {
    this.apiUrl = apiUrl;
  }
  getApiUrl() {
    return this.apiUrl;
  }

  createPayment(orderData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/create_payment_url`, orderData);
  }

  getPaymentReturn(): Observable<any> {
    return this.http.get(`${this.apiUrl}/vnpay_return`);
  }

  getPaymentIPN(): Observable<any> {
    return this.http.get(`${this.apiUrl}/vnpay_ipn`);
  }

  queryPayment(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/querydr`, data);
  }

  getQueryPayment(): Observable<any> {
    return this.http.get(`${this.apiUrl}/querydr`);
  }

  refundPayment(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/refund`, data);
  }

  getRefundPayment(): Observable<any> {
    return this.http.get(`${this.apiUrl}/refund`);
  }

  getOrderList(): Observable<any> {
    return this.http.get(`${this.apiUrl}`);
  }
}
