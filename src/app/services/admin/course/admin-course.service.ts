import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AdminCourseService {

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
    getAllCourse(): Observable<any> {
      return this.http.get<any>(`${this.apiUrl}/get-all-course`);
    }
    
  getNameInstructor(instructorId: number): Observable<any> {
   let params = new HttpParams().set('instructorId', instructorId);
   return this.http.get<any>(`${this.apiUrl}/get-name-instructor`, { params });
  }
  

  getCourseByName(title: string): Observable<any> {
    let params = new HttpParams().set('title', title);
    return this.http.get<any>(`${this.apiUrl}/get-course-title`, { params });
  }
  
}
