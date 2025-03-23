import { error } from 'node:console';
import { ApiService } from '@app/services/api.service';
import {
  Component,
  OnInit,
  AfterViewInit,
  HostListener,
  NgZone,
  ViewChild,
  ElementRef,
  ChangeDetectorRef,
} from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { CookieStorageService } from '@app/services/cookie_storage/cookie-storage.service';
import { SharedDataService } from '@app/services/share/shared-data.service';
import { UploadImgServerService } from '@app/services/upload_img_server/upload-img-server.service';
import { FormsModule, NgModel } from '@angular/forms';
import { UploadVideoService } from '@app/services/upload_video/upload-video.service';

@Component({
  selector: 'app-course-new',
  standalone: false,
  templateUrl: './course-new.component.html',
  styleUrl: './course-new.component.css',
})
export class CourseNewComponent implements OnInit, AfterViewInit {
  urlBackend_img_banner_course: string = '';
  titleNgMode: string = '';
  priceNgMode: string = '';
  priceCourse: string = '';

  constructor(
    private cookieStorageService: CookieStorageService,
    private apiService: ApiService,
    private router: Router,
    private route: ActivatedRoute,
    private ngZone: NgZone,
    private sharedDataService: SharedDataService,
    private uploadImgServerService: UploadImgServerService,
    private cdr: ChangeDetectorRef,
    private uploadVideoService: UploadVideoService
  ) {
    this.urlBackend_img_banner_course =
      this.apiService.API_URL + '/uploads/img/bannerCourses/';
  }
  ngAfterViewInit(): void {}

  ngOnInit(): void {}

  getInstructorId(): number {
    const instructorId = this.cookieStorageService.getCookie('user');
    if (!instructorId) {
      console.log('instructorId is null');
      return -1;
    }
    const id = JSON.parse(instructorId).id;
    return id;
  }

  huyTaoKhoaHoc() {
    this.router.navigate(['/user/instructor/courses-instructor']);
  }

  // xác nhận thay đổi và lưu vào cơ sở dũ liệu
  submitCreateCourse() {
    const idInstructor = this.getInstructorId();

    this.apiService.courseInstructorService.createCourse(
      this.titleNgMode, this.priceCourse, idInstructor
    ).subscribe({
      next: (res) => {
        if (res.success){
          this.huyTaoKhoaHoc();
        }
      },
      error: (error) => {
        console.log("lỗi tạo kháo học"+error);
      },
    });
  }

  //===========tiền tệ==================
  // Hàm định dạng số theo chuẩn Việt Nam
  formatNumber(value: any): string {
    if (!value) return '';
    return new Intl.NumberFormat('vi-VN').format(Number(value));
  }

  // Khi nhập liệu, cập nhật giá trị hiển thị
  formatCurrency(event: any) {
    let rawValue = event.target.value.replace(/\D/g, ''); // Loại bỏ ký tự không phải số
    this.priceNgMode = this.formatNumber(rawValue); // Hiển thị dấu chấm
  }

  // Khi rời khỏi ô nhập, lưu giá trị gốc không có dấu chấm
  saveRawPrice() {
    this.priceCourse = this.priceNgMode.replace(/\./g, ''); // Lưu giá trị gốc
  }
}
