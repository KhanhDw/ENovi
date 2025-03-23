import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class MyLearningService {
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

  // Add a course to MyLearning
  addToMyLearning(payload: { userId: number; courseId: number }): Observable<any> {
    return this.http.post(`${this.apiUrl}/add`, payload);
  }

  // Get MyLearning data by user ID
  getMyLearningByUserId(userId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${userId}`);
  }

  // Remove a course from MyLearning
  removeFromMyLearning(payload: { userId: number; courseId: number }): Observable<any> {
    const options = {
      body: payload
    };
    return this.http.delete(`${this.apiUrl}/remove`, options);
  }

  // Search courses by name in MyLearning
  searchCoursesByName(userId: number, courseName: string): Observable<any> {
    const params = new HttpParams()
      .set('userId', userId.toString())
      .set('courseName', courseName);
    return this.http.get(`${this.apiUrl}/search`, { params });
  }

  // Kiểm tra xem khóa học có trong MyLearning không
  checkCourseInMyLearning(userId: number, courseId: number): Observable<any> {
    const params = new HttpParams()
      .set('userId', userId.toString())
      .set('courseId', courseId.toString());
    return this.http.get(`${this.apiUrl}/check`, { params });
  }

}
