import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class CartService {
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
  getCartListCourseUser(userId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${userId}`);
  }

  deleteCourseFromCart(userId: number, courseId: number): Observable<any> {
    return this.http.delete<any>(
      `${this.apiUrl}/${userId}/courses/${courseId}`
    );
  }

  deleteMultipleCoursesFromCart(
    userId: number,
    courseIds: number[]
  ): Observable<any> {
    if (!Array.isArray(courseIds) || courseIds.length === 0) {
      throw new Error('courseIds must be a non-empty array');
    }
    const params = new HttpParams().set('courseIds', JSON.stringify(courseIds));
    return this.http.delete<any>(
      `${this.apiUrl}/${userId}/courses/delete-list-course`,
      { params }
    );
  }

  addCourseToCart(userId: number, courseId: number): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/${userId}/courses`, {
      courseId,
    });
  }

  isCourseInCart(userId: number, courseId: number): Observable<boolean> {
    return this.http.get<boolean>(
      `${this.apiUrl}/${userId}/courses/${courseId}/exists`
    );
  }
}
