import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LectureService {

 private apiUrl!: string;
 
   constructor(
     private http: HttpClient,
     private router: Router,
     private route: ActivatedRoute
   ) {}
 
   setApiUrl(apiUrl: string) {
     this.apiUrl = apiUrl;
   }


  watchLecture(sectionId: number, lectureId: number, courseId: number): Observable<any> {
    const url = `${this.apiUrl}/get-watch`;
    const params = { sectionId, lectureId, courseId };
    return this.http.get<any>(url, { params });
  }

  streamVideo(namevideo: string): Observable<any> {
    const url = `${this.apiUrl}/stream/video`;
    const params = { namevideo };
    return this.http.get<any>(url, { params });
  }
}
