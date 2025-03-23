import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class UploadImgServerService {

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
  uploadFile(base64String: string, fileName: string): Observable<any> {
    const payload = { imagebase64String: base64String, fileName: fileName };
    return this.http.post<any>(`${this.apiUrl}/banner-course`, payload);
  }
}
