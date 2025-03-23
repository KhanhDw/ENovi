import { Component, Input } from '@angular/core';
import { CourseAdmin } from '@app/interface/course';

@Component({
  selector: 'app-admin-course-detail',
  standalone: false,
  templateUrl: './admin-course-detail.component.html',
  styleUrl: './admin-course-detail.component.css',
})
export class AdminCourseDetailComponent {
  gotoBack = '/admin/courses';
  ShowModalsubmitDeleteCourse = false;

  toggleShowModalsubmitDeleteCourse() {
    this.ShowModalsubmitDeleteCourse = !this.ShowModalsubmitDeleteCourse;
  }

  TrangThaiKhoaHoc = [
    { name: 'Đang hoạt động' },
    { name: 'Bị đình chỉ' },
    { name: 'Hạn chế' },
    { name: 'Riêng tư' },
  ];

  // khởi tạo biến với kiểu dữ liệu là một interface với dữ liệu rỗng ban đầu

  CourseDetailRecive: CourseAdmin = {
    id: 1,
    title: 'Lập trình JavaScript cơ bản',
    img:
      'https://phongvu.vn/cong-nghe/wp-content/uploads/2025/01/hinh-nen-co-viet-nam-53-1024x576.jpg',
    enrollments: 1500,
    rating: 4.5,
    price: 2999000,
    lecture: 891,
    revenue: 632532000,
    commission: 6325320,
    instructorName: 'Nguyễn Văn Giang',
    level: 'Nhập môn',
    instructorId: 33,
    status: 'hoạt động',
    createdAt: new Date('2023-01-01T00:00:00'),
  };
}
