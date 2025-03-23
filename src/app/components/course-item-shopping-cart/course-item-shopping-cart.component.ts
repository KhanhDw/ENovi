import { Component, Input, EventEmitter, Output, OnInit } from '@angular/core';
import { ApiService } from '@app/services/api.service';
import { CookieStorageService } from '@app/services/cookie_storage/cookie-storage.service';

@Component({
  selector: 'app-course-item-shopping-cart',
  templateUrl: './course-item-shopping-cart.component.html',
  styleUrl: './course-item-shopping-cart.component.css',
  standalone: false,
})
export class CourseItemShoppingCartComponent implements OnInit {
  urlBackend_img_banner_course: string = '';

  // ==============================
  // Nhận dữ liệu từ component cha
  // ==============================
  @Input() listCourse!: {
    id: number;
    img: string;
    title: string;
    description: string;
    // duration: number;
    rating: number;
    price: number;
  }[];

  @Input() isSelected: boolean = false;

  // ==============================
  // gửi dữ liệu lên component cha
  // ==============================
  @Output() checkedChange = new EventEmitter<{
    value: string;
    checked: boolean;
  }>();

  @Output() updateListChange = new EventEmitter<void>();

  // ====================================================
  // Hàm hệ thống
  // ====================================================

    constructor(
      private apiService: ApiService,
      private CookieStorageService: CookieStorageService
    ) {}

  ngOnInit(): void {
    this.urlBackend_img_banner_course =
      this.apiService.API_URL + '/uploads/img/bannerCourses/';
  }

  // ====================================================
  // cập nhật trang thái checked và gửi đến component cha
  // ====================================================
  toggleChecked(event: Event) {
    const target = event.target as HTMLInputElement; // Ép kiểu thành HTMLInputElement
    const value = target.value; // Lấy giá trị của checkbox
    const checked = target.checked; // Lấy trạng thái checked
    this.checkedChange.emit({ value, checked }); // Phát sự kiện thông báo lên cha
  }


  getInstructorId(): number {
    const instructorId = this.CookieStorageService.getCookie('user');
    if (!instructorId) {
      console.log('instructorId is null');
      return -1;
    }
    const id = JSON.parse(instructorId).id;
    return id;
  }

  /* remove course out of cart */
  removeCourse(courseId: number) {
    const idInstructor = this.getInstructorId();
    if (!idInstructor) return;

    const course = this.listCourse.find(course => course.id === courseId);
    if (!course) {
      console.warn('Course not found in the list.');
      return;
    }

    const confirmRemoval = confirm(`Bạn có chắc chắn muốn xóa khóa học "${course.title}" khỏi giỏ hàng không?`);
    if (!confirmRemoval) {
      console.log('Course removal canceled by the user.');
      return;
    }

    console.log('deleteCourseFromCart-courseId:' + courseId);
    this.apiService.cartService.deleteCourseFromCart(idInstructor, courseId).subscribe({
      next: (res) => {
        if (res.success) {
          console.log('Remove course successful');
          this.listCourse = this.listCourse.filter(course => course.id !== courseId); // Update the list
          this.updateListChange.emit(); // Notify parent to update data
        }
      },
      error: (err) => {
        console.warn('Error removing course:', err);
      },
    });
  }


  //-------------------------------------
  removeSelectedCourses() {
    const idInstructor = this.getInstructorId();
    if (!idInstructor) return;

    const selectedCourses = this.listCourse.filter(course => {
      const checkbox = document.getElementById(course.id.toString()) as HTMLInputElement;
      return checkbox && checkbox.checked;
    });

    const selectedCourseIds = selectedCourses.map(course => course.id);

    if (selectedCourseIds.length === 0) {
      console.warn('No courses selected for removal.');
      return;
    }

    const courseTitles = selectedCourses.map(course => course.title).join(', ');
    const confirmRemoval = confirm(`Bạn có chắc chắn muốn xóa các khóa học sau khỏi giỏ hàng không?: ${courseTitles}?`);

    if (!confirmRemoval) {
      console.log('Course removal canceled by the user.');
      return;
    }

    console.log('deleteMultipleCoursesFromCart-courseIds:', selectedCourseIds);
    this.apiService.cartService.deleteMultipleCoursesFromCart(idInstructor, selectedCourseIds).subscribe({
      next: (res) => {
        if (res.success) {
          this.listCourse = this.listCourse.filter(course => !selectedCourseIds.includes(course.id)); // Update the list
          this.updateListChange.emit(); // Notify parent to update data
        }
      },
      error: (err) => {
        console.warn('Error removing courses:', err);
      },
    });
  }

 
}
