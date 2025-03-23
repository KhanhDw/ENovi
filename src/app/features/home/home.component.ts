import { CourseRrevailing } from './../../interface/course';
import { link } from 'node:fs';
import {
  Component,
  NgZone,
  AfterViewInit,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { CookieStorageService } from '@app/services/cookie_storage/cookie-storage.service';
import { ApiService } from '@app/services/api.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { ShareHeaderSearchService } from '@app/services/search/header_search/share-header-search.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  standalone: false,
})
export class HomeComponent implements AfterViewInit, OnInit, OnDestroy {
  urlBackend_img_banner_course: string = '';
  CourseViral: CourseRrevailing[] = [];
  CourseFree: CourseRrevailing[] = [];
  private destroy$ = new Subject<void>();
  isLoadingCourseViral = false;
  isLoadingCourseFree = false;
  searchFormMode = {
    SearchContext: '',
  };
  // ==============================
  // banner Carousel
  // ==============================
  currentIndex: number = 0;
  slides = [
    { imgage: '/img/banner/banner2.jpg' },
    { imgage: '/img/banner/banner1.jpg' },
  ];

  time = 0;
  reload = true;

  constructor(
    private ngZone: NgZone,
    private apiService: ApiService,
    private router: Router,
    private route: ActivatedRoute,
    private cookieService: CookieStorageService,
    private shareHeaderSearchService: ShareHeaderSearchService
  ) {}

  ngOnInit(): void {
    // this.startSlideShow();
    this.urlBackend_img_banner_course =
      this.apiService.API_URL + '/uploads/img/bannerCourses/';

    this.CourseViral = this.CourseViral || [];
    this.CourseFree = this.CourseFree || [];

    if (this.CourseViral.length === 0) {
      if (!this.isLoadingCourseViral) {
        this.isLoadingCourseViral = true;
        this.loadCoursePrevailing();
      }
    } 

    if (this.CourseFree.length === 0) {
      if (!this.isLoadingCourseFree) {
        this.isLoadingCourseFree = true;
        this.loadCourseFreePrevailing();
      }
    }
  }

  ngAfterViewInit(): void {
    this.ngZone.runOutsideAngular(() => {
      setInterval(() => {
        this.ngZone.run(() => {
          this.updateInforUser();
        });
      }, 500);
    });
  }

  updateInforUser(): void {
    const userString = this.cookieService.getCookie('user');
    if (userString !== null) {
      this.ngOnInit();
    }
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

  currentIndexCourseViral: number = 0;

  // Kiểm tra xem đã đến cuối danh sách chưa
  get isAtEndCourseviral(): boolean {
    return (
      this.CourseViral &&
      this.currentIndexCourseViral >= this.CourseViral.length - 1
    );
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

  currentIndexCourseFree: number = 0;

  // Kiểm tra xem đã đến cuối danh sách chưa
  get isAtEndCourseFree(): boolean {
    return this.currentIndexCourseFree >= (this.CourseFree?.length ?? 0) - 1;
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
    { name: 'Python', value: 'Python' },
    { name: 'Lập trình Web', value: 'Lập trình Web' },
    { name: 'Máy học', value: 'Máy học' },
    { name: 'Khoa học dữ liệu', value: 'Khoa học dữ liệu' },
  ];
  CourseThietKe = [
    { name: 'Blender', value: 'Blender' },
    { name: 'Adobe Photoshop', value: 'Adobe Photoshop' },
    { name: 'Thiết kế đồ họa', value: 'Thiết kế đồ họa' },
    { name: 'Chỉnh sửa video', value: 'Chỉnh sửa video' },
  ];
  CourseKinhdoanh = [
    { name: 'Quản lý dự án', value: 'Quản lý dự án' },
    { name: 'Microsoft Power BI', value: 'Microsoft Power BI' },
    { name: 'Kỹ năng bán hàng', value: 'Kỹ năng bán hàng' },
    { name: 'Phân tích kinh doanh', value: 'Phân tích kinh doanh' },
  ];
  CourseGiaotiep = [
    { name: 'Kỹ năng giao tiếp', value: 'Kỹ năng giao tiếp' },
    { name: 'Kỹ năng trình bày', value: 'Kỹ năng trình bày' },
    { name: 'Trình bày PowerPoint', value: 'Trình bày PowerPoint' },
    { name: 'Viết', value: 'Viết' },
  ];

  loadCoursePrevailing() {
    console.log('load course prevailing');

    this.apiService.courseInstructorService
      .getTopRatedCourses()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res) => {
          if (res.success) {
            this.CourseViral = res.courses;
          }
        },
        error: (error) => {
          console.error('Error fetching top-rated courses:');
        },
      });
  }

  loadCourseFreePrevailing() {
    console.log('loadCourseFreePrevailing');

    this.apiService.courseInstructorService
      .getTopRatedFreeCourses()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res) => {
          if (res.success) {
            this.CourseFree = res.courses;
          }
        },
        error: (error) => {
          console.error('Error fetching top-rated free courses:');
        },
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  goToCourseDetail(id: number, title: string) {
    this.router.navigate(['/course', id, encodeURIComponent(title)]);
  }

  //=======================

  submitSeach(searchcontext:string) { 
    // const searchcontext = this.searchFormMode.SearchContext.trim();
    if (searchcontext != '') {
      if (searchcontext.trim()) {
        this.router.navigate([], {
          relativeTo: this.route,
          queryParams: {
            title: searchcontext,
            page: this.shareHeaderSearchService.currentSearchTermPage,
          },
          queryParamsHandling: 'merge', // Giữ nguyên các query params khác nếu có
        });
      }
      // Điều hướng với query params mới
      this.router.navigate(['/search'], { 
        queryParams: { title: searchcontext },
      }).then(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
      this.fetchResults(searchcontext, 0, -1, 0, '', 0, 1, 'Mới nhất');
    }
  }

  fetchResults(
    titleSearch: string,
    ratingSearch: number,
    languageSearch: number,
    durationSearch: number,
    levelSearch: string,
    priceSearch: number,
    page: number,
    sort: string
  ) {
    if (titleSearch !== '') {
      this.apiService.searchServiceService
        .searchCoursesByTitle(
          titleSearch,
          ratingSearch,
          languageSearch,
          durationSearch,
          levelSearch,
          priceSearch,
          page,
          sort
        )
        .subscribe({
          next: (data) => {
            if (data.success) {
              this.shareHeaderSearchService.updateSearchTerm(
                titleSearch,
                ratingSearch,
                languageSearch,
                durationSearch,
                levelSearch,
                priceSearch,
                data.courses,
                data.currentPage,
                data.total,
                sort
              );
            }
          },
          error: (error) => {
            console.log(
              'Lỗi HTTP 0 self signal chứng chỉ https home component:'
            );
          },
        });
    }
  }
}
