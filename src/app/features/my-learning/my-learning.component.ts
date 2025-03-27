import { CourseMyLearning } from './../../interface/course';
import { Component } from '@angular/core';
import { MyLearningService } from './../../services/my-learning/my-learning.service';
import { OnInit } from '@angular/core';
import { CookieStorageService } from '@app/services/cookie_storage/cookie-storage.service';
import { ApiService } from '@app/services/api.service';
import { NgModel } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-my-learning',
  templateUrl: './my-learning.component.html',
  styleUrl: './my-learning.component.css',
  standalone: false,
})
export class MyLearningComponent implements OnInit {
  lengthListMyCourses = 0;
  urlBackend_img_banner_course: string = '';

  // =========================
  // list courses
  // =========================
  listCourse: CourseMyLearning[] = [];

  searchQuery: string = ''; // Holds the search input value
  isSearchPerformed: boolean = false; // Tracks if a search has been performed

  constructor(
    private myLearningService: MyLearningService,
    private cookieStorageService: CookieStorageService,
    private apiService: ApiService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.urlBackend_img_banner_course =
      this.apiService.API_URL + '/uploads/img/bannerCourses/';
    const userId = this.getInstructorId();

    this.getMyLearningData(userId);
  }

  // dùng trackby để tăng hiệu suất render
  trackByFn(index: number, item: any): any {
    return item.id; // Hoặc một thuộc tính duy nhất khác của item
  }

  // ====================
  // button sort by
  // ====================
  isOpenDropdownSortBy: boolean = false;

  sortby = [{ name: 'Tăng dần' }, { name: 'Giảm dần' }, { name: 'Mới nhất' }];

  toggleSortBy() {
    this.isOpenDropdownSortBy = !this.isOpenDropdownSortBy;
  }

  // ====================
  // Service methods
  // ====================

  getInstructorId(): number {
    const instructorId = this.cookieStorageService.getCookie('user');
    if (!instructorId) {
      console.log('instructorId is null');
      return -1;
    }
    const id = JSON.parse(instructorId).id;
    return id;
  }

  addToMyLearning(userId: number, courseId: number) {
    const payload = { userId, courseId };
    this.myLearningService.addToMyLearning(payload).subscribe({
      next: (response) => {
        console.log('Course added successfully:', response);
        this.getMyLearningData(userId); // Refresh the list
      },
      error: (error) => {
        console.error('Error adding course:', error);
      },
    });
  }

  getMyLearningData(userId: number) {
    this.myLearningService.getMyLearningByUserId(userId).subscribe({
      next: (data) => {
        this.listCourse = data;
        this.lengthListMyCourses = data.length;
      },
      error: (error) => {
        console.error('Error fetching courses i my learning:');
      },
    });
  }

  removeFromMyLearning(userId: number, courseId: number) {
    const payload = { userId, courseId };
    this.myLearningService.removeFromMyLearning(payload).subscribe({
      next: (response) => {
        console.log('Course removed successfully:', response);
        this.getMyLearningData(userId); // Refresh the list
      },
      error: (error) => {
        console.error('Error removing course:', error);
      },
    });
  }

  onDeleteCourse(courseId: number) {
    const userId = this.getInstructorId();
    if (!confirm('Bạn có chắc chắn muốn xóa khóa học này không?')) {
      return; // Thoát nếu người dùng hủy xác nhận
    }
    this.removeFromMyLearning(userId, courseId);
  }

  searchCourses() {
    const userId = this.getInstructorId();
    if (!this.searchQuery.trim()) {
      return; // Do nothing if search query is empty
    }

    this.myLearningService.searchCoursesByName(userId, this.searchQuery).subscribe({
      next: (data) => {
        this.listCourse = data;
        this.lengthListMyCourses = data.length;
        this.isSearchPerformed = true; // Set to true when search is performed
      },
      error: (error) => {
        console.error('Error searching courses:', error);
      },
    });
  }

  clearSearch() {
    const userId = this.getInstructorId();
    this.searchQuery = ''; // Clear the search input
    this.getMyLearningData(userId); // Fetch the original list of courses
    this.isSearchPerformed = false; // Reset to false when search is cleared
  }

 
}
