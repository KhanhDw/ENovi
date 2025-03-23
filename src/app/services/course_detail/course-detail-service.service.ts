import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CourseDetailServiceService {

  private apiUrl!: string;

  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  setApiUrl(apiUrl: string) {
    this.apiUrl = apiUrl;
  }

  GetCourseDetailAPI(id: string, title: string, userId:string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}/title/${encodeURIComponent(title)}?userId=${userId}`);
  }
}
