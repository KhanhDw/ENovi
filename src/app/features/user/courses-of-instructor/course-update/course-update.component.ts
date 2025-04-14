import { CourseUpdate } from './../../../../interface/course';
import { QuillModules } from 'ngx-quill';
import { BehaviorSubject } from 'rxjs';

import { ApiService } from '@app/services/api.service';
import {
  Component,
  OnInit,
  AfterViewInit,
  HostListener,
  NgZone,
  ViewChild,
  ElementRef,
  ChangeDetectorRef,
  Renderer2,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { CookieStorageService } from '@app/services/cookie_storage/cookie-storage.service';
import { SharedDataService } from '@app/services/share/shared-data.service';
import { UploadImgServerService } from '@app/services/upload_img_server/upload-img-server.service';
import { FormsModule, NgModel } from '@angular/forms';
import { error } from 'node:console';
import { SectionUpdateCourse } from '@app/interface/section';
import { LessonUpdate } from '@app/interface/lecture';
import { UploadVideoService } from '@app/services/upload_video/upload-video.service';

@Component({
  selector: 'app-course-update',
  templateUrl: './course-update.component.html',
  styleUrl: './course-update.component.css',
  standalone: false,
})
export class CourseUpdateComponent implements OnInit, AfterViewInit {
  urlBackend_img_banner_course: string = '';
  checkParamsFetch: boolean = false;
  courseFetch: CourseUpdate[] = [];

  showSelectCategorie: boolean = false;
  categories: any[] = []; // Lĩnh vực
  categoriesV1: any[] = []; // Chuyên ngành
  categoriesV2: any[] = []; // Phân mục

  selectedCategory: any = null;
  selectedSubCategories: any[] = [];
  selectedItems: any[] = [];
  selectedItemsList: any[] = []; // danh sách các item được chọn

  savedCategory: any = null; // Lưu lĩnh vực đã chọn
  savedSubCategories: any[] = []; // Lưu chuyên ngành đã chọn
  savedItems: any[] = []; // Lưu phân mục đã chọn

  SaveCategories: any[] = []; // Mảng lưu tất cả các mục đã chọn khi fetch course

  getCategoriesALL: any[] = []; // lưu mảng ban đầu để đối chiếu

  errorMessageCategory: string = '';

  priceCourse: string = '100111000'; // Lưu giá trị số không có dấu chấm
  formattedPrice: string = ''; // Hiển thị số có dấu chấm
  @ViewChild('fileInputImg') fileInput!: ElementRef<HTMLInputElement>;
  @ViewChild('fileInputVideo') fileVideoInput!: ElementRef<HTMLInputElement>;
  @ViewChild('fileInputIntro_video')
  fileIntroVideoInput!: ElementRef<HTMLInputElement>;
  imageUrl: string | ArrayBuffer | null = null;
  imageName: string | null = null;
  errorMessage: string = '';
  allowedTypes: string[] = ['image/png', 'image/jpeg', 'image/jpg']; // Danh sách định dạng ảnh được chấp nhận
  isHoveringImg: boolean = false;
  // upload file img server
  base64String: string = '';
  // mô tả overviwe courese
  textAreaIntroduceCourse: string = '';
  wordCount: number = 0;
  // save default data fetchcourse
  textAreaIntroduceCourseDefault: string = '';
  languageDefault: string = '';
  subtitleDefault: string = '';
  levelDefault: string = '';
  whattolearnDefault: string = '';
  requirementKnowlegdeDefault: string = '';
  descriptionDefault: string = '';
  SectionDefault: SectionUpdateCourse[] = [];
  // change name section
  isEditNameSection: boolean = false;
  sectionId: number = -1;
  nameSection: string = '';
  nameSectionDefault: string = '';
  orderSectionDefault: number = -1;
  idSectionDefault: number = -1;
  isCreatingSection: boolean = false;
  ClickedSection: boolean = false;
  // lecture
  listLecture: LessonUpdate[] = [];
  isEditNameLecture: boolean = false;
  nameLecture: string = '';
  idLecture: number = -1;
  // video
  selectedVideoFile: File | null = null;
  uploadVideoMessage = 'Chưa có video';
  nameVideo: string = '';
  uploadStatus: string = '';
  uploading = false;
  uploadComplete = false;

  updateCourse = {
    id: '',
    title: '',
    img: '',
    categories: '',
    description: '',
    overview: '',
    price: '',
    level: '',
    subtitles: '',
    languages: '',
    whattolearn: '',
    requireKnowledge: '',
    section: [] as SectionUpdateCourse[],
  };

  contentOfSection = [
    {
      name: 'Phần 1: Ánh sáng cuối con đường',
    },
  ];

  levelList = [
    {
      name: 'Tất cả trình độ',
      value: 'all',
    },
    {
      name: 'Nhập môn',
      value: 'beginner',
    },
    {
      name: 'trung cấp',
      value: 'intermediate',
    },
    {
      name: 'nâng cao',
      value: 'advanced',
    },
  ];

  languageList = [{ language_name: 'Tiếng Việt', language_code: 'Việt' }];

  @ViewChild('player', { static: false }) playerElement!: ElementRef;
  @ViewChild('media') videoElement!: ElementRef<HTMLVideoElement>;
  introVideo: string = 'intro11_1.mp4';
  videoUrl$ = new BehaviorSubject<string | null>(null);
  videoUrl = `https://localhost:3000/stream/video?namevideo=${this.introVideo}`;

  private isReloadingBySystem = false;
  checkVideoIntro: boolean = false;
  errorMessageIntroVideo: string = '';
  introvideoUrl: string | null = null;
  introVideoName: string = '';
  submitUploadIntroVideo: boolean = false;
  fileVideoIntroRaw: any;

  constructor(
    private cookieStorageService: CookieStorageService,
    private apiService: ApiService,
    private router: Router,
    private route: ActivatedRoute,
    private ngZone: NgZone,
    private sharedDataService: SharedDataService,
    private uploadImgServerService: UploadImgServerService,
    private cdr: ChangeDetectorRef,
    private uploadVideoService: UploadVideoService
  ) {
    this.urlBackend_img_banner_course =
      this.apiService.API_URL + '/uploads/img/bannerCourses/';
  }
  ngAfterViewInit(): void {}

  ngOnInit(): void {
    this.updateCourse.section = [];
    
    if (this.SaveCategories.length === 0) {
      this.fetchCourse();
      this.onLanguageChange(this.languageList[0].language_code);
      this.onLevelChange(this.levelList[0].value);
    }
    
    this.loadCategoriesFromCookie();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['introVideo'] && changes['introVideo'].currentValue) {
      console.log('Dữ liệu cập nhật: thay đổi introVideo', this.introVideo);
      this.videoUrl$.next(
        `https://localhost:3000/stream/video?namevideo=${this.introVideo}`
      );
      this.introVideo = changes['introVideo'].currentValue;
      localStorage.setItem('introVideo', JSON.stringify(this.introVideo));
      this.reloadPageFromCode();
    }
  }

  onPlayerReady(player: any) {
    if (player) {
      this.checkVideoIntro = false;
      return;
    } else {
      // console.log('san sang hahahah1111');
      this.videoUrl$.next(
        `https://localhost:3000/stream/video?namevideo=${this.introVideo}`
      );
      this.checkVideoIntro = true;
    }
  }

  reloadPageFromCode() {
    sessionStorage.setItem('reloadBySystem', 'true'); // Đánh dấu rằng hệ thống yêu cầu reload
    window.location.reload();
  }

  triggerFileIntroVideo() {
    this.fileIntroVideoInput.nativeElement.click();
  }

  onFileIntro_videoSelected(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const file = inputElement.files?.[0];

    console.log(file);

    // Kiểm tra nếu không có file
    if (!file) {
      this.setErrorIntroVideo('Vui lòng chọn một tập tin!');
      return;
    }

    // Kiểm tra định dạng file (chỉ chấp nhận PNG, JPG, JPEG)
    if (!this.isValidFileTypeVideo(file.type)) {
      this.setErrorIntroVideo('Chỉ chấp nhận video mp4!');
      return;
    }

    // Xóa thông báo lỗi nếu file hợp lệ
    this.clearErrorIntroVideo();

    // Lấy tên file
    console.log(file?.name);
    this.fileVideoIntroRaw = file;

    this.introVideoName = file?.name;
    console.log('this.introVideoName', this.introVideoName);
    this.cdr.detectChanges();
  }

  // Hàm xóa lỗi
  private clearErrorIntroVideo(): void {
    this.errorMessageIntroVideo = '';
  }
  // Hàm thiết lập lỗi
  private setErrorIntroVideo(message: string): void {
    this.errorMessageIntroVideo = message;
    this.introvideoUrl = null;
  }

  submitUploadVideoIntro() {
    if (
      confirm(
        'Bạn có chắc chắn muốn tải lên video giới thiệu khóa học? \n 10 ngày sau bạn mới có thê cập nhật được video mới!'
      )
    ) {
      if (this.fileVideoIntroRaw && this.introVideoName) {
        const idCourseString = this.sharedDataService.getIdCourse();
        const idCourse = idCourseString ? idCourseString : '';

        this.apiService.uploadVideoService
          .uploadIntroVideo(this.fileVideoIntroRaw, idCourse)
          .subscribe({
            next: (res) => {
              if (res.success) {
                this.introvideoUrl = res.namevideoIntro;
                this.submitUploadIntroVideo = true;
                this.cookieStorageService.setCookie(
                  'introVideoUpload',
                  'true',
                  10 // Cookie sẽ tồn tại trong 10 ngày
                );

                this.updateIntroVideoForCourse();

                alert('Tải lên thành công! Video giới thiệu đã được cập nhật.');
              }
            },
            error: (err) => {
              console.error('Lỗi khi tải lên video:', err);
              alert('Tải lên thất bại! Vui lòng thử lại.');
            },
          });
      } else {
        alert('Vui lòng chọn một video trước khi tải lên.');
      }
    }
  }

  updateIntroVideoForCourse() {
    const idCourseString = this.sharedDataService.getIdCourse();
    const idCourse = idCourseString ? parseInt(idCourseString) : -1;

    if (idCourse !== -1 && this.introvideoUrl) {
      this.apiService.courseInstructorService
        .updateIntroVideo(idCourse, this.introvideoUrl)
        .subscribe({
          next: (res) => {
            if (res.success) {
              alert('Cập nhật video giới thiệu thành công!');
              alert(
                'Để xem video bạn cần lưu cập nhật và rời khỏi trang này và truy cập lại!'
              );
            }
          },
          error: (err) => {
            console.error('Lỗi khi cập nhật video giới thiệu:', err);
            alert('Cập nhật video giới thiệu thất bại!');
          },
        });
    } else {
      alert('Vui lòng chọn video giới thiệu trước khi cập nhật.');
    }
  }

  // -===========================================

  // Load dữ liệu từ cookie
  private loadCategoriesFromCookie(): void {
    const categoriesCookie = this.cookieStorageService.getCookie('categories');
    const categoriesCookieV1 =
      this.cookieStorageService.getCookie('categoriesV1');
    const categoriesCookieV2 =
      this.cookieStorageService.getCookie('categoriesV2');
    const savedCategoriesCookie =
      this.cookieStorageService.getCookie('SaveCategories');

    this.categories = categoriesCookie
      ? JSON.parse(categoriesCookie).map((item: any) => ({
          categoryId: item.id || 0, // Dùng id làm categoryId, nếu không có đặt mặc định là 0
          categoryName: item.name || 'Không xác định', // Nếu không có name, đặt mặc định
          categoryType: 'lĩnh vực', // Giá trị mặc định
        }))
      : [];

    this.categoriesV1 = categoriesCookieV1
      ? JSON.parse(categoriesCookieV1).map((item: any) => ({
          categoryV1Id: item.id || 0, // Dùng id làm categoryId, nếu không có đặt mặc định là 0
          categoryName: item.name || 'Không xác định', // Nếu không có name, đặt mặc định
          categoryType: 'Chuyên ngành', // Giá trị mặc định
          categoryId: item.categories_id,
        }))
      : [];
    this.categoriesV2 = categoriesCookieV2
      ? JSON.parse(categoriesCookieV2).map((item: any) => ({
          categoryV2Id: item.id || 0, // Dùng id làm categoryId, nếu không có đặt mặc định là 0
          categoryName: item.name || 'Không xác định', // Nếu không có name, đặt mặc định
          categoryType: 'phân mục', // Giá trị mặc định
          categoryV1Id: item.categoriesV1_id,
        }))
      : [];

    this.SaveCategories = savedCategoriesCookie
      ? JSON.parse(savedCategoriesCookie).map((item: any) => ({
          categoryId: item.categoryId || 0,
          categoryName: item.categoryName || 'Không xác định',
          categoryType: item.categoryType || 'khác',
          categoryParentId: item.categoryParentId || 0,
        }))
      : [];
  }

  // ===========iimg upload===============

  // Hàm kích hoạt input file khi nhấn nút
  triggerFileInput(): void {
    this.fileInput.nativeElement.click();
  }

  onFileSelected(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const file = inputElement.files?.[0];

    // Kiểm tra nếu không có file
    if (!file) {
      this.setError('Vui lòng chọn một tập tin!');
      return;
    }

    // Kiểm tra định dạng file (chỉ chấp nhận PNG, JPG, JPEG)
    if (!this.isValidFileType(file.type)) {
      this.setError('Chỉ chấp nhận ảnh PNG, JPG, JPEG!');
      return;
    }

    // Xóa thông báo lỗi nếu file hợp lệ
    this.clearError();

    // Lấy tên file
    this.imageName = file.name;

    // Đọc và hiển thị ảnh
    this.previewImage(file);
  }

  // Hàm kiểm tra định dạng file
  private isValidFileType(fileType: string): boolean {
    const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg'];
    return allowedTypes.includes(fileType);
  }
  private isValidFileTypeVideo(fileType: string): boolean {
    const allowedTypes = ['video/mp4'];
    return allowedTypes.includes(fileType);
  }

  // Hàm hiển thị ảnh trước khi upload
  private previewImage(file: File): void {
    const reader = new FileReader();
    reader.onload = () => {
      this.imageUrl = reader.result as string;
      this.base64String = (reader.result as string).split(',')[1]; // Lấy phần Base64 sau "data:image/png;base64,"
    };
    reader.readAsDataURL(file);
  }

  // Hàm thiết lập lỗi
  private setError(message: string): void {
    this.errorMessage = message;
    this.imageUrl = null;
  }

  // Hàm xóa lỗi
  private clearError(): void {
    this.errorMessage = '';
  }

  // Hủy thay đổi ảnh
  cancelImage(): void {
    this.imageUrl = null;
  }

  //================================
  setDefaultDataCourse() {
    this.updateCourse.title = this.courseFetch[0].title;
    this.updateCourse.img = this.courseFetch[0].img;
    this.updateCourse.price = this.courseFetch[0].price.toString();
  }

  // ============Category==========================
  toggleShowSelectCategorie() {
    this.showSelectCategorie = !this.showSelectCategorie;
  }

  // Xác nhận và lưu tất cả vào getCategoriesALL
  confirmSelections() {
    this.getCategoriesALL = [];

    if (this.savedCategory) {
      this.getCategoriesALL.push(this.savedCategory);
    }

    this.getCategoriesALL = [
      ...this.getCategoriesALL,
      ...this.savedSubCategories,
      ...this.savedItems,
    ];

    console.warn(this.getCategoriesALL);

    if (this.getCategoriesALL.length > 0) {
      this.SaveCategories = [];
    }

    this.showSelectCategorie = !this.showSelectCategorie;
  }

  // Chọn và lưu lĩnh vực
  selectCategory(category: any) {
    this.selectedCategory = category;
    this.selectedSubCategories = []; // Reset chuyên ngành
    this.selectedItems = []; // Reset phân mục
    // Lưu lĩnh vực đã chọn
    this.savedCategory = category;
    this.SaveCategories.push(category);
  }

  // Lấy danh sách phân mục dựa trên chuyên ngành đã chọn
  getSubItems(): any[] {
    if (this.selectedSubCategories.length === 0) return [];
    const selectedSubCategoryIds = this.selectedSubCategories.map(
      (sub) => sub.categoryV1Id
    );
    return this.categoriesV2.filter((item) =>
      selectedSubCategoryIds.includes(item.categoryV1Id)
    );
  }

  // Lấy danh sách chuyên ngành dựa trên lĩnh vực đã chọn
  getSubCategories(categoryId: number) {
    return this.categoriesV1.filter((sub) => sub.categoryId === categoryId);
  }

  // Toggle chọn chuyên ngành
  toggleSubCategory(subCategory: any) {
    const index = this.selectedSubCategories.findIndex(
      (sub) => sub.categoryV1Id === subCategory.categoryV1Id
    );

    if (index === -1) {
      this.selectedSubCategories.push(subCategory);
      this.savedSubCategories.push(subCategory); // Lưu vào danh sách chuyên ngành
      this.SaveCategories.push(subCategory);
    } else {
      this.selectedSubCategories = this.selectedSubCategories.filter(
        (sub) => sub.categoryV1Id !== subCategory.categoryV1Id
      );
      this.savedSubCategories = this.savedSubCategories.filter(
        (sub) => sub.categoryV1Id !== subCategory.categoryV1Id
      );
      this.SaveCategories = this.SaveCategories.filter(
        (item) => item.categoryV1Id !== subCategory.categoryV1Id
      );
    }
  }

  // Toggle chọn phân mục
  toggleItem(item: any) {
    const index = this.selectedItems.findIndex(
      (i) => i.categoryV2Id === item.categoryV2Id
    );

    if (index === -1) {
      this.selectedItems.push(item);
      this.savedItems.push(item); // Lưu vào danh sách phân mục
      this.SaveCategories.push(item);
    } else {
      this.selectedItems = this.selectedItems.filter(
        (i) => i.categoryV2Id !== item.categoryV2Id
      );
      this.savedItems = this.savedItems.filter(
        (i) => i.categoryV2Id !== item.categoryV2Id
      );
      this.SaveCategories = this.SaveCategories.filter(
        (i) => i.categoryV2Id !== item.categoryV2Id
      );
    }
  }

  // Kiểm tra chuyên ngành đã chọn
  isSubCategorySelected(subCategory: any): boolean {
    return this.selectedSubCategories.some(
      (sub) => sub.categoryV1Id === subCategory.categoryV1Id
    );
  }

  // Kiểm tra phân mục đã chọn
  isItemSelected(item: any): boolean {
    return this.selectedItems.some((i) => i.categoryV2Id === item.categoryV2Id);
  }

  // Xóa tất cả danh mục đã chọn và lưu
  clearAllSelections() {
    this.selectedCategory = null;
    this.selectedSubCategories = [];
    this.selectedItems = [];
    this.SaveCategories = [];

    this.savedCategory = null;
    this.savedSubCategories = [];
    this.savedItems = [];
  }

  removeCategory() {
    this.savedCategory = null;
  }

  // Xóa chuyên ngành đã chọn và lưu
  removeSubCategory(subCategory: any) {
    this.selectedSubCategories = this.selectedSubCategories.filter(
      (sub) => sub.categoryV1Id !== subCategory.categoryV1Id
    );
    this.savedSubCategories = this.savedSubCategories.filter(
      (sub) => sub.categoryV1Id !== subCategory.categoryV1Id
    );
    this.SaveCategories = this.SaveCategories.filter(
      (item) => item.categoryV1Id !== subCategory.categoryV1Id
    );
  }

  // Xóa phân mục đã chọn và lưu
  removeItem(item: any) {
    this.selectedItems = this.selectedItems.filter(
      (i) => i.categoryV2Id !== item.categoryV2Id
    );
    this.savedItems = this.savedItems.filter(
      (i) => i.categoryV2Id !== item.categoryV2Id
    );
    this.SaveCategories = this.SaveCategories.filter(
      (i) => i.categoryV2Id !== item.categoryV2Id
    );
  }

  // =================================
  // Getter để lấy danh sách tên các danh mục đã lưu
  get savedCategoriesString(): string {
    if (this.getCategoriesALL.length > 0 && this.SaveCategories.length === 0) {
      return this.GetCategoriesALL;
    } else {
      return this.SaveCategories.map((item) => item.categoryName).join(' ; ');
    }
  }
  get GetCategoriesALL(): string {
    return this.getCategoriesALL.map((item) => item.categoryName).join(' ; ');
  }

  // =================================

  // =================================
  // Kiểm tra xem chuyên ngành có được chọn hay không
  onLevelChange(level: string) {
    this.updateCourse.level = level;
  }

  onLanguageChange(language: string) {
    this.updateCourse.languages = language;
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

  // check dữ liệu tồn tại không
  CheckEligibleToGetData(idInstructor: number, idCourse: number): boolean {
    if (idCourse !== -1 && idInstructor !== -1) {
      this.checkParamsFetch = true;
      return true;
    } else {
      this.checkParamsFetch = false;
      return false;
    }
  }

  // lấy dữ liệu khóa học khi tải trang lần đầu
  fetchCourse() {
    const idInstructor = this.getInstructorId();
    const idCourseString = this.sharedDataService.getIdCourse();
    const idCourse = idCourseString ? parseInt(idCourseString) : -1;

    if (!this.CheckEligibleToGetData(idInstructor, idCourse)) {
      return;
    }

    this.apiService.listLanguageServiceService.getLanguages().subscribe({
      next: (res) => {
        if (res.success) {
          this.languageList = res.listLanguages;
        }
      },
      error: (err) => {
        console.log('lỗi lấy languages: ' + err);
      },
    });

    this.apiService.courseInstructorService
      .getUpdateCourseInstructorId(idCourse, idInstructor)
      .subscribe({
        next: (res) => {
          if (res.success) {
            if (res.course && res.course.length > 0) {
              this.courseFetch = res.course;
              this.setDefaultDataCourse();

              // Thêm logic định dạng giá tại đây
              if (this.courseFetch && this.courseFetch[0]) {
                this.priceCourse = this.courseFetch[0].price.toString();

                this.formattedPrice = this.formatNumber(
                  this.courseFetch[0].price.toString()
                );
              }

              /* intro video giới thiệu khóa học */
              this.introVideo = this.courseFetch[0].intro_video;
              console.warn(this.introVideo);
              this.videoUrl$.next(
                `https://localhost:3000/stream/video?namevideo=${this.introVideo}`
              );
              this.onPlayerReady(this.playerElement);
              /* --------------------- */

              if (this.courseFetch.length > 0) {
                this.SaveCategories = [];
                const categoryMap = new Map();

                this.courseFetch.forEach((course) => {
                  const key = `${course.categoryId}-${course.categoryType}`;

                  if (
                    course.categoryId &&
                    course.categoryType &&
                    course.category_name &&
                    !categoryMap.has(key)
                  ) {
                    this.SaveCategories.push({
                      courseId: course.id,
                      categoryId: course.categoryId,
                      categoryName: course.category_name,
                      categoryType: course.categoryType,
                    });
                    categoryMap.set(key, true);
                  }
                });

                // this.getCategoriesALL = this.SaveCategories;
                console.log('Mảng SaveCategories:', this.SaveCategories);
              }

              this.textAreaIntroduceCourse = this.courseFetch[0].overview;
              this.updateCourse.level = this.courseFetch[0].level;
              this.updateCourse.languages = this.courseFetch[0].language_code;
              this.updateCourse.subtitles = this.courseFetch[0].subtitle_code;
              this.updateCourse.whattolearn = this.courseFetch[0].whatToLearn;
              this.updateCourse.requireKnowledge =
                this.courseFetch[0].requirements;
              this.updateCourse.description = this.courseFetch[0].description;

              // Khởi tạo mảng rỗng để lưu danh sách section
              this.updateCourse.section = [];

              // Kiểm tra xem this.courseFetch có phải là mảng không trước khi lặp
              if (Array.isArray(this.courseFetch)) {
                this.courseFetch.forEach((item: any) => {
                  // Kiểm tra nếu sectionOrder đã tồn tại trong danh sách, thì bỏ qua
                  const isDuplicate = this.updateCourse.section.some(
                    (section) => section.sectionOrder === item.sectionOrder
                  );

                  // Kiểm tra null: Nếu `section_name` hoặc `sectionOrder` là null thì bỏ qua
                  if (
                    !isDuplicate &&
                    item.section_name !== null &&
                    item.sectionOrder !== null
                  ) {
                    const sectionData: SectionUpdateCourse = {
                      section_id: item.section_id,
                      section_name: item.section_name,
                      sectionOrder: item.sectionOrder,
                    };

                    this.updateCourse.section.push(sectionData);
                  }
                });

                if (this.updateCourse.section.length > 0) {
                  // Sắp xếp theo sectionOrder từ lớn đến bé
                  this.updateCourse.section.sort(
                    (a, b) => a.sectionOrder - b.sectionOrder
                  );
                  this.nameSection = this.updateCourse.section[0].section_name;
                  this.nameSectionDefault =
                  this.updateCourse.section[0].section_name;
                this.orderSectionDefault =
                  this.updateCourse.section[0].sectionOrder;
                } else {
                  this.nameSection = '';
                  this.nameSectionDefault =''; this.orderSectionDefault = -1;
                }
               
              } else {
                console.error(
                  'Lỗi: this.courseFetch không phải là một mảng!',
                  this.courseFetch
                );
              }

              this.textAreaIntroduceCourseDefault =
                this.courseFetch[0].overview;
              this.levelDefault = this.courseFetch[0].level;
              this.languageDefault = this.courseFetch[0].language_code;
              this.subtitleDefault = this.courseFetch[0].subtitle_code;
              this.whattolearnDefault = this.courseFetch[0].whatToLearn;
              this.requirementKnowlegdeDefault =
                this.courseFetch[0].requirements;
              this.descriptionDefault = this.courseFetch[0].description;

              // Kiểm tra xem this.courseFetch có phải là mảng không trước khi lặp
              if (Array.isArray(this.courseFetch)) {
                this.courseFetch.forEach((item: any) => {
                  // Kiểm tra nếu sectionOrder đã tồn tại trong danh sách, thì bỏ qua
                  const isDuplicate = this.SectionDefault.some(
                    (section) => section.sectionOrder === item.sectionOrder
                  );

                  if (!isDuplicate) {
                    const sectionData: SectionUpdateCourse = {
                      section_id: item.section_id,
                      section_name: item.section_name,
                      sectionOrder: item.sectionOrder,
                    };

                    this.SectionDefault.push(sectionData);
                  }
                });
                // Sắp xếp theo sectionOrder từ lớn đến bé
                this.SectionDefault.sort(
                  (a, b) => a.sectionOrder - b.sectionOrder
                );
              } else {
                console.error(
                  'Lỗi: this.courseFetch không phải là một mảng!',
                  this.courseFetch
                );
              }
            }
          }
        },
        error: (err) => {
          console.warn(err);
        },
      });
  }

  huyCapNhat() {
    this.router.navigate(['/user/instructor/courses-instructor']);
  }

  // xác nhận thay đổi và lưu vào cơ sở dũ liệu
  submitUpdateCourse() {
    const idInstructor = this.getInstructorId();
    const idCourseString = this.sharedDataService.getIdCourse();
    const idCourse = idCourseString ? parseInt(idCourseString) : -1;

    // Tạo object chỉ chứa các giá trị có thay đổi
    let updateData: any = {};
    /* Nếu title thay đổi */
    if (this.courseFetch[0].title !== this.updateCourse.title) {
      updateData.title = this.courseFetch[0].title;
    }
    /* nếu giá thay đổi */
    if (this.courseFetch[0].price.toString() !== this.priceCourse) {
      updateData.price = this.priceCourse;
    }

    /* kiểm tra ảnh có được thay đổi không nếu có thay đổi thì sẽ có tên file của file vừa thêm*/
    if (this.imageName) {
      updateData.img = this.appendTimestampToFilename(this.imageName);
    }

    /* Kiểm tra lĩnh vực có thay đổi không  */
    if (this.getCategoriesALL.length > 0 && this.SaveCategories.length === 0) {
      this.apiService.courseInstructorService
        .putCategoryCourse(this.getCategoriesALL, idCourse)
        .subscribe({
          next: (res) => {
            if (res.success) {
              console.log('thanhf cong category');
            } else {
              console.log('thatas bai category');
            }
          },
          error: (err) => {
            console.log('thatas bai category' + err);
          },
        });
    }

    /* kiểm tra  mô tả ngắn tổng quan*/
    if (this.textAreaIntroduceCourseDefault !== this.textAreaIntroduceCourse) {
      updateData.overview = this.textAreaIntroduceCourse;
    }
    /* kiểm tra trình độ yêu cầu */
    if (this.updateCourse.level !== this.levelDefault) {
      updateData.level = this.updateCourse.level;
    }

    /* kiểm tra ngôn ngữ */
    if (this.updateCourse.languages !== this.languageDefault) {
      updateData.languages = this.updateCourse.languages;
    }

    /* kiểm tra phụ đề */
    if (this.updateCourse.subtitles !== this.subtitleDefault) {
      updateData.subtitles = this.updateCourse.subtitles;
    }
    /* kiểm tra what to learn */
    if (this.updateCourse.whattolearn !== this.whattolearnDefault) {
      updateData.whattolearn = this.updateCourse.whattolearn;
    }
    /* kiểm tra requirement knowledge */
    if (
      this.updateCourse.requireKnowledge !== this.requirementKnowlegdeDefault
    ) {
      updateData.requirements = this.updateCourse.requireKnowledge;
    }
    /* kiểm tra requirement knowledge */
    if (this.updateCourse.description !== this.descriptionDefault) {
      updateData.description = this.updateCourse.description;
    }

    // console.log("1::::"+this.updateCourse.languages , this.languageDefault);
    // console.log("1::::"+this.textAreaIntroduceCourseDefault , this.textAreaIntroduceCourse);
    // console.log("1::::"+this.updateCourse.level , this.levelDefault);
    // console.log("1::::"+this.updateCourse.subtitles , this.subtitleDefault);

    if (!this.CheckEligibleToGetData(idInstructor, idCourse)) {
      return;
    }
    if (Object.keys(updateData).length > 0) {
      this.apiService.courseInstructorService
        .putUpdateCourse(idCourse, idInstructor, updateData)
        .subscribe({
          next: (response) => {
            if (response.success) {
              if (!this.imageName) {
                console.log('Cập nhật không ảnh:', response);
                this.router.navigate(['/user/instructor/courses-instructor']);
              } else {
                console.log('Cập nhật ảnh:', response);
                this.uploadFileToServer(this.base64String, updateData.img);
              }
            }
          },
          error: (error) => console.error('Lỗi khi cập nhật:', error),
        });
    } else {
      console.log('Không có dữ liệu cần cập nhật.');
    }
  }

  private uploadFileToServer(base64String: string, fileName: string): void {
    this.uploadImgServerService.uploadFile(base64String, fileName).subscribe({
      next: (res) => {
        if (res.success) {
          this.imageUrl =
            this.uploadImgServerService.getApiUrl + '/' + res.fileName;
          console.log('File uploaded:', this.imageUrl);
          this.router.navigate(['/user/instructor/courses-instructor']);
        }
      },
      error: (error) => {
        console.error('Lỗi khi tải ảnh lên:', error);
        this.setError('Tải ảnh lên thất bại!');
      },
    });
  }

  modules: QuillModules = {
    toolbar: [
      ['bold', 'italic', 'underline'], // Chỉ định các nút in đậm, in nghiêng và gạch chân
      [{ size: ['small', false, 'large', 'huge'] }],
      [{ list: 'ordered' }, { list: 'bullet' }],
      [{ align: [] }],
      ['clean'],
    ],
  };
  // =========================
  // thêm ngày giờ vào tên ảnh
  // =========================
  appendTimestampToFilename(filename: string): string {
    const timestamp = new Date().toISOString().replace(/[-T:.Z]/g, '');
    const dotIndex = filename.lastIndexOf('.');

    if (dotIndex === -1) {
      return `${filename}_${timestamp}`; // Trường hợp không có đuôi file
    }

    const name = filename.substring(0, dotIndex);
    const extension = filename.substring(dotIndex);

    return `${name}_${timestamp}${extension}`;
  }

  // ======================
  // ngăn chặn reload page
  // ======================
  @HostListener('window:keydown', ['$event'])
  disableReload(event: KeyboardEvent) {
    if (
      event.key === 'F5' ||
      (event.ctrlKey && event.key === 'r') ||
      event.key === 'Tab' ||
      (event.key === 'Backspace' && !this.isInputField(event))
    ) {
      event.preventDefault();
      event.stopPropagation();
      alert('Hành động này bị vô hiệu hóa!');
    }
  }

  isInputField(event: KeyboardEvent): boolean {
    const target = event.target as HTMLElement;
    return (
      target.tagName === 'INPUT' ||
      target.tagName === 'TEXTAREA' ||
      target.isContentEditable || // Kiểm tra phần tử có contenteditable hay không
      !!target.closest('.ql-editor')
    ); // Kiểm tra nếu target nằm bên trong quill-editor
  }

  @HostListener('window:beforeunload', ['$event'])
  onBeforeUnload(event: BeforeUnloadEvent) {
    if (!this.isReloadingBySystem) {
      event.preventDefault();
      const confirmationMessage =
        'Bạn có chắc chắn muốn tải lại trang không? Bạn sẽ bị chuyển hướng!';
      event.preventDefault();
      event.returnValue = confirmationMessage; // Hiển thị cảnh báo mặc định của trình duyệt
    }

    // Đánh dấu trạng thái reload trong sessionStorage
    sessionStorage.setItem('redirectAfterReload', 'true');
  }

  @HostListener('window:load')
  onLoad() {
    if (sessionStorage.getItem('redirectAfterReload') === 'true') {
      sessionStorage.removeItem('redirectAfterReload'); // Xóa cờ tránh redirect nhiều lần
      window.location.href = '/user/instructor/courses-instructor'; // Chuyển hướng sau khi reload
    }
  }

  //===========tiền tệ==================
  // Hàm định dạng số theo chuẩn Việt Nam
  formatNumber(value: any): string {
    if (!value) return '';
    return new Intl.NumberFormat('vi-VN').format(Number(value));
  }

  // Khi nhập liệu, cập nhật giá trị hiển thị
  formatCurrency(event: any) {
    let rawValue = event.target.value.replace(/\D/g, ''); // Loại bỏ ký tự không phải số
    this.formattedPrice = this.formatNumber(rawValue); // Hiển thị dấu chấm
  }

  // Khi rời khỏi ô nhập, lưu giá trị gốc không có dấu chấm
  saveRawPrice() {
    this.priceCourse = this.formattedPrice.replace(/\./g, ''); // Lưu giá trị gốc
  }

  // ==================texteare giới thiệu kháo học-=============

  checkWordLimit() {
    let words = this.textAreaIntroduceCourse.trim().split(/\s+/);
    if (words.length > 50) {
      words = words.slice(0, 50);
      this.textAreaIntroduceCourse = words.join(' ');
    }
    this.wordCount = words.length;
  }

  set subtitleSelected(sub: string) {
    this.updateCourse.subtitles = sub;
  }

  //===============quill editor======================
  onWhatToLearnChanged(content: string) {
    console.log('Nội dung thay đổi:', content);
  }
  onRequirementKnowledgeChanged(content: string) {
    console.log('Nội dung thay đổi:', content);
  }
  onDescriptionChanged(content: string) {
    console.log('Nội dung thay đổi:', content);
  }
  onNameSectionChanged(content: string) {
    console.log('Nội dung thay đổi:', content);
  }

  //============xóa section ===================

  deleteSection(sectionOrder: number) {
    const idCourseString = this.sharedDataService.getIdCourse();
    const idCourse = idCourseString ? parseInt(idCourseString) : -1;

    this.apiService.courseInstructorService
      .deleteSectionCourse(idCourse, sectionOrder)
      .subscribe({
        next: (res) => {
          if (res.success) {
            console.log('thành công xóa section');
            const sectionOrderToDelete = sectionOrder; // Giá trị sectionOrder cần xóa
            this.updateCourse.section = this.updateCourse.section.filter(
              (section) => section.sectionOrder !== sectionOrderToDelete
            );

            this.getSectionClicked(
              this.updateCourse.section.slice(-1)[0].section_name,
              sectionOrder - 1,
              this.updateCourse.section.slice(-1)[0].section_id
            );

            this.cdr.detectChanges(); // Ép UI cập nhật lại
          }
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  trackByFn(index: number, item: any): number {
    return item.sectionOrder; // Dùng sectionOrder làm khóa nhận diện
  }

  updateSection(sectionOrder: number, title: string) {
    const updatedSections = [...this.updateCourse.section];

    // Tìm phần tử có sectionOrder tương ứng
    const index = updatedSections.findIndex(
      (section) => section.sectionOrder === sectionOrder
    );

    if (index !== -1) {
      // Cập nhật cả section_name và sectionOrder
      updatedSections[index].section_name = title;

      // Gán lại mảng để Angular nhận diện thay đổi
      this.updateCourse.section = updatedSections;
    }
  }
  //=================lecture==========================
  getSectionClicked(
    sectionNameClicked: string,
    sectionOrderClicked: number,
    section_id: number
  ) {
    this.ClickedSection = true;
    this.nameSectionDefault = sectionNameClicked;
    this.nameSection = sectionNameClicked;
    this.orderSectionDefault = sectionOrderClicked;
    this.idSectionDefault = section_id;
    this.getListLectureOfSection(section_id);

    console.log(sectionNameClicked, sectionOrderClicked);
  }

  onEditSectionName() {
    console.log(this.isEditNameSection);
    console.log(this.nameSection);
    console.log(this.nameSectionDefault);
    if (
      this.isEditNameSection &&
      this.nameSection !== this.nameSectionDefault
    ) {
      this.updateNameSections(this.orderSectionDefault);
      this.updateSection(this.orderSectionDefault, this.nameSection);
    }

    this.isEditNameSection = !this.isEditNameSection;
  }

  updateNameSections(sectionOrder: number) {
    const idCourseString = this.sharedDataService.getIdCourse();
    const idCourse = idCourseString ? parseInt(idCourseString) : -1;

    this.apiService.courseInstructorService
      .updateNameSectionCourse(this.nameSection, idCourse, sectionOrder)
      .subscribe({
        next: (res) => {
          if (res.success) {
            console.log('update successful name section');
            this.cdr.detectChanges(); // Ép UI cập nhật lại
          }
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  createSection() {
    if (this.isCreatingSection) return;

    this.isCreatingSection = true;
    setTimeout(() => (this.isCreatingSection = false), 500);

    const idCourseString = this.sharedDataService.getIdCourse();
    const idCourse = idCourseString ? parseInt(idCourseString) : -1;
    
    // Tính toán sectionOrder mới
    let sectionOrderMax = this.updateCourse.section.length > 0
      ? Math.max(...this.updateCourse.section.map(s => s.sectionOrder)) + 1
      : 1;

    this.apiService.courseInstructorService
      .createSection('yêu cầu thay đổi', idCourse, sectionOrderMax)
      .subscribe({
        next: (res) => {
          if (res.success) {
            // Sau khi tạo section thành công, lấy section ID
            this.apiService.courseInstructorService
              .getSectionId(idCourse, sectionOrderMax)
              .subscribe({
                next: (sectionRes) => {
                  if (sectionRes.success && sectionRes.sectionFetch_id.length > 0) {
                    // Thêm section mới vào mảng với ID chính xác
                    const newSection = {
                      section_id: sectionRes.sectionFetch_id[0].id,
                      section_name: 'yêu cầu thay đổi',
                      sectionOrder: sectionOrderMax
                    };
                    
                    this.updateCourse.section = [...this.updateCourse.section, newSection];
                    
                    // Cập nhật UI và chọn section mới
                    this.getSectionClicked(
                      newSection.section_name,
                      newSection.sectionOrder,
                      newSection.section_id
                    );
                    
                    this.cdr.detectChanges();
                  }
                },
                error: (err) => {
                  console.error('Lỗi khi lấy section ID:', err);
                }
              });
          }
        },
        error: (err) => {
          console.error('Lỗi khi tạo section:', err);
          this.isCreatingSection = false;
        }
      });
  }

  getSectionFetch() {
    const idCourseString = this.sharedDataService.getIdCourse();
    const idCourse = idCourseString ? parseInt(idCourseString) : -1;
    this.apiService.courseInstructorService.getSection(idCourse).subscribe({
      next: (res) => {
        if (res.success) {
          console.log('theem:' + res.sectionFetch[0]);
          console.log('theem:' + this.updateCourse.section[0]);

          this.updateCourse.section = res.sectionFetch;

          this.cdr.detectChanges(); // Ép UI cập nhật lại
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  // sectionFetch_id
  getSectionId(sectionOrder: number) {
    const idCourseString = this.sharedDataService.getIdCourse();
    const idCourse = idCourseString ? parseInt(idCourseString) : -1;
    this.apiService.courseInstructorService
      .getSectionId(idCourse, sectionOrder)
      .subscribe({
        next: (res) => {
          if (res.success) {
            this.sectionId = res.sectionFetch_id;
            this.updateCourse.section.forEach((section) => {
              if (
                section.sectionOrder ===
                Math.max(
                  ...this.updateCourse.section.map((s) => s.sectionOrder)
                )
              ) {
                section.section_id = res.sectionFetch_id[0].id;
              }
            });
          }
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  // ====================
  // Lecture
  // ====================

  onNameLectureChanged(content: string) {
    console.log('Nội dung thay đổi:', content);
  }

  onEditNameLecture(lessonId: number, title: string) {
    if (this.isEditNameLecture && lessonId) {
      console.log(lessonId);
      this.updateTitleLessonOfSection(lessonId, '1111112');
    }

    this.isEditNameLecture = !this.isEditNameLecture;

    this.getTitleLesson(title, lessonId);
  }

  getListLectureOfSection(sectionID: number) {
    const idCourseString = this.sharedDataService.getIdCourse();
    const idCourse = idCourseString ? parseInt(idCourseString) : -1;

    this.apiService.courseInstructorService
      .getLessionBySectionId(sectionID, idCourse)
      .subscribe({
        next: (res) => {
          if (res?.success) {
            console.log('res.lessionList' + res.lessionList);
            this.listLecture = res.lessionList;
            console.log('res.lessionList.ts: ' + this.listLecture.length);
            this.cdr.detectChanges(); // Ép UI cập nhật lại
          }
        },
        error: (err) => {
          console.log(err);
        },
      });
  }
  updateTitleLessonOfSection(lessonId: number, title: string) {
    if (lessonId === -1) lessonId = this.idLecture;
    this.apiService.courseInstructorService
      .updateTitleLessionByLessonId(lessonId, title)
      .subscribe({
        next: (res) => {
          if (res?.success) {
            console.log('success udpate lesson');
            this.getListLectureOfSection(this.idSectionDefault);
            this.isEditNameLecture = !this.isEditNameLecture;
            this.cdr.detectChanges(); // Ép UI cập nhật lại
          }
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  hiddenUpdateTitleLesson() {
    this.isEditNameLecture = !this.isEditNameLecture;
  }

  getTitleLesson(title: string, id: number) {
    this.nameLecture = title;
    this.idLecture = id;
  }

  createNewLesson() {
    const idCourseString = this.sharedDataService.getIdCourse();
    const idCourse = idCourseString ? parseInt(idCourseString) : -1;

    this.apiService.courseInstructorService
      .createNewLesson(this.idSectionDefault, idCourse)
      .subscribe({
        next: (res) => {
          if (res.success) {
            this.getListLectureOfSection(this.idSectionDefault);
          }
        },
        error: (err) => {
          console.log('loxio sss' + err);
        },
      });
  }
  deleteLesson(lessonId: number) {
    this.apiService.courseInstructorService.deleteLesson(lessonId).subscribe({
      next: (res) => {
        if (res.success) {
          this.getListLectureOfSection(this.idSectionDefault);
        }
      },
      error: (err) => {
        console.log('loxio sss' + err);
      },
    });
  }

  // ====================
  // upload video
  // ====================

  onFileVideoSelected(event: any, sectionId: number, lessonId: number) {
    this.selectedVideoFile = event.target.files[0];
    const file: File = event.target.files[0];

    this.nameVideo = this.selectedVideoFile?.name ?? 'Not find video';

    console.log(this.selectedVideoFile);
    // this.onUploadVideo(sectionId, lessonId);

    if (this.selectedVideoFile) {
      // Kiểm tra định dạng file
      const fileType = file.type;

      if (fileType === 'video/mp4') {
        this.selectedVideoFile = file;
        console.log('File hợp lệ:', file.name);

        // Upload trực tiếp cho file nhỏ
        this.apiService.uploadVideoService
          .uploadVideo(this.selectedVideoFile)
          .subscribe({
            next: (res) => {
              if (res.success) {
                this.uploading = false;
                this.uploadComplete = true;
                this.nameVideo = res.namevideo;
                this.updateNameVideo(sectionId, lessonId);

                console.log('Upload thành công:', res.namevideo);
              } else {
                console.log('saisai sai');
              }
            },
            error: (err) => {
              this.uploading = false;
              this.uploadComplete = false;
              console.error('Upload thất bại:', err);
            },
          });

        // Hoặc upload theo chunk cho file lớn
        // this.videoUploadService.uploadVideoInChunks(file).subscribe(...);
      } else {
        this.selectedVideoFile = null;
        this.uploadStatus = 'Tệp phải là .MP4! Chọn lại.';
      }
    }
  }

  triggerFileVideoInput(): void {
    this.fileVideoInput.nativeElement.click();
  }

  updateNameVideo(sectionId: number, lessonId: number) {
    if (this.nameVideo) {
      this.apiService.courseInstructorService
        .updateNameVideoLesson(this.nameVideo, sectionId, lessonId)
        .subscribe({
          next: (res) => {
            if (res.success) {
              this.uploadVideoMessage =
                'Tải lên thành công - mất khoản 24H để xử lý!';
              console.log(this.uploadVideoMessage);
              this.getListLectureOfSection(sectionId);
              this.cdr.detectChanges();
            }
          },
          error: (err) => {
            this.uploadVideoMessage = 'Upload failed!';
          },
        });
    }
  }
}
