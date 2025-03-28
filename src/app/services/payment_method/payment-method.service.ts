import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentMethodService {

   private apiUrl!: string;
 
   constructor(
     private http: HttpClient,
     private router: Router,
     private route: ActivatedRoute
   ) {}
 
   setApiUrl(apiUrl: string) {
     this.apiUrl = apiUrl;
   }




  addPaymentMethod(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/add`, data);
  }

  updatePaymentMethod(userId: number, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/update/${userId}`, data);
  }

  checkUserExists(userId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/check-user/${userId}`);
  }


  getPaymentMethodByUserId(userId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/get/${userId}`);
  }

 
}
