import { CookieService } from 'ngx-cookie-service';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { CookieStorageService } from '../cookie_storage/cookie-storage.service';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CourseInstructorService {
  private apiUrl!: string;

  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    private cookieService: CookieStorageService
  ) {}

  setApiUrl(apiUrl: string) {
    this.apiUrl = apiUrl;
  }

  GetListCourseInstructor(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/instructor/${id}`);
  }

  DeleteCourseInstructor(idCourse: string): Observable<any> {
    return this.http.delete<any>(
      `${this.apiUrl}/instructor/delete-course/${encodeURIComponent(idCourse)}`
    );
  }

  getSearchCourseInstructor(title: string, id: string, sortBy: string) {
    let params = new HttpParams();

    if (id) params = params.set('id', encodeURIComponent(id));
    if (title) params = params.set('title', encodeURIComponent(title));
    if (sortBy) params = params.set('sortBy', encodeURIComponent(sortBy));

    return this.http.get<any>(`${this.apiUrl}/instructor/search`, { params });
  }

  // lấy số lượng khóa học của instructor
  getTotalCourses(instructorId: number): Observable<any> {
    return this.http.get<any>(
      `${this.apiUrl}/instructor/${encodeURIComponent(
        instructorId
      )}/total-courses`
    );
  }

  // ===================
  // category
  // ===================

  getUpdateCourseInstructorId(
    idCourse: number,
    instructorId: number
  ): Observable<any> {
    return this.http.get<any>(
      `${this.apiUrl}/${encodeURIComponent(idCourse)}/${encodeURIComponent(
        instructorId
      )}`
    );
  }

  putUpdateCourse(
    idCourse: number,
    instructorId: number,
    updates: any
  ): Observable<any> {
    return this.http.put(
      `${this.apiUrl}/${encodeURIComponent(
        idCourse
      )}/instructor/${encodeURIComponent(instructorId)}`,
      updates
    );
  }

  putCategoryCourse(
    categorySelected: any[],
    courseId: number
  ): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http.put(
      `${this.apiUrl}/${encodeURIComponent(courseId)}/update/category`,
      { categorySelected },
      { headers } // Thêm headers vào đây
    );
  }
  // ===================
  // section
  // ===================

  deleteSectionCourse(courseId: number, sectionOrder: number): Observable<any> {
    return this.http.delete(
      `${this.apiUrl}/${encodeURIComponent(
        courseId
      )}/section/${encodeURIComponent(sectionOrder)}/delete/`
    );
  }

  updateNameSectionCourse(
    title: string,
    courseId: number,
    sectionOrder: number
  ): Observable<any> {
    return this.http.put(
      `${this.apiUrl}/${encodeURIComponent(
        courseId
      )}/section/${encodeURIComponent(sectionOrder)}/update-name/`,
      { title }
    );
  }

  createSection(
    title: string,
    courseId: number,
    sectionOrderMax: number
  ): Observable<any> {
    return this.http.post(
      `${this.apiUrl}/${encodeURIComponent(courseId)}/section/create/`,
      { title, sectionOrderMax }
    );
  }

  getSection(courseId: number): Observable<any> {
    return this.http.get(
      `${this.apiUrl}/${encodeURIComponent(courseId)}/section/get`
    );
  }
  getSectionId(courseId: number, sectionOrder: number): Observable<any> {
    return this.http.get(
      `${this.apiUrl}/${encodeURIComponent(
        courseId
      )}/section/${encodeURIComponent(sectionOrder)}/get`
    );
  }

  // ===========================
  // lession
  // ===========================

  getLessionBySectionId(sectionId: number, courseId: number): Observable<any> {
    const params = new HttpParams().set('courseId', courseId.toString());
    return this.http.get(
      `${this.apiUrl}/section/${encodeURIComponent(sectionId)}/lession`,
      { params }
    );
  }
  updateTitleLessionByLessonId(
    sectionId: number,
    title: string
  ): Observable<any> {
    return this.http.put(
      `${this.apiUrl}/section/${encodeURIComponent(
        sectionId
      )}/lession/update/title`,
      { title }
    );
  }

  updateNameVideoLesson(
    nameFileVideo: string,
    sectionId: number,
    lessonId: number
  ): Observable<any> {
    return this.http.put(
      `${this.apiUrl}/section/${encodeURIComponent(
        sectionId
      )}/lession/${encodeURIComponent(lessonId)}/update/name-video`,
      { nameFileVideo }
    );
  }

  createNewLesson(sectionId: number, courseId: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/lesson/create`, {
      sectionId,
      courseId,
    });
  }

  deleteLesson(lessonId: number): Observable<any> {
    return this.http.delete(
      `${this.apiUrl}/lesson/${encodeURIComponent(lessonId)}/delete`
    );
  }

  // ====================
  // tạo khóa học mới
  // ====================

  createCourse(
    title: string,
    price: string,
    instructorId: number
  ): Observable<any> {
    return this.http.post(`${this.apiUrl}/create`, {
      title,
      price,
      instructorId,
    });
  }

  // home==

  getTopRatedFreeCourses(limit: number = 10): Observable<any> {
    const params = new HttpParams().set('limit', limit);
    return this.http.get(`${this.apiUrl}/top-rated/free`, { params });
  }

  getTopRatedCourses(limit: number = 10): Observable<any> {
    const params = new HttpParams().set('limit', limit);
    return this.http.get(`${this.apiUrl}/top-rated`, { params });
  }

  //  get course by id to pay

  getCoursePaymentById(courseIds: number[]): Observable<any> {
    console.log('courseIds111111111', courseIds);
    return this.http.post(`${this.apiUrl}/course/payment`, { courseIds });
  }
}
