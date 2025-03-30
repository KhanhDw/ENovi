import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpEventType } from '@angular/common/http';
import { Observable, catchError, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UploadVideoService {
  private apiUrl = 'http://localhost:3000/upload';

  constructor(private http: HttpClient) {}

  setApiUrl(apiUrl: string) {
    this.apiUrl = apiUrl;
  }
  getApiUrl() {
    return this.apiUrl;
  }

 
  // Upload video trực tiếp với FormData
  uploadVideo(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('video', file);

    return this.http.post(`${this.apiUrl}/lesson`, formData);
  }



  // Upload intro video
  uploadIntroVideo(file: File, courseId: string): Observable<any> {
    const formData = new FormData();
    formData.append('video', file);
    formData.append('courseId', courseId);

    return this.http.post(`${this.apiUrl}/intro-video`, formData).pipe(
      map((response) => response),
      catchError((error) => {
        console.error('Error uploading intro video:', error);
        return of({ success: false, error });
      })
    );
  }

  // Upload video theo chunk (dành cho video lớn)
  // uploadVideoInChunks(file: File, chunkSize: number = 1024 * 1024): Observable<any> {
  //   const totalChunks = Math.ceil(file.size / chunkSize);
  //   let currentChunk = 0;

  //   const uploadNextChunk = (): Observable<any> => {
  //     if (currentChunk >= totalChunks) {
  //       return new Observable((observer) => {
  //         observer.next({ status: 'complete' });
  //         observer.complete();
  //       });
  //     }

  //     const start = currentChunk * chunkSize;
  //     const end = Math.min(start + chunkSize, file.size);
  //     const chunk = file.slice(start, end);

  //     const formData = new FormData();
  //     formData.append('chunk', chunk);
  //     formData.append('filename', file.name);
  //     formData.append('part', currentChunk.toString());
  //     formData.append('totalParts', totalChunks.toString());

  //     return this.http.post(`${this.apiUrl}-chunk`, formData).pipe(
  //       map((response) => {
  //         currentChunk++;
  //         return { status: 'chunkUploaded', part: currentChunk, response };
  //       })
  //     );
  //   };

  //   return new Observable((observer) => {
  //     const upload = () => {
  //       uploadNextChunk().subscribe({
  //         next: (result) => {
  //           observer.next(result);
  //           if (result.status === 'chunkUploaded') {
  //             upload();
  //           } else if (result.status === 'complete') {
  //             observer.complete();
  //           }
  //         },
  //         error: (err) => observer.error(err)
  //       });
  //     };
  //     upload();
  //   });
  // }
}
