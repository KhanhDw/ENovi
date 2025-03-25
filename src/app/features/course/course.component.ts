import { Course } from './../../interface/course';
import {
  Directive,
  Component,
  ElementRef,
  HostListener,
  ViewChild,
  OnChanges,
  SimpleChanges,
  ChangeDetectorRef,
  OnInit,
  AfterViewInit,
  NgZone,
  ChangeDetectionStrategy,
  OnDestroy,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '@app/services/api.service';
import { CourseDetail } from '@app/interface/course';
import { take, takeUntil } from 'rxjs/operators';
import { CookieStorageService } from '@app/services/cookie_storage/cookie-storage.service';
import { MyLearningService } from '@app/services/my-learning/my-learning.service';
import { BehaviorSubject, Subject } from 'rxjs';
import { UserServiceService } from '@app/services/user/user-service.service';
import { VnpayService } from '@app/services/vnpay/vnpay.service';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrl: './course.component.css',
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CourseComponent
  implements OnInit, AfterViewInit, OnChanges, OnDestroy
{
  private destroy$ = new Subject<void>();
  private avatarSubject = new BehaviorSubject<string>('');
  avatarUrl$ = this.avatarSubject.asObservable();

  urlBackend_img_avatar = '';
  courseId: number = -1;
  courseDetail: any;
  courseDetailAPI!: CourseDetail;
  instructorAvatar: string = '';
  rating: number = 0;
  stars: string[] = [];
  language: string = '';
  Showlanguage: string = '';
  whatToLearn: any;
  section: any;
  listLecture: any;
  totalEnroll: number = 0;
  instructorId: number = -1;
  instructorName: string = '';
  totalCourse: number = -1;
  instructorBio: string = '';

  sumLesson: any;

  languageList: any;

  courseTitle: string = '';

  courseExitCart: boolean = false;
  courseCategories: any[] = [];

  courseInMyLearning: boolean = false;

  orderData = {
    amount: 100000,
    orderDescription: 'Thanh toán đơn hàng khóa học trực tuyến',
    orderType: 'billpayment',
    language: 'vn',
    orderId: new Date()
      .toLocaleString('vi-VN', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      })
      .replace(/[\/\s,:]/g, ''),
  };
  listCourseBuy: string[] = [];

  constructor(
    private elementRef: ElementRef,
    private route: ActivatedRoute,
    private apiService: ApiService,
    private ngZone: NgZone,
    private cookieStorageService: CookieStorageService,
    private cdRef: ChangeDetectorRef,
    private myLearningService: MyLearningService,
    private userServiceService: UserServiceService,
    private vnpayService: VnpayService
  ) {
    this.urlBackend_img_avatar =
      this.apiService.API_URL + '/uploads/img/avartaUser/';
  }

  ngOnInit() {
    this.courseDetailFetch();
    // Subscribe to avatar changes
    // this.avatarUrl$.subscribe(url => {
    //   this.instructorAvatar = url;
    //   this.cdRef.detectChanges();
    // });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  // Thêm phương thức để cập nhật avatar
  updateAvatar(avatarPath: string) {
    if (avatarPath) {
      this.avatarSubject.next(avatarPath);
    }
  }

  // ====================
  // get course fetch
  // ==================

  courseDetailFetch() {
    if (!this.courseDetailAPI) {
      const rawTitle = this.route.snapshot.paramMap.get('title') || '';
      const rawId = this.route.snapshot.paramMap.get('id') || -1;
      this.courseId = Number(rawId);

      this.checkCourseInMyLearning(this.courseId);
      this.isCourseInCart(this.courseId);
      this.getCourseCategories(this.courseId);

      this.route.paramMap.subscribe((params) => {
        this.apiService.courseDetailServiceService
          .GetCourseDetailAPI(
            decodeURI(rawId.toString())!,
            decodeURI(rawTitle)!,
            this.getInstructorId().toString()
          )
          .subscribe({
            next: (res) => {
              if (res.course && res.course.length > 0) {
                this.courseDetail = res.course[0];
                this.courseDetailAPI = res.course[0];
                this.rating = parseFloat(res.course[0].rating);
                this.language = res.course[0].languages;
                this.whatToLearn = res.course[0].whatToLearn;
                this.totalEnroll = res.course[0].totalStudents;
                this.instructorId = res.course[0].instructorId;
                this.instructorName = res.course[0].instructorName;
                this.totalCourse = res.totalCourses;
                this.instructorBio = res.course[0].instructorBiography;
                // Cập nhật avatar thông qua Subject
                this.updateAvatar(res.course[0].instructorAvatar);

                this.getSectionFetch(Number(rawId));
                this.renderStars();
                this.getLanguages();
                this.cdRef.detectChanges();
              } else {
                console.warn('Không có dữ liệu course');
              }
            },
            error: (e) => {
              console.warn('HttpErrorResponse course.components.ts');
            },
          });
      });

      if (this.courseId !== -1) {
        this.checkCourseInMyLearning(this.courseId);
      }
    }
  }

  // ====================
  // handle image error
  // ====================

  handleImageError(event: any) {
    console.error('Lỗi tải ảnh:', event);
    // Có thể set ảnh mặc định
    event.target.src = './img/avatar.png';
  }

  // ====================
  // get user id
  // ====================

  getInstructorId(): number {
    const userInfo = this.userServiceService.getUserLogin();
    if (!userInfo || userInfo.id === -1) {
      return 0; // Trả về 0 nếu chưa đăng nhập
    }
    return userInfo.id;
  }

  // ====================
  // Section
  // ====================

  toggleSection(section: any): void {
    this.section.forEach((item: any) => {
      if (item.id === section.id) {
        item.show = !section.show;
        console.log(item);
      }
    });
  }

  handleSectionClick(section: any, index: number): void {
    this.getListLectureOfSection(section);
  }

  // ====================
  // requirements
  // ====================

  requirements = [
    { content: 'requirement 1' },
    { content: 'requirement 2' },
    { content: 'requirement 3' },
  ];

  // ====================
  // Description
  // ====================

  showMoreDescription = false;

  toggleShowMoreDescription() {
    this.showMoreDescription = !this.showMoreDescription;
  }
  // ====================
  // Instructor
  // ====================

  showMoreInstructor = false;

  toggleShowMoreInstructor() {
    this.showMoreInstructor = !this.showMoreInstructor;
  }

  // ====================
  // css for sidebar
  // ====================
  @ViewChild('infor_bottom') inforBottomElement!: ElementRef;
  @ViewChild('sidebar') sidebarElement!: ElementRef;
  @ViewChild('infor_top') inforTopElement!: ElementRef;

  ngAfterViewInit(): void {
    this.ngZone.runOutsideAngular(() => {
      setTimeout(() => {
        this.syncSidebarHeight();
      }, 100);
    });
  }

  @HostListener('window:resize')
  onResize() {
    // cập nhật thay đổi cửa kích thước cửa sổ
    setTimeout(() => this.syncSidebarHeight(), 100); // Đợi 100ms để đảm bảo DOM đã cập nhật
  }

  private syncSidebarHeight(): void {
    if (
      !this.inforBottomElement ||
      !this.inforTopElement ||
      !this.sidebarElement
    ) {
      //  console.log("check side height course");
      setTimeout(() => this.syncSidebarHeight(), 100); // Gọi lại sau 100ms
      return; // Dừng nếu phần tử chưa sẵn sàng
    }

    const inforBottomHeight =
      this.inforBottomElement.nativeElement.offsetHeight;
    const inforTopHeight = this.inforTopElement.nativeElement.offsetHeight;

    let inforHeight = inforBottomHeight + inforTopHeight;

    this.sidebarElement.nativeElement.style.height = `${inforHeight}px`;
  }

  // ====================
  // scroll show header
  // ====================
  private scrollPosition = 0;
  showHeader = false;

  @ViewChild('headerInfor') headerInfo!: ElementRef;

  @HostListener('window:scroll', ['$event'])
  onScroll(event: Event) {
    const scrollY = window.scrollY;

    if (scrollY > 64 && this.scrollPosition <= 64) {
      this.showHeader = true;
    } else if (scrollY <= 64 && this.scrollPosition > 64) {
      this.showHeader = false;
    }
    this.scrollPosition = scrollY;
  }

  // ==================================
  // show modal preview video of course
  // ==================================

  showModal = false;

  toggleShowModal() {
    this.showModal = !this.showModal;
  }

  reportComment() {
    console.log('report comment invalid');
  }

  // =============================
  // show modal comment of course
  // =============================

  showCommentModal = false;

  toggleShowCommentModal() {
    this.showCommentModal = !this.showCommentModal;
  }

  // ================================
  // hidden modal when click free zone
  // ================================

  hiddenModalPreviewVideo(event: Event) {
    this.toggleShowModal();
  }
  hiddenModalComment(event: Event) {
    this.toggleShowCommentModal();
  }

  // ==================
  // show more subtitle
  // ==================

  isShowSubtitle = false;
  toggleShowSubtitle() {
    this.isShowSubtitle = !this.isShowSubtitle;
  }

  // ====================
  //  API
  // ====================

  // star rating

  ngOnChanges(changes: SimpleChanges) {
    if (changes['rating']) {
      this.renderStars();
      this.cdRef.detectChanges();
    }
  }

  renderStars() {
    this.stars = [];
    if (!this.rating) return;

    let fullStars = Math.floor(this.rating);
    let hasHalfStar = this.rating - fullStars > 0.5;
    let emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    for (let i = 0; i < fullStars; i++) {
      this.stars.push('bi bi-star-fill');
    }
    if (hasHalfStar) {
      this.stars.push('bi bi-star-half');
    }
    for (let i = 0; i < emptyStars; i++) {
      this.stars.push('bi bi-star');
    }

    this.cdRef.detectChanges();
  }

  getSectionFetch(courseId: number) {
    this.apiService.courseInstructorService.getSection(courseId).subscribe({
      next: (res) => {
        if (res.success) {
          this.section = res.sectionFetch.map((section: any) => ({
            ...section,
            show: false,
          }));

          this.sumLesson = res.sumLesson[0].sumLesson;

          this.cdRef.detectChanges();
        }
      },
      error: (err) => {
        console.log('lỗi getSectionFetch http response: ');
      },
    });
  }

  getLanguages() {
    this.apiService.listLanguageServiceService.getLanguages().subscribe({
      next: (res) => {
        if (res.success) {
          this.languageList = res.listLanguages;
          const matchedLanguage = this.languageList.find(
            (lang: any) => lang.language_code === this.language
          );
          if (matchedLanguage) {
            this.Showlanguage = matchedLanguage.language_name;
          } else {
            this.Showlanguage = this.language;
          }
          this.cdRef.detectChanges();
        }
      },
      error: (err) => {
        console.log('lỗi lấy languages https response: ');
      },
    });
  }

  getListLectureOfSection(sectionID: number) {
    this.apiService.courseInstructorService
      .getLessionBySectionId(sectionID, this.courseId)
      .subscribe({
        next: (res) => {
          if (res?.success) {
            this.listLecture = res.lessionList;
            console.log('res.lessionList: ' + this.listLecture.length);
            this.cdRef.detectChanges();
          }
        },
        error: (err) => {
          console.log('lỗi getListLectureOfSection http response: ');
        },
      });
  }

  addCourseToCart(courseId: number): void {
    if (this.courseExitCart) return;

    const userId = this.getInstructorId();
    this.apiService.cartService.addCourseToCart(userId, courseId).subscribe({
      next: (res) => {
        if (res?.success) {
          console.log('Course added to cart successfully');
          this.courseExitCart = true;
          this.cdRef.detectChanges();
        } else {
          console.warn('Failed to add course to cart');
        }
      },
      error: (err) => {
        console.error('Error adding course to cart:');
      },
    });
  }

  //===

  isCourseInCart(courseId: number): void {
    const userId = this.getInstructorId();
    this.apiService.cartService.isCourseInCart(userId, courseId).subscribe({
      next: (res) => {
        if (res) {
          console.log(
            (res as any).isInCart
              ? (this.courseExitCart = true)
              : (this.courseExitCart = false)
          );
          this.cdRef.detectChanges();
        } else {
          console.warn('Failed to check if course is in the cart');
        }
      },
      error: (err) => {
        console.error('Error checking course in cart:');
      },
    });
  }

  getCourseCategories(courseId: number): void {
    this.apiService.categoriesServiceService
      .GetCourseCategories(courseId)
      .subscribe({
        next: (res) => {
          if (res?.success) {
            this.courseCategories = res.courseCategories.map(
              (category: any) => ({
                courseCategoryId: category.courseCategoryId,
                categoryName:
                  category.category_name ||
                  category.categoryV1_name ||
                  category.categoryV2_name,
              })
            );
            console.log(
              'Course categories fetched successfully:',
              this.courseCategories
            );
          } else {
            console.warn('Failed to fetch course categories');
          }
        },
        error: (err) => {
          console.error('Error fetching course categories:');
        },
      });
  }

  addCourseToMyLearning(courseId: number): void {
    const userId = this.getInstructorId();
    if (userId === -1) {
      console.warn('Người dùng chưa đăng nhập');
      return;
    }

    this.myLearningService.addToMyLearning({ userId, courseId }).subscribe({
      next: (res) => {
        if (res?.success) {
          console.log('Đã thêm khóa học vào My Learning thành công');
          this.courseInMyLearning = true;
          this.addEnrollCourse(courseId);
          this.cdRef.detectChanges();
        } else {
          console.warn('Không thể thêm khóa học vào My Learning');
        }
      },
      error: (err) => {
        console.error('Lỗi khi thêm khóa học vào My Learning:');
      },
    });
  }

  checkCourseInMyLearning(courseId: number): void {
    const userId = this.getInstructorId();
    if (userId === -1) {
      this.courseInMyLearning = false;
      this.cdRef.detectChanges();
      return;
    }

    this.myLearningService.checkCourseInMyLearning(userId, courseId).subscribe({
      next: (res) => {
        if (res?.success) {
          this.courseInMyLearning = res.exists;
          this.cdRef.detectChanges();
          console.log(
            'Trạng thái khóa học trong My Learning:',
            this.courseInMyLearning
          );
        } else {
          console.log(
            'Trạng thái khóa học trong My Learning lỗi:',
            this.courseInMyLearning
          );
          this.courseInMyLearning = false;
          this.cdRef.detectChanges();
        }
      },
      error: (err) => {
        this.courseInMyLearning = false;
        this.cdRef.detectChanges();

        if (err.status === 500) {
          console.error(
            'Lỗi server khi kiểm tra khóa học trong My Learning:',
            err.error.error
          );
        } else {
          console.error('Lỗi khi kiểm tra khóa học trong My Learning:');
        }
      },
    });
  }

  addEnrollCourse(courseId: number): void {
    const userId = this.getInstructorId();
    if (userId === -1) {
      console.log('Người dùng chưa đăng nhập');
      return;
    }

    this.apiService.enrollmentService
      .addEnrollment(userId, courseId)
      .subscribe({
        next: (res) => {
          if (res?.success) {
            console.log('Đăng ký khóa học thành công');
            this.courseInMyLearning = true;
            this.cdRef.detectChanges();
          } else {
            console.log('Đăng ký khóa học thất bại');
          }
        },
        error: (err) => {
          if (err.status === 500) {
            console.error('Lỗi server khi đăng ký khóa học:', err.error.error);
          } else {
            console.error('Lỗi khi đăng ký khóa học:');
          }
        },
      });
  }

  // buy course
  buyCourse(courseId: number): void {
    const userId = this.getInstructorId();
    if (userId === -1) {
      console.warn('Người dùng chưa đăng nhập');
      return;
    }
    this.listCourseBuy[0] = courseId.toString();

    this.createPayment(
      this.orderData.amount,
      this.orderData.language,
      this.orderData.orderType,
      this.orderData.orderDescription,
      this.orderData.orderId,
      this.listCourseBuy,
      userId
    );


    // this.addCourseToMyLearning(courseId);
  }

  createPayment(
    amount: any,
    language: any,
    orderType: any,
    orderDescription: any,
    orderId: any,
    listCourseBuy:string[],
    userId: number
  ) {
    // Cấu hình các tham số thanh toán
    const paymentData = {
      amount: amount,
      bankCode: 'NCB', // Tạm thời chọn ngân hàng NCB để test
      language: language,
      orderType: orderType,
      orderDescription: orderDescription,
      orderRef: orderId,
    };

    // Gọi service để tạo URL thanh toán
    this.vnpayService.createPayment(paymentData, listCourseBuy, userId).subscribe({
      next: (response) => {
        if (response.urlvnpay) {
          // Chuyển hướng sang trang thanh toán VNPay
          window.location.href = response.urlvnpay;
        } else {
          console.error('Lỗi tạo URL thanh toán: Không nhận được URL');
        }
      },
      error: (error) => {
        console.error('Lỗi kết nối:', error);
      },
    });
  }
}
