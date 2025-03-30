import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RatingService {
  private apiUrl!: string;

  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  setApiUrl(apiUrl: string) {
    this.apiUrl = apiUrl;
  }

  addRating(userId: number, courseId: number, rating: number): Observable<any> {
    const payload = { userId, courseId, rating };
    return this.http.post(`${this.apiUrl}/add`, payload);
  }

  getTotalRatings(courseId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/total/${courseId}`);
  }

  getRatingsBreakdown(courseId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/breakdown/${courseId}`);
  }
}
