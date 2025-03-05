import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class SearchServiceService {
  private apiUrl!: string;

  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  setApiUrl(apiUrl: string) {
    this.apiUrl = apiUrl;
  }

  searchCoursesByTitle(
    title: string,
    rating: number,
    language: number,
    duration: number,
    level: string,
    price: number,
    page: number
  ): Observable<any> {
    let params = new HttpParams();
      
    // Thêm tất cả các parameter nếu chúng tồn tại
    if (title) params = params.set('title', encodeURIComponent(title));
    if (rating) params = params.set('rating', encodeURIComponent(rating.toString()));
    if (language) params = params.set('language', encodeURIComponent(language.toString()));
    if (duration) params = params.set('duration', encodeURIComponent(duration.toString()));
    if (level) params = params.set('level', encodeURIComponent(level));
    if (price) params = params.set('price', encodeURIComponent(price.toString()));
    if (page) params = params.set('page', encodeURIComponent(page.toString()));


    return this.http.get<any>(`${this.apiUrl}/course`, { params });
  }
}
