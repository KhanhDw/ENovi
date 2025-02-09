import {
  Component,
  ViewChild,
  ElementRef,
  EventEmitter,
  Output,
  Input,
  OnInit,
} from '@angular/core';

import { CourseAdmin } from './../../interface/course';

@Component({
  selector: 'app-list-courses-admin',
  standalone: false,
  templateUrl: './list-courses-admin.component.html',
  styleUrl: './list-courses-admin.component.css',
})
export class ListCoursesAdminComponent implements OnInit {
  @Input() listORCard: boolean = false;

  @Output() itemClicked: EventEmitter<CourseAdmin> =
    new EventEmitter<CourseAdmin>();

  sendDataToParent(item: CourseAdmin) {
    console.log('Clicked Item in Child:', item); // Log trong component con
    this.itemClicked.emit(item); // Gửi dữ liệu lên component cha
  }

  // ===========================
  // view with table list data
  // ===========================
  @Input() listCourseAdmin: CourseAdmin[] = []; // Nhận dữ liệu từ component cha

  ngOnInit(): void {
    // (Tùy chọn) Thực hiện các tác vụ khởi tạo ở đây, ví dụ: gọi API để lấy dữ liệu
    if (!this.listCourseAdmin || this.listCourseAdmin.length === 0) {
      this.listCourseAdmin = [
        {
          id: 1,
          title: 'Lập trình JavaScript cơ bản',
          thumbnail:
            'https://phongvu.vn/cong-nghe/wp-content/uploads/2025/01/hinh-nen-co-viet-nam-53-1024x576.jpg',
          enrollments: 1500,
          rating: 4.5,
          duration: '6 tuần',
          price: 2999000,
          lecture: 891,
          revenue: 632532000,
          commission: 6325320,
          category: 'Marketing',
          instructor: 'Nguyễn Văn Giang',
        },
        {
          id: 2,
          title: 'Lập trình ReactJS từ zero đến hero',
          thumbnail:
            'https://phongvu.vn/cong-nghe/wp-content/uploads/2025/01/hinh-nen-co-viet-nam-53-1024x576.jpg',
          enrollments: 2300,
          rating: 4.8,
          duration: '8 tuần',
          price: 2999000,
          lecture: 891,
          revenue: 632532000,
          commission: 6325320,
          category: 'Marketing',
          instructor: 'Nguyễn Văn Giang',
        },
      ];
    }
  }

  getStatusClass(status: string): string {
    return status === 'In Stock'
      ? 'bg-green-200 text-green-900'
      : 'bg-red-200 text-red-900';
  }
}
