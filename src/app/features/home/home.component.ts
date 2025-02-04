import { link } from 'node:fs';
import { Component, NgZone } from '@angular/core';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrl: './home.component.css',
    standalone: false
})
export class HomeComponent {
  // ==============================
  // banner Carousel
  // ==============================
  currentIndex: number = 0;
  slides = [
    { imgage: '/img/banner/banner1.jpg' },
    { imgage: '/img/banner/banner2.jpg' },
  ];

  time = 0;

  constructor(private ngZone: NgZone) {}

  ngOnInit(): void {
    this.startSlideShow();
  }

  // Phương thức khởi động slideshow
  startSlideShow(): void {
    this.ngZone.runOutsideAngular(() => {
      setInterval(() => {
        this.ngZone.run(() => {
          this.updateSlide();
        });
      }, 4000);
    });
  }

  // Phương thức cập nhật slide và thời gian
  updateSlide(): void {
    this.NextSlide();
    this.time++;
  }

  NextSlide(): void {
    this.currentIndex = (this.currentIndex + 1) % this.slides.length;
  }

  PreSlide(): void {
    this.currentIndex =
      (this.currentIndex - 1 + this.slides.length) % this.slides.length;
  }

  // ===========================
  // kỹ năng cần thiết
  // ===========================

  skills = [
    { name: 'Khoa học dữ liệu' },
    { name: 'Khả năng lãnh đạo' },
    { name: 'Phát triển Web' },
    { name: 'Giao tiếp' },
    { name: 'Kinh doanh' },
    { name: 'Thiết kế' },
  ];

  skillsDetail0 = [
    { name: 'Khoa học dữ liệu liệu' },
    { name: 'Khoa học dữ liệu tuần' },
    { name: 'Khoa học dữ liệu do' },
    { name: 'Khoa học dữ liệu' },
    { name: 'Khoa học dữ liệu nguyen' },
    { name: 'Khoa học dữ liệu' },
    { name: 'Khoa học dữ liệu nguyen' },
    { name: 'Khoa học dữ liệu' },
    { name: 'Khoa học dữ liệu' },
    { name: 'Khoa học dữ liệu liệu liệu' },
    { name: 'Khoa học dữ liệu' },
    { name: 'Khoa học dữ liệu' },
    { name: 'Khoa học dữ liệu liệu' },
    { name: 'Khoa học dữ liệu' },
    { name: 'Khoa học dữ liệu' },
  ];
  skillsDetail1 = [
    { name: 'hả năng lãnh đạo' },
    { name: 'hả năng lãnh đạo' },
    { name: 'hả năng lãnh đạo' },
    { name: 'hả năng lãnh đạo' },
    { name: 'hả năng lãnh đạo' },
    { name: 'hả năng lãnh đạo' },
    { name: 'hả năng lãnh đạo' },
    { name: 'hả năng lãnh đạo' },
    { name: 'hả năng lãnh đạo' },
    { name: 'hả năng lãnh đạo' },
    { name: 'hả năng lãnh đạo' },
    { name: 'hả năng lãnh đạo' },
    { name: 'hả năng lãnh đạo' },
    { name: 'hả năng lãnh đạo' },
  ];
  skillsDetail2 = [{ name: 'Phát triển Web' }];
  skillsDetail3 = [{ name: 'Giao tiếp' }];
  skillsDetail4 = [{ name: 'Kinh doanh' }];
  skillsDetail5 = [{ name: 'Chỉnh sửa Video' }];

  skillsDetail: any[] = this.skillsDetail0; // Khai báo mảng để lưu trữ thông tin chi tiết kỹ năng
  selectedSkill: string = this.skills[0].name; // Khởi tạo item đầu tiên được chọn
  currentIndexSkill: number = 0;
  preBtnText: string = this.selectedSkill;

  SkillVital(buttonText: string) {
    if (this.preBtnText != buttonText) {
      this.preBtnText = buttonText;
      this.currentIndexSkill = 0;
    }

    if (buttonText == this.skills[0].name) {
      this.skillsDetail = this.skillsDetail0;
    } else if (buttonText == this.skills[1].name) {
      this.skillsDetail = this.skillsDetail1;
    } else if (buttonText == this.skills[2].name) {
      this.skillsDetail = this.skillsDetail2;
    } else if (buttonText == this.skills[3].name) {
      this.skillsDetail = this.skillsDetail3;
    } else if (buttonText == this.skills[4].name) {
      this.skillsDetail = this.skillsDetail4;
    } else if (buttonText == this.skills[5].name) {
      this.skillsDetail = this.skillsDetail5;
    } else {
      this.skillsDetail = this.skillsDetail0;
    }

    this.selectedSkill = buttonText;
  }

  isSelected(skillName: string): boolean {
    return this.selectedSkill === skillName;
  }

  // Kiểm tra xem đã đến cuối danh sách chưa
  get isAtEnd(): boolean {
    return this.currentIndexSkill >= this.skillsDetail.length - 1;
  }

  NextSlideCourseForClient(): void {
    if (this.currentIndexSkill < this.skillsDetail.length - 1) {
      this.currentIndexSkill += 2;
    }
  }

  PreSlideCourseForClient(): void {
    if (this.currentIndexSkill > 0) {
      this.currentIndexSkill -= 2;
    }
  }

  //==================================
  // Khoá học hay được nhiều người học
  //==================================
  CourseViral = [
    { name: 'dữ liệu tạm thời sau này thay thế sql khoá học' },
    { name: 'dữ liệu tạm thời sau này thay thế sql khoá học' },
    { name: 'dữ liệu tạm thời sau này thay thế sql khoá học' },
    { name: 'dữ liệu tạm thời sau này thay thế sql khoá học' },
    { name: 'dữ liệu tạm thời sau này thay thế sql khoá học' },
    { name: 'dữ liệu tạm thời sau này thay thế sql khoá học' },
    { name: 'dữ liệu tạm thời sau này thay thế sql khoá học' },
    { name: 'dữ liệu tạm thời sau này thay thế sql khoá học' },
    { name: 'dữ liệu tạm thời sau này thay thế sql khoá học' },
    { name: 'dữ liệu tạm thời sau này thay thế sql khoá học' },
    { name: 'dữ liệu tạm thời sau này thay thế sql khoá học' },
    { name: 'dữ liệu tạm thời sau này thay thế sql khoá học' },
    { name: 'dữ liệu tạm thời sau này thay thế sql khoá học' },
    { name: 'dữ liệu tạm thời sau này thay thế sql khoá học' },
  ];

  currentIndexCourseViral: number = 0;

  // Kiểm tra xem đã đến cuối danh sách chưa
  get isAtEndCourseviral(): boolean {
    return this.currentIndexCourseViral >= this.CourseViral.length - 1;
  }

  NextSlideCourseViral(): void {
    if (this.currentIndexCourseViral < this.CourseViral.length - 1) {
      this.currentIndexCourseViral += 2;
    }
  }

  PreSlideCourseViral(): void {
    if (this.currentIndexCourseViral > 0) {
      this.currentIndexCourseViral -= 2;
    }
  }

  //=======================================
  // Khoá học miễn phí được nhiều người học
  //=======================================

  CourseFree = [
    { name: 'dữ liệu tạm thời sau này thay thế sql khoá học' },
    { name: 'dữ liệu tạm thời sau này thay thế sql khoá học' },
    { name: 'dữ liệu tạm thời sau này thay thế sql khoá học' },
    { name: 'dữ liệu tạm thời sau này thay thế sql khoá học' },
    { name: 'dữ liệu tạm thời sau này thay thế sql khoá học' },
    { name: 'dữ liệu tạm thời sau này thay thế sql khoá học' },
    { name: 'dữ liệu tạm thời sau này thay thế sql khoá học' },
    { name: 'dữ liệu tạm thời sau này thay thế sql khoá học' },
    { name: 'dữ liệu tạm thời sau này thay thế sql khoá học' },
    { name: 'dữ liệu tạm thời sau này thay thế sql khoá học' },
    { name: 'dữ liệu tạm thời sau này thay thế sql khoá học' },
    { name: 'dữ liệu tạm thời sau này thay thế sql khoá học' },
    { name: 'dữ liệu tạm thời sau này thay thế sql khoá học' },
    { name: 'dữ liệu tạm thời sau này thay thế sql khoá học' },
  ];

  currentIndexCourseFree: number = 0;

  // Kiểm tra xem đã đến cuối danh sách chưa
  get isAtEndCourseFree(): boolean {
    return this.currentIndexCourseFree >= this.CourseFree.length - 1;
  }

  NextSlideCourseFree(): void {
    if (this.currentIndexCourseFree < this.CourseFree.length - 1) {
      this.currentIndexCourseFree += 2;
    }
  }

  PreSlideCourseFree(): void {
    if (this.currentIndexCourseFree > 0) {
      this.currentIndexCourseFree -= 2;
    }
  }

  //=================
  // xu hướng học tập
  //=================

  CourseLapTrinh = [
    { name: 'Python' },
    { name: 'Lập trình Web' },
    { name: 'Máy học' },
    { name: 'Khoa học dữ liệu' },
  ];
  CourseThietKe = [
    { name: 'Blender' },
    { name: 'Adobe Photoshop' },
    { name: 'Thiết kế đồ họa' },
    { name: 'Chỉnh sửa video' },
  ];
  CourseKinhdoanh = [
    { name: 'Quản lý dự án' },
    { name: 'Microsoft Power BI' },
    { name: 'Kỹ năng bán hàng' },
    { name: 'Phân tích kinh doanh' },
  ];
  CourseGiaotiep = [
    { name: 'Kỹ năng giao tiếp' },
    { name: 'Kỹ năng trình bày' },
    { name: 'Trình bày PowerPoint' },
    { name: 'Viết' },
  ];
}
