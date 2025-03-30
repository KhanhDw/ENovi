import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  private apiUrl!: string;

  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  setApiUrl(apiUrl: string) {
    this.apiUrl = apiUrl;
  }

  addComment(userId: number, courseId: number, content: string): Observable<any> {
    const commentData = { userId, courseId, content };
    return this.http.post(`${this.apiUrl}/add`, commentData);
  }

  deleteComment(commentId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/delete/${commentId}`);
  }
  getCommentsByCourseId(courseId: number, userId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/course/${courseId}/${userId}`);
  }
}
