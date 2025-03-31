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
import { VgApiService } from '@videogular/ngx-videogular/core';


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
    listCourseBuy: [-1],
  };
  listCourseBuy: number[] = [];

  SoLanDaDanhGia: number = 0;
  listComment: {
    id: number;
    userId: number;
    courseId: number;
    rating: number;
    content: string;
    createdAt: Date;
    avatar: string;
    username: string;
  }[] = [];

  sao1: number = 0;
  sao2: number = 0;
  sao3: number = 0;
  sao4: number = 0;
  sao5: number = 0;

  contentComment: string = '';

  buttonsRating: number[] = [1, 2, 3, 4, 5];
  selectedRating: number | null = null; // Rating được chọn
  hoveredRating: number | null = null; // Rating đang hover

  checkVideoIntro: boolean = false;
  introVideo: string = '';
  videoUrl$ = new BehaviorSubject<string | null>(null);
  videoUrl = `https://localhost:3000/stream/video?namevideo=${this.introVideo}`;
  @ViewChild('player', { static: false }) playerElement!: ElementRef;
  @ViewChild('media') videoElement!: ElementRef<HTMLVideoElement>;



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
    this.fetchTotalRatings(this.courseId);
    this.fetchComments(this.courseId);
    this.getRatingsBreakdown(this.courseId);
   
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

                this.introVideo = res.course[0].intro_video;
                console.log('this.introVideo', this.introVideo);
                this.videoUrl$.next(
                  `https://localhost:3000/stream/video?namevideo=${this.introVideo}`
                );
                // Cập nhật avatar thông qua Subject
                this.updateAvatar(res.course[0].instructorAvatar);

                this.getSectionFetch(Number(rawId));
                this.renderStars();
                this.getLanguages();

                this.onPlayerReady(this.playerElement);

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


  onPlayerReady(player: any) {
    if (player) {
      this.checkVideoIntro = false;
      return;
    } else {
      this.videoUrl$.next(
        `https://localhost:3000/stream/video?namevideo=${this.introVideo}`
      );
      this.checkVideoIntro = true;
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
    this.videoElement.nativeElement.pause();
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

    if (changes['introVideo'] && changes['introVideo'].currentValue) {
      console.log('Dữ liệu cập nhật: thay đổi introVideo', this.introVideo);
      this.videoUrl$.next(
        `https://localhost:3000/stream/video?namevideo=${this.introVideo}`
      );
      this.introVideo = changes['introVideo'].currentValue;
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
    this.listCourseBuy[0] = courseId;

    this.orderData.amount = Math.floor(
      this.courseDetailAPI.price *
        (1 - this.courseDetailAPI.percent_discount / 100)
    );

    this.orderData.listCourseBuy[0] = courseId;

    localStorage.setItem('paymentData', JSON.stringify(this.orderData));
    // this.cookieStorageService.setCookie('paymentData', JSON.stringify(this.orderData),1);

    // this.createPayment(
    //   this.orderData.amount,
    //   this.orderData.language,
    //   this.orderData.orderType,
    //   this.orderData.orderDescription,
    //   this.orderData.orderId,
    //   this.listCourseBuy,
    //   userId
    // );

    // this.addCourseToMyLearning(courseId);
    window.location.href = '/payment';
  }

  createPayment(
    amount: any,
    language: any,
    orderType: any,
    orderDescription: any,
    orderId: any,
    listCourseBuy: number[],
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
    this.vnpayService
      .createPayment(paymentData, listCourseBuy, userId)
      .subscribe({
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

  // ====================
  //  rating course
  // ====================

  submitRating(rating: number): void {
    const userId = this.getInstructorId();

    this.apiService.ratingService
      .addRating(userId, this.courseId, rating)
      .subscribe({
        next: (response) => {
          if (response.success) {
            console.log('Rating submitted successfully:', response.message);
            this.fetchTotalRatings(this.courseId);
          } else {
            console.warn('Failed to submit rating:', response.message);
          }
        },
        error: (error) => {
          console.warn('Error submitting rating:', error.message);
        },
      });
  }

  //  lấy tổng số lần khóa học được đánh giá
  fetchTotalRatings(courseId: number): void {
    this.apiService.ratingService.getTotalRatings(courseId).subscribe({
      next: (response) => {
        console.log('Total ratings fetched successfully:', response);
        this.SoLanDaDanhGia = response.totalRatings || 0;
        this.renderStars();
        this.cdRef.detectChanges();
      },
      error: (error) => {
        console.warn('Error fetching total ratings:');
      },
    });
  }

  getRatingsBreakdown(courseId: number): void {
    this.apiService.ratingService.getRatingsBreakdown(courseId).subscribe({
      next: (response) => {
        console.log('Ratings breakdown fetched successfully:', response);
        // Assuming the breakdown data is returned in the response
        const breakdown = response.breakdown || {};
        // Update a property or handle the breakdown data as needed
        this.handleRatingsBreakdown(breakdown);
      },
      error: (error) => {
        console.warn('Error fetching ratings breakdown:', );
      },
    });
  }

  private handleRatingsBreakdown(breakdown: any): void {
    // Process and update the UI or component state with the breakdown data
    console.log('Processed ratings breakdown:', breakdown);
    // Example: Update a property to display in the UI
    // this.ratingsBreakdown = breakdown;

    let Var_sao1 = breakdown[0] || 0;
    let Var_sao2 = breakdown[1] || 0;
    let Var_sao3 = breakdown[2] || 0;
    let Var_sao4 = breakdown[3] || 0;
    let Var_sao5 = breakdown[4] || 0;

    const totalRatings = Var_sao1 + Var_sao2 + Var_sao3 + Var_sao4 + Var_sao5;

    this.sao1 =
      totalRatings > 0 ? Math.ceil((Var_sao1 / totalRatings) * 100) : 0;
    this.sao2 =
      totalRatings > 0 ? Math.ceil((Var_sao2 / totalRatings) * 100) : 0;
    this.sao3 =
      totalRatings > 0 ? Math.ceil((Var_sao3 / totalRatings) * 100) : 0;
    this.sao4 =
      totalRatings > 0 ? Math.ceil((Var_sao4 / totalRatings) * 100) : 0;
    this.sao5 =
      totalRatings > 0 ? Math.ceil((Var_sao5 / totalRatings) * 100) : 0;

    console.log('Percentage for each star:', {
      Var_sao1,
      Var_sao2,
      Var_sao3,
      Var_sao4,
      Var_sao5,
    });
    console.log(
      'Percentage for each star:111111',
      this.sao1,
      this.sao2,
      this.sao3,
      this.sao4,
      this.sao5
    );
  }

  // ====================
  //  comment course
  // ====================

  addComment(courseId: number, content: string): void {
    const userId = this.getInstructorId();
    const commentData = { courseId, content };
    this.apiService.commentService
      .addComment(userId, courseId, content)
      .subscribe({
        next: (response) => {
          console.log('Comment added successfully:', response);
          this.fetchComments(courseId); // Refresh comments after adding
        },
        error: (error) => {
          console.error('Error adding comment:', error);
        },
      });
  }

  deleteComment(commentId: number, courseId: number): void {
    const userId = this.getInstructorId();
    this.apiService.commentService.deleteComment(commentId).subscribe({
      next: (response) => {
        console.log('Comment deleted successfully:', response);
        this.fetchComments(courseId); // Refresh comments after deletion
      },
      error: (error) => {
        console.error('Error deleting comment:', error);
      },
    });
  }

  fetchComments(courseId: number): void {
    const userId = this.getInstructorId();
    this.apiService.commentService
      .getCommentsByCourseId(courseId, userId)
      .subscribe({
        next: (response) => {
          console.log('Comments fetched successfully:', response);
          this.listComment = response.comments || [];
          this.cdRef.detectChanges();
        },
        error: (error) => {
          console.error('Error fetching comments:', );
        },
      });
  }

  postComment() {
    if (
      this.contentComment.trim() === '' ||
      this.selectedRating === null ||
      this.selectedRating === 0
    ) {
      alert('Nội dung bình luận và đánh giá không được để trống');
      return;
    }
    // console.log('this.selectedRating: ', this.selectedRating);
    // console.log('this.contentComment: ', this.contentComment);
    this.submitRating(this.selectedRating || 0);
    this.addComment(this.courseId, this.contentComment);
    this.contentComment = ''; // Reset the comment input
  }

  setRating(rating: number) {
    this.selectedRating = rating;
  }

  setHover(rating: number) {
    this.hoveredRating = rating; // Cập nhật rating khi hover
  }

  clearHover() {
    this.hoveredRating = null; // Xóa hover khi chuột rời khỏi
  }

  // ====================
  //  video intro 
  // ====================
 

  decodeHTML(str: string): string {
    const doc = new DOMParser().parseFromString(str, "text/html");
    return doc.body.textContent || "";
  }
}
