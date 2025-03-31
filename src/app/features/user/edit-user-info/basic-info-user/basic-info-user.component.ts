import { Component, OnInit } from '@angular/core';
import { CookieStorageService } from '@app/services/cookie_storage/cookie-storage.service';
import { QuillModules } from 'ngx-quill';
import { UserServiceService } from '@app/services/user/user-service.service';
import { ApiService } from '@app/services/api.service';
import { ppid } from 'process';
// Removed unused import

@Component({
  selector: 'app-basic-info-user',
  templateUrl: './basic-info-user.component.html',
  styleUrl: './basic-info-user.component.css',
  standalone: false,
})
export class BasicInfoUserComponent implements OnInit {
  showTieuSuGiangVien: string = '';
  biography: string = '';
  website: string = '';
  username: string = '';

  constructor(
    private cookieStorageService: CookieStorageService,
    private userService: UserServiceService,
    private apiService: ApiService
  ) {}

  ngOnInit(): void {
    let roleUser = this.getUserId().roleUser;
    this.showTieuSuGiangVien = roleUser;
    this.website = this.getUserId().website || '';
    this.username = this.getUserId().userName || '';
    this.biography = this.getUserId().biography || '';
    console.log('this.biography', this.biography);
  }

  getUserId(): {
    id: number;
    roleUser: string;
    userName: string;
    picture?: string;
    email?: string;
    website?: string;
    biography?: string;
  } {
    return this.userService.getUserLogin();
  }

  saveUserProfile(): void {
    const user = this.getUserId();
    const profileData = {
      id: user.id,
      username: this.username,
      website: this.website || '',
      biography: this.biography,
    };

    if (
      !profileData.id ||
      !profileData.username ||
      !profileData.website ||
      !profileData.biography
    ) {
      console.warn('Please fill in all required fields before saving.');
      return;
    }
    this.userService.updateUserProfile(profileData).subscribe({
      next: (success) => {
        if (success) {
          alert('Cập nhật hồ sơ người dùng thành công');
        } else {
          alert('Cập nhật hồ sơ người dùng thất bại');
        }
      },
      error: (err) => {
        console.error('Lỗi khi cập nhật hồ sơ người dùng:', err);
        alert('Lỗi khi cập nhật hồ sơ người dùng');
      },
    });
  }

  modules: QuillModules = {
    toolbar: [
      ['bold', 'italic', 'underline'], // Chỉ định các nút in đậm, in nghiêng và gạch chân
    ],
  };
}
