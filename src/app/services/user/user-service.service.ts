import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { catchError, map, Observable, of } from 'rxjs';
import { CookieStorageService } from '@app/services/cookie_storage/cookie-storage.service';

@Injectable({
  providedIn: 'root',
})
export class UserServiceService {
  private apiUrl!: string;

  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    private cookieStorageService: CookieStorageService
  ) {}

  setApiUrl(apiUrl: string) {
    this.apiUrl = apiUrl;
  }

  registerInstructor(id: number): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/instructor/register`, { id });
  }

  deleteUser(id: number): Observable<any> {
    let params = new HttpParams();
    if (id) params = params.set('id', id);
    return this.http.delete<any>(`${this.apiUrl}/delete`, { params });
  }

  getUserLogin(): {
    id: number;
    roleUser: string;
    userName: string;
    picture?: string;
    email?: string;
    website?: string;
    biography?: string;
  } {
    const user = this.cookieStorageService.getCookie('user');
    if (!user) {
      console.warn('User is null in UserService');
      return { id: -1, roleUser: '', userName: '' };
    }
    try {
      const parsedData = JSON.parse(user);
      const id = parsedData.id ?? -1;
      const roleUser = parsedData.role ?? '';
      const userName = parsedData.userName ?? '';
      const picture = parsedData.picture;
      const email = parsedData.email;
      const website = parsedData.website;
      const biography = parsedData.biography;
      return { id, roleUser, userName, picture, email, website, biography };
    } catch (error) {
      console.error('Error parsing user data:', error);
      return { id: -1, roleUser: '', userName: '' };
    }
  }

  updateUserPicture(imageBase64: string): Observable<boolean> {
    const user = this.getUserLogin();
    if (user.id === -1) {
      console.warn('User is null in UserService');
      return of(false);
    }

    try {
      const userId = user.id;

      return this.http
        .put<{ success: boolean; message: string; imageUrl: string }>(
          `${this.apiUrl}/update-image`,
          {
            imageBase64: imageBase64,
            userId: userId
          }
        )
        .pipe(
          map((response) => {
            if (response.success) {
              // Lấy dữ liệu user hiện tại từ cookie
              const currentUser = JSON.parse(this.cookieStorageService.getCookie('user') || '{}');
              // Cập nhật cookie với URL ảnh mới từ response, giữ nguyên các dữ liệu khác
              const updatedUser = {...currentUser, picture: response.imageUrl};
              this.cookieStorageService.setCookie('user', JSON.stringify(updatedUser));
              return true;
            }
            console.error('Lỗi cập nhật ảnh:', response.message);
            return false;
          }),
          catchError((error) => {
            console.error('Lỗi khi gọi API cập nhật ảnh:', error);
            return of(false);
          })
        );
    } catch (error) {
      console.error('Lỗi xử lý dữ liệu người dùng:', error);
      return of(false);
    }
  }


  getUserAvatar(userId: number): Observable<string> {
    return this.http.get<{success: boolean, avatarUrl: string}>(`${this.apiUrl}/avatar/${userId}`).pipe(
      map(response => {
        if (response.success) {
          return response.avatarUrl;
        }
        throw new Error('Không thể lấy avatar người dùng');
      }),
      catchError(error => {
        console.error('Lỗi khi lấy avatar:', error);
        return of('');
      })
    );
  }


  getTotalUsers(): Observable<number> {
    return this.http.get<{ success: boolean; totalUsers: number }>(`${this.apiUrl}/total-users`).pipe(
      map(response => {
        if (response.success) {
          return response.totalUsers;
        }
        throw new Error('Unable to fetch total users');
      }),
      catchError(error => {
        console.error('Error fetching total users:', error);
        return of(0);
      })
    );
  }

  getTotalInstructors(): Observable<number> {
    return this.http.get<{ success: boolean; totalInstructors: number }>(`${this.apiUrl}/total-instructors`).pipe(
      map(response => {
        if (response.success) {
          return response.totalInstructors;
        }
        throw new Error('Unable to fetch total instructors');
      }),
      catchError(error => {
        console.error('Error fetching total instructors:', error);
        return of(0);
      })
    );
  }

  updateUserProfile(profileData: { id: number; username: string; website: string; biography: string }): Observable<boolean> {
    if (!profileData.id || !profileData.username || !profileData.website || !profileData.biography) {
      console.warn('Missing required fields to update user profile');
      return of(false);
    }

    return this.http
      .put<{ success: boolean; message: string }>(
        `${this.apiUrl}/update-profile`,
        profileData
      )
      .pipe(
        map((response) => {
          if (response.success) {
            // Update the user data in the cookie
            const currentUser = JSON.parse(this.cookieStorageService.getCookie('user') || '{}');
            const updatedUser = { ...currentUser, ...profileData };
            this.cookieStorageService.setCookie('user', JSON.stringify(updatedUser));
            return true;
          }
          console.error('Error updating profile:', response.message);
          return false;
        }),
        catchError((error) => {
          console.error('Error calling update profile API:', error);
          return of(false);
        })
      );
  }
}
