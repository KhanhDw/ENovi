import { Component, OnInit } from '@angular/core';
import { CookieStorageService } from '@app/services/cookie_storage/cookie-storage.service';
import { QuillModules } from 'ngx-quill';
import { UserServiceService } from '@app/services/user/user-service.service';
import { ApiService } from '@app/services/api.service';
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


  constructor(
    private cookieStorageService: CookieStorageService,
    private userService: UserServiceService,
    private apiService: ApiService
  ) {}

  ngOnInit(): void {
    let roleUser = this.getUserId().roleUser;
    this.showTieuSuGiangVien = roleUser;
    this.biography = this.getUserId().biography || '';
    console.log('this.biography', this.biography);
  }



  getUserId(): { id: number; roleUser: string; name: string; picture?: string; email?: string, website?: string, biography?: string } {
    return this.userService.getUserLogin();
  }




 


  modules: QuillModules = {
    toolbar: [
      ['bold', 'italic', 'underline'], // Chỉ định các nút in đậm, in nghiêng và gạch chân
    ],
  };
}
