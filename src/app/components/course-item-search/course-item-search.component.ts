import { CourseDetailServiceService } from './../../services/course_detail/course-detail-service.service';
import { Component, Input } from '@angular/core';
import { CourseSearch } from '@app/interface/course';
import { Router } from '@angular/router';
import { ApiService } from '@app/services/api.service';

@Component({
  selector: 'app-course-item-search',
  templateUrl: './course-item-search.component.html',
  styleUrl: './course-item-search.component.css',
  standalone: false,
})
export class CourseItemSearchComponent {
  urlBackend_img_banner_course: string = '';
  @Input() listCourse: CourseSearch[] = [];

  constructor(private router: Router, private apiService: ApiService) {
    this.urlBackend_img_banner_course =
      this.apiService.API_URL + '/uploads/img/bannerCourses/';
  }

  formatTitle(title: string): string {
    console.log(title);
    return title
      .toLowerCase()
      .trim()
      .replace(/\s+/g, '-') // Chuyển khoảng trắng thành dấu "-"
      .replace(/[^\w-]+/g, ''); // Loại bỏ ký tự đặc biệt
  }

  goToCourseDetail(id: number, title: string) {
    this.router.navigate(['/course', id, encodeURIComponent(title)]);
  }
}
