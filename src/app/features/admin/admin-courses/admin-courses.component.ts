import { Component, HostListener, ElementRef, ViewChild } from '@angular/core';
import { CourseAdmin } from './../../../interface/course';

@Component({
  selector: 'app-admin-courses',
  templateUrl: './admin-courses.component.html',
  styleUrl: './admin-courses.component.css',
  standalone: false,
})
export class AdminCoursesComponent {
  //  truyền data đến component con
  listCourseAdmin: CourseAdmin[] = [
    {
      id: 1,
      title: 'Lập trình JavaScript cơ bản',
      thumbnail:
        'https://phongvu.vn/cong-nghe/wp-content/uploads/2025/01/hinh-nen-co-viet-nam-53-1024x576.jpg',
      enrollments: 1500,
      rating: 4.5,
      duration: 123,
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
      duration: 123,
      price: 2999000,
      lecture: 891,
      revenue: 632532000,
      commission: 6325320,
      category: 'Marketing',
      instructor: 'Nguyễn Văn Giang',
    },
    {
      id: 3,
      title: 'Xây dựng API với Node.js và Express',
      thumbnail:
        'https://phongvu.vn/cong-nghe/wp-content/uploads/2025/01/hinh-nen-co-viet-nam-53-1024x576.jpg',
      enrollments: 800,
      rating: 4.2,
      duration: 123,
      price: 2999000,
      lecture: 891,
      revenue: 632532000,
      commission: 6325320,
      category: 'Marketing',
      instructor: 'Nguyễn Văn Giang',
    },
    {
      id: 4,
      title: 'Làm chủ TypeScript',
      thumbnail:
        'https://phongvu.vn/cong-nghe/wp-content/uploads/2025/01/hinh-nen-co-viet-nam-53-1024x576.jpg',
      enrollments: 1200,
      rating: 4.6,
      duration: 123,
      price: 2999000,
      lecture: 891,
      revenue: 632532000,
      commission: 6325320,
      category: 'Marketing',
      instructor: 'Nguyễn Văn Giang',
    },
    {
      id: 5,
      title: 'Thiết kế giao diện web responsive',
      thumbnail:
        'https://phongvu.vn/cong-nghe/wp-content/uploads/2025/01/hinh-nen-co-viet-nam-53-1024x576.jpg',
      enrollments: 950,
      rating: 4.3,
      duration: 1234,
      price: 2999000,
      lecture: 891,
      revenue: 632532000,
      commission: 6325320,
      category: 'Marketing',
      instructor: 'Nguyễn Văn Giang',
    },
    {
      id: 6, // Thêm một khóa học mới.
      title: 'Data Science with Python',
      thumbnail:
        'https://phongvu.vn/cong-nghe/wp-content/uploads/2025/01/hinh-nen-co-viet-nam-53-1024x576.jpg',
      enrollments: 500,
      rating: 4.7,
      duration: 123,
      price: 2999000,
      lecture: 891,
      revenue: 632532000,
      commission: 6325320,
      category: 'Marketing',
      instructor: 'Nguyễn Văn Giang',
    },
    {
      id: 1,
      title: 'Lập trình JavaScript cơ bản',
      thumbnail:
        'https://phongvu.vn/cong-nghe/wp-content/uploads/2025/01/hinh-nen-co-viet-nam-53-1024x576.jpg',
      enrollments: 1500,
      rating: 4.5,
      duration: 123,
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
      duration: 1,
      price: 2999000,
      lecture: 891,
      revenue: 632532000,
      commission: 6325320,
      category: 'Marketing',
      instructor: 'Nguyễn Văn Giang',
    },
    {
      id: 3,
      title: 'Xây dựng API với Node.js và Express',
      thumbnail:
        'https://phongvu.vn/cong-nghe/wp-content/uploads/2025/01/hinh-nen-co-viet-nam-53-1024x576.jpg',
      enrollments: 800,
      rating: 4.2,
      duration: 1,
      price: 2999000,
      lecture: 891,
      revenue: 632532000,
      commission: 6325320,
      category: 'Marketing',
      instructor: 'Nguyễn Văn Giang',
    },
    {
      id: 4,
      title: 'Làm chủ TypeScript',
      thumbnail:
        'https://phongvu.vn/cong-nghe/wp-content/uploads/2025/01/hinh-nen-co-viet-nam-53-1024x576.jpg',
      enrollments: 1200,
      rating: 4.6,
      duration: 1,
      price: 2999000,
      lecture: 891,
      revenue: 632532000,
      commission: 6325320,
      category: 'Marketing',
      instructor: 'Nguyễn Văn Giang',
    },
    {
      id: 5,
      title: 'Thiết kế giao diện web responsive',
      thumbnail:
        'https://phongvu.vn/cong-nghe/wp-content/uploads/2025/01/hinh-nen-co-viet-nam-53-1024x576.jpg',
      enrollments: 950,
      rating: 4.3,
      duration: 1,
      price: 2999000,
      lecture: 891,
      revenue: 632532000,
      commission: 6325320,
      category: 'Marketing',
      instructor: 'Nguyễn Văn Giang',
    },
    {
      id: 6, // Thêm một khóa học mới.
      title: 'Data Science with Python',
      thumbnail:
        'https://phongvu.vn/cong-nghe/wp-content/uploads/2025/01/hinh-nen-co-viet-nam-53-1024x576.jpg',
      enrollments: 500,
      rating: 4.7,
      duration: 1,
      price: 2999000,
      lecture: 891,
      revenue: 632532000,
      commission: 6325320,
      category: 'Marketing',
      instructor: 'Nguyễn Văn Giang',
    },
    {
      id: 1,
      title: 'Lập trình JavaScript cơ bản',
      thumbnail:
        'https://phongvu.vn/cong-nghe/wp-content/uploads/2025/01/hinh-nen-co-viet-nam-53-1024x576.jpg',
      enrollments: 1500,
      rating: 4.5,
      duration: 1,
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
      duration: 1,
      price: 2999000,
      lecture: 891,
      revenue: 632532000,
      commission: 6325320,
      category: 'Marketing',
      instructor: 'Nguyễn Văn Giang',
    },
    {
      id: 3,
      title: 'Xây dựng API với Node.js và Express',
      thumbnail:
        'https://phongvu.vn/cong-nghe/wp-content/uploads/2025/01/hinh-nen-co-viet-nam-53-1024x576.jpg',
      enrollments: 800,
      rating: 4.2,
      duration: 2,
      price: 2999000,
      lecture: 891,
      revenue: 632532000,
      commission: 6325320,
      category: 'Marketing',
      instructor: 'Nguyễn Văn Giang',
    },
    {
      id: 4,
      title: 'Làm chủ TypeScript',
      thumbnail:
        'https://phongvu.vn/cong-nghe/wp-content/uploads/2025/01/hinh-nen-co-viet-nam-53-1024x576.jpg',
      enrollments: 1200,
      rating: 4.6,
      duration: 4,
      price: 2999000,
      lecture: 891,
      revenue: 632532000,
      commission: 6325320,
      category: 'Marketing',
      instructor: 'Nguyễn Văn Giang',
    },
    {
      id: 5,
      title: 'Thiết kế giao diện web responsive',
      thumbnail:
        'https://phongvu.vn/cong-nghe/wp-content/uploads/2025/01/hinh-nen-co-viet-nam-53-1024x576.jpg',
      enrollments: 950,
      rating: 4.3,
      duration: 1,
      price: 2999000,
      lecture: 891,
      revenue: 632532000,
      commission: 6325320,
      category: 'Marketing',
      instructor: 'Nguyễn Văn Giang',
    },
    {
      id: 6, // Thêm một khóa học mới.
      title: 'Data Science with Python',
      thumbnail:
        'https://phongvu.vn/cong-nghe/wp-content/uploads/2025/01/hinh-nen-co-viet-nam-53-1024x576.jpg',
      enrollments: 500,
      rating: 4.7,
      duration: 1,
      price: 2999000,
      lecture: 891,
      revenue: 632532000,
      commission: 6325320,
      category: 'Marketing',
      instructor: 'Nguyễn Văn Giang',
    },
    {
      id: 1,
      title: 'Lập trình JavaScript cơ bản',
      thumbnail:
        'https://phongvu.vn/cong-nghe/wp-content/uploads/2025/01/hinh-nen-co-viet-nam-53-1024x576.jpg',
      enrollments: 1500,
      rating: 4.5,
      duration: 1,
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
      duration:12,
      price: 2999000,
      lecture: 891,
      revenue: 632532000,
      commission: 6325320,
      category: 'Marketing',
      instructor: 'Nguyễn Văn Giang',
    },
    {
      id: 3,
      title: 'Xây dựng API với Node.js và Express',
      thumbnail:
        'https://phongvu.vn/cong-nghe/wp-content/uploads/2025/01/hinh-nen-co-viet-nam-53-1024x576.jpg',
      enrollments: 800,
      rating: 4.2,
      duration:12,
      price: 2999000,
      lecture: 891,
      revenue: 632532000,
      commission: 6325320,
      category: 'Marketing',
      instructor: 'Nguyễn Văn Giang',
    },
    {
      id: 4,
      title: 'Làm chủ TypeScript',
      thumbnail:
        'https://phongvu.vn/cong-nghe/wp-content/uploads/2025/01/hinh-nen-co-viet-nam-53-1024x576.jpg',
      enrollments: 1200,
      rating: 4.6,
      duration:12,
      price: 2999000,
      lecture: 891,
      revenue: 632532000,
      commission: 6325320,
      category: 'Marketing',
      instructor: 'Nguyễn Văn Giang',
    },
    {
      id: 5,
      title: 'Thiết kế giao diện web responsive',
      thumbnail:
        'https://phongvu.vn/cong-nghe/wp-content/uploads/2025/01/hinh-nen-co-viet-nam-53-1024x576.jpg',
      enrollments: 950,
      rating: 4.3,
      duration:12,
      price: 2999000,
      lecture: 891,
      revenue: 632532000,
      commission: 6325320,
      category: 'Marketing',
      instructor: 'Nguyễn Văn Giang',
    },
    {
      id: 6, // Thêm một khóa học mới.
      title: 'Data Science with Python',
      thumbnail:
        'https://phongvu.vn/cong-nghe/wp-content/uploads/2025/01/hinh-nen-co-viet-nam-53-1024x576.jpg',
      enrollments: 500,
      rating: 4.7,
      duration: 1234,
      price: 2999000,
      lecture: 891,
      revenue: 632532000,
      commission: 6325320,
      category: 'Marketing',
      instructor: 'Nguyễn Văn Giang',
    },
  ];

  sortCourses = [
    { name: 'Sắp xếp theo ...', value: '' },
    { name: 'Số lượng học viên giảm dần', value: '' },
    { name: 'Số lượng học viên tăng dần', value: '' },
    { name: 'Doanh thu giảm dần', value: '' },
    { name: 'Doanh thu tăng dần', value: '' },
    { name: 'Thời lượng giảm dần', value: '' },
    { name: 'Thời lượng tăng dần', value: '' },
    // { name: '' },
  ];

  // Biến để kiểm tra xem đã scroll vượt quá 60px hay chưa
  isScrolled = false;
  pointShowHeader = 60;
  showDetailInfo = false;
  listORCard = false;
  gotoDetail = '/admin/courses/detail';
  ShowModalsubmitDeleteCourse = false;

  toggleShowModalsubmitDeleteCourse() {
    this.ShowModalsubmitDeleteCourse = !this.ShowModalsubmitDeleteCourse;
  }

  toggleToList() {
    this.listORCard = false;
  }
  toggleToCart() {
    this.listORCard = true;
  }

  // khởi tạo biến với kiểu dữ liệu là một interface với dữ liệu rỗng ban đầu
  CourseDetailRecive: Partial<CourseAdmin> = {};

  @ViewChild('scrollContainer') scrollContainer!: ElementRef;

  ngAfterViewInit() {
    this.onScroll();
  }

  onScroll() {
    const scrollTop = this.scrollContainer.nativeElement.scrollTop;
    // console.log('Scroll Top:', scrollTop);
    this.isScrolled = scrollTop > this.pointShowHeader;
  }

  toggleShowDetailInfo() {
    this.showDetailInfo = !this.showDetailInfo;
    if (this.showDetailInfo === false) {
      this.CourseDetailRecive = {};
    }
  }

  handleCourseClick(course: any) {
    const validCourse = course as CourseAdmin; // Ép kiểu về Course
    console.log('Received in Parent:', validCourse);
    this.CourseDetailRecive = {};
    this.CourseDetailRecive = course;
    this.showDetailInfo = true;
    console.log('Clicked Item in parent:', course); // Log trong component con
  }

  @HostListener('document:contextmenu', ['$event'])
  onRightClick(event: MouseEvent) {
    console.log('phát hiện clik phải');
    if (this.showDetailInfo) {
      this.showDetailInfo = false;
    }
  }
}
