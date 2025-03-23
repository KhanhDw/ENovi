import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
@Injectable({
  providedIn: 'root',
})
export class AdminUserService {
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

  // Hàm upload file ảnh, trả về Observable
  getAllUser(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/get-all-user`);
  }
  
  getSearchUser(searchKey: string): Observable<any> {
    let params = new HttpParams();
    if (searchKey) {
      params = params.set('searchKey', searchKey);
    }
    return this.http.get<any>(`${this.apiUrl}/search`, { params });
  }



  getCountUserRegiterInMonth(year: number): Observable<any> {
    let params = new HttpParams();
    if (year) {
      params = params.set('year', year);
      console.log(year);
    }
    return this.http.get<any>(`${this.apiUrl}/count-user-year`, { params });
  }
  
}
