import { ApiService } from '@app/services/api.service';
import { CourseInstructor } from './../../../interface/course';
import { Component, OnInit, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { CookieStorageService } from '@app/services/cookie_storage/cookie-storage.service';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Subject, combineLatest } from 'rxjs';
import { SharedDataService } from '@app/services/share/shared-data.service';

@Component({
  selector: 'app-courses-of-instructor',
  templateUrl: './courses-of-instructor.component.html',
  styleUrl: './courses-of-instructor.component.css',
  standalone: false,
})
export class CoursesOfInstructorComponent implements OnInit, AfterViewInit {
  urlBackend_img_banner_course:string = '';
  searchText: string = '';
  viewMode: string = 'grid';
  sortBy: string = 'newest';
  emailInstructor: string = '';
  courses: CourseInstructor[] = [];
  private sortSubject = new Subject<string>();
  private searchSubject = new Subject<string>();

  sortList = [
    { name: 'Khóa học tạo gần đây', value: 'newest' },
    { name: 'Khóa học tạo trước đây', value: 'oldest' },
    { name: 'Đánh giá cao nhất', value: 'rating_top' },
    { name: 'Đánh giá thấp nhất', value: 'rating_bottom' },
    { name: 'Khóa học Cập nhật gần nhất', value: 'update_near' },
    { name: 'Khóa học Cập nhật xa nhất', value: 'update_far' },
  ];

  constructor(
    private cookieStorageService: CookieStorageService,
    private apiService: ApiService,
    private router: Router,
    private route: ActivatedRoute,
    private sharedDataService: SharedDataService,
    private cdr: ChangeDetectorRef,

  ) {
    this.urlBackend_img_banner_course = this.apiService.API_URL+'/uploads/img/bannerCourses/';
    
  }

  ngOnInit(): void {
    this.setupSearchAndSort();
    this.fetchCourses(this.searchText, this.sortBy);
  }
  ngAfterViewInit(): void {}

  onSearch(event: any) {
    this.searchText = event.target.value;
    this.searchSubject.next(this.searchText);
    if (this.searchText === '') {
      this.fetchCourses(this.searchText, this.sortBy);
    }
  }
  emptySearch() {
    this.searchText = '';
    this.fetchCourses(this.searchText, this.sortBy);
  }

  onSortChange(sortValue: string): void {
    this.sortBy = sortValue;
    this.sortSubject.next(this.sortBy);
  }

  changeView(mode: string) {
    this.viewMode = mode;
  }

  // Setup search and sort logic
  private setupSearchAndSort(): void {
    // Search handler with debounce
    this.searchSubject
      .pipe(debounceTime(500), distinctUntilChanged())
      .subscribe((searchText) => {
        this.fetchCourses(searchText, this.sortBy);
      });

    // Sort handler (immediate trigger)
    this.sortSubject.pipe(distinctUntilChanged()).subscribe((sortBy) => {
      this.fetchCourses(this.searchText, sortBy);
    });

    // Initialize sortSubject with default value
    this.sortSubject.next(this.sortBy);
  }

  getInstructorId(): number {
    const instructorId = this.cookieStorageService.getCookie('user');
    if (!instructorId) {
      console.log('instructorId is null');
      return -1;
    }
    const id = JSON.parse(instructorId).id;
    return id;
  }

  // Centralized fetch method
  private fetchCourses(searchText: string, sortBy: string): void {
    let id = this.getInstructorId().toString();
    this.apiService.courseInstructorService
      .getSearchCourseInstructor(searchText, id, sortBy)
      .subscribe({
        next: (res) => {
          if (res.success) {
            this.courses = res.course;
          }
        },
        error: (err) => {
          console.warn('Lỗi lấy dữ liệu khóa học:');
        },
      });
  }

  goToCourseDetail(id: number, title: string) {
    this.router.navigate(['/course', id, encodeURIComponent(title ?? '')]);
  }

  postDeleteCourseInstructorId(id: number) {
    if (confirm('Bạn có chắc chắn muốn xóa khóa học này không?')) {
      console.log(id);
      this.apiService.courseInstructorService
        .DeleteCourseInstructor(id.toString())
        .subscribe({
          next: (res) => {
            if (res.success) {
              alert('Xóa khóa học thành công');
              // window.location.reload();
              this.fetchCourses(this.searchText, this.sortBy);
              this.cdr.detectChanges();
            }else{
              alert('Xóa khóa học thất bại');
            }
          },
          error: (err) => {
            alert('Lỗi xay ra khi xóa khóa học');
            console.log('Thất bại: ' + err);
          },
        });
    } else {
      console.log('Hủy xóa khóa học');
    }
  }

  goUpdateCourse(idCourse: number, title: string) {
    let intructorId = this.getInstructorId().toString();
    this.sharedDataService.setIdCourse(idCourse.toString());
    this.router.navigate(['update', encodeURIComponent(title?title:'')], {
      relativeTo: this.route,
    });
  }

  // Generate star array for rating
  getStarArray(rating: number): number[] {
    return Array(5)
      .fill(0)
      .map((_, i) => (i < Math.floor(rating) ? 1 : 0));
  }


  taoKhoaHoc() {
    this.router.navigate(['/user/instructor/courses-instructor/new']);
  }
}
