import {
  Component,
  HostListener,
  ElementRef,
  OnInit,
  AfterViewInit,
  ViewChild,
  NgZone,
} from '@angular/core';
import { Route, Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '@app/services/api.service';
import { WindowRef } from '@app/services/window/window-ref.service';
import { CookieStorageService } from '@app/services/cookie_storage/cookie-storage.service';
import { Observable } from 'rxjs';
import { User } from '@app/interface/user';
import { NgForm } from '@angular/forms';
import { ShareHeaderSearchService } from '@app/services/search/header_search/share-header-search.service';
import { ReloadSystemService } from '@app/services/reload_system/reload-system.service';
import { SharedDataService } from '@app/services/share/shared-data.service';

// Định nghĩa kiểu dữ liệu cho subitem
interface Subitem {
  name: string;
}

// Định nghĩa kiểu dữ liệu cho subfield
interface Subfield {
  name: string;
  subitems: string[] | Subitem[]; // subitems có thể là mảng string hoặc mảng Subitem
}

// Định nghĩa kiểu dữ liệu cho field
interface Field {
  name: string;
  subfields: Subfield[];
}

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
  standalone: false,
})
export class HeaderComponent implements OnInit, AfterViewInit {
  isLogin: number = 0; // 0 - 1 - 2 - 3  : chưa đăng nhập - student - instructor - admin
  adminDashboardURL: string = '/admin';
  userDashboardURL: string = '/user/';
  instructorDashboardURL: string = '/user/instructor';
  // publishProfileURL: string = '/user/profile';
  cartURL: string = '/cart';
  signupURL: string = '/register';
  loginURL: string = '/login';

  private isLoggedOut = false; // Biến kiểm tra đã logout hay chưa
  private checkSessionInterval: any;

  urlBackend_img_avartaUser:string ='';

  nameUser: string = '';
  emailUser: string = '';
  picture: string = '';
  role: string = '';

  @ViewChild('searchForm') searchForm!: NgForm;

  searchFormMode = {
    SearchContext: '',
  };

  // search params
  titleSearch: string = '';
  ratingSearch: any;
  languageSearch: any;
  durationSearch: any;
  levelSearch: any;
  priceSearch: any;
  // result seach of params
  courseResultSearch: any;

  // dropdown
  isOpen: boolean = false;

  // load data user login
  loaddata: boolean = true;

  avartFeature = [
    { name: 'Khoá học của tôi', url: '/my-learning' , role: 1},
    { name: 'Hoạt động giảng dạy', url: '/user/instructor/courses-instructor' , role: 2},
    { name: 'Điều chỉnh hồ sơ', url: '/user/edit-information' , role: 1},
  ];

  constructor(
    private elementRef: ElementRef,
    private apiService: ApiService,
    private winRef: WindowRef,
    private cookieService: CookieStorageService,
    private ngZone: NgZone,
    private router: Router,
    private route: ActivatedRoute,
    private shareHeaderSearchService: ShareHeaderSearchService,
    private reloadSystemService: ReloadSystemService,
    private sharedDataService: SharedDataService
  ) {
    this.urlBackend_img_avartaUser =
      this.apiService.API_URL + '/uploads/img/avartaUser/';
  }

  get isLoggedIn(): boolean {
    return !!this.cookieService.getCookie('token') || false;
  }
  get isLoggedInWithEnovi(): boolean {
    return !!this.cookieService.getCookie('user') || false;
  }

  toggleDropdown() {
    this.isOpen = !this.isOpen;
  }
  // lấy sự kiện click trên toàn trang web
  @HostListener('document:click', ['$event'])
  // thực hiện sự kiện click
  onClick(event: MouseEvent) {
    const target = event.target as HTMLElement; // tất cả các thành phần trong component đều được lây
    const clickedInside_id =
      this.elementRef.nativeElement.querySelector('#btnAvarta'); // lấy đúng button có id=btnAvarta
    try {
      const clickedInside_target = clickedInside_id.contains(target); // lấy đúng button có id=btnAvarta
      if (!clickedInside_target) {
        this.isOpen = false;
      }
    } catch (catchError) {}
  }

  // hover lĩnh vực

  fields: Field[] = [
    {
      name: 'Công nghệ',
      subfields: [
        {
          name: 'Lập trình web',
          subitems: ['HTML', 'CSS', 'JavaScript', 'React', 'Angular', 'Vue.js'],
        },
        {
          name: 'Lập trình di động',
          subitems: ['Android', 'iOS', 'Flutter'],
        },
        {
          name: 'Lập trình',
          subitems: ['Python', 'Java', 'C++', 'C#'],
        },
        {
          name: 'Cơ sở dữ liệu',
          subitems: ['SQL Server', 'MongoDB', 'MySQL'],
        },
        {
          name: 'Trí tuệ nhân tạo',
          subitems: ['AI', 'Machine Learning', 'Data Science'],
        },
        {
          name: 'Thiết kế đồ họa',
          subitems: [
            'Photoshop',
            'Illustrator',
            'InDesign',
            'UI/UX',
            'Dựng phim',
            'Chỉnh sửa video',
          ],
        },
        {
          name: 'Quản trị mạng và hệ thống',
          subitems: [
            'Quản trị mạng',
            'Bảo mật mạng',
            'Quản trị hệ thống',
            'Điện toán đám mây',
          ],
        },
      ],
    },
    {
      name: 'Marketing và kinh doanh',
      subfields: [
        {
          name: 'Digital Marketing',
          subitems: [
            'SEO',
            'Quảng cáo Facebook',
            'Google Ads',
            'Email marketing',
            'Phân tích dữ liệu marketing',
          ],
        },
        {
          name: 'Bán hàng (Sales)',
          subitems: ['Kỹ năng bán hàng', 'Chốt sale', 'Chăm sóc khách hàng'],
        },
        {
          name: 'Khởi nghiệp (Startup)',
          subitems: ['Ý tưởng khởi nghiệp', 'Gọi vốn', 'Quản lý doanh nghiệp'],
        },
      ],
    },
    {
      name: 'Phát triển bản thân',
      subfields: [
        {
          name: 'Kỹ năng mềm',
          subitems: ['Giao tiếp', 'Thuyết trình', 'Làm việc nhóm', 'Lãnh đạo'],
        },
        {
          name: 'Ngoại ngữ',
          subitems: ['Tiếng Anh', 'Tiếng Nhật', 'Tiếng Hàn', 'Tiếng Trung'],
        },
        {
          name: 'Âm nhạc',
          subitems: ['guitar', 'Sáo', 'Piano', 'Trống', 'Thanh nhạc'],
        },
        {
          name: 'nghệ thuật',
          subitems: ['Vẽ', 'Thiết kế'],
        },
      ],
    },
    {
      name: 'Sức khỏe',
      subfields: [
        {
          name: 'Yoga, Thiền',
          subitems: ['không biết'], // Có thể để trống nếu không có mục con
        },
        {
          name: 'Dinh dưỡng',
          subitems: ['không biết'],
        },
        {
          name: 'Chăm sóc da, Trang điểm',
          subitems: ['không biết'],
        },
      ],
    },
    {
      name: 'Làm đẹp',
      subfields: [
        {
          name: 'Chăm sóc da',
          subitems: ['không biết'],
        },
        {
          name: 'Trang điểm',
          subitems: ['không biết'],
        },
      ],
    },
    {
      name: 'Tài chính và đầu tư',
      subfields: [
        {
          name: 'Đầu tư chứng khoán',
          subitems: ['không biết'],
        },
        {
          name: 'Đầu tư bất động sản',
          subitems: ['không biết'],
        },
        {
          name: 'Quản lý tài chính cá nhân',
          subitems: ['không biết'],
        },
      ],
    },
    {
      name: 'Các lĩnh vực khác',
      subfields: [
        {
          name: 'Nấu ăn, Làm bánh',
          subitems: ['không biết'],
        },
        {
          name: 'Nhiếp ảnh',
          subitems: ['không biết'],
        },
        {
          name: 'Làm vườn',
          subitems: ['không biết'],
        },
      ],
    },
  ];

  hoveredField: Field | null = null;
  hoveredFieldSubitem: Subfield[] | null = null;
  selectedSubfields: Subfield[] = []; // Thay đổi kiểu dữ liệu thành Subfield[]
  isHovered: boolean = false; // Thêm biến isHovered để kiểm soát trạng thái hover
  isShowCol3: boolean = false;

  ngOnInit() {

    this.sharedDataService.setHeaderComponent(this);

    const categoriesCookie = this.cookieService.getCookie('categories');
    const categoriesCookieV1 = this.cookieService.getCookie('categoriesV1');
    const categoriesCookieV2 = this.cookieService.getCookie('categoriesV2');
    const fieldsLevel1 = categoriesCookie ? JSON.parse(categoriesCookie) : [];
    const fieldsLevel2 = categoriesCookieV1
      ? JSON.parse(categoriesCookieV1)
      : [];
    const fieldsLevel3 = categoriesCookieV2
      ? JSON.parse(categoriesCookieV2)
      : [];

    const structuredFields = fieldsLevel1.map((field1: { id: any }) => ({
      ...field1,
      subfields: fieldsLevel2
        .filter(
          (field2: { categories_id: any }) => field2.categories_id === field1.id
        )
        .map((field2: { id: any }) => ({
          ...field2,
          subitems: fieldsLevel3
            .filter(
              (field3: { categoriesV1_id: any }) =>
                field3.categoriesV1_id === field2.id
            )
            .map((field3: { name: any }) => field3.name),
        })),
    }));

    this.fields = structuredFields;

    if (this.fields.length > 0) {
      this.selectedSubfields = this.fields[0].subfields;
    }

    if (this.cookieService.getCookie('user')) {
      this.updateInforUser();
    }

    this.getQueryParam();


    const userInfo = this.apiService.userServiceService.getUserLogin();
    console.log('userInfo:', userInfo.userName);
  }

  getQueryParam() {
    // Lấy giá trị title từ query params (nếu có) khi component khởi tạo
    this.route.queryParams.subscribe((params) => {
      const title = params['title'];
      const rating = params['rating'];
      const language = params['language'];
      const duration = params['duration'];
      const level = params['level'];
      const price = params['price'];
      const page = params['page'];
      const sort = params['sort'];

      if (title || rating || language || duration || level || price || sort) {
        this.fetchResults(
          title,
          rating,
          language,
          duration,
          level,
          price,
          page,
          sort
        );
      }
    });
  }

  ngAfterViewInit(): void {
    this.ngZone.runOutsideAngular(() => {
      setInterval(() => {
        this.ngZone.run(() => {
          if (this.cookieService.getCookie('user')) {
            this.updateInforUser();
          }
          this.loaddata = false;
          this.reloadSystemService.reloadSystem();
        });
      }, 1500);
    });
  }

  updateInforUser(): void {
    if (this.isLoggedIn || this.isLoggedInWithEnovi) {
      const userString = this.cookieService.getCookie('user');
      // console.log(userString);
      if (userString) {
        try {
          const user = JSON.parse(userString);
          // console.log('user:', user);

          this.emailUser = user.email || '';
          this.role = user.role || '';

          if (this.isLoggedInWithEnovi) {
            this.nameUser = user.username || '';
            if (user.avatar) {
              this.picture = this.urlBackend_img_avartaUser + user.avatar;
            } else {
              this.picture = '/img/avatar.png';
            }
          }

          if (this.isLoggedIn) {
            this.nameUser = user.userName || '';
            this.picture = user.picture && user.picture.includes('https://lh3.googleusercontent.com') 
              ? user.picture 
              : this.urlBackend_img_avartaUser + user.picture || '';
          }

          // khi đăng ký instructor và load lại data thì dùng cái này
          if (user.username) {
            this.nameUser = user.username || '';
            if (user.avatar) {
              this.picture = this.urlBackend_img_avartaUser + user.avatar;
            } else {
              this.picture = '/img/avatar.png';
            }
          }

          // console.log('22222', user.username);
          // console.log('211', user.name);
          // console.log('21133', this.picture);

          // console.log('email', this.emailUser);
          // console.log('name', this.nameUser);
          // console.log('picture', this.picture);
          // console.log('role', this.role);

          this.updateLoginStatus(this.role || '');
        } catch (e) {
          console.error('Lỗi parse dữ liệu user:', e);
        }
      }
    }
  }

  private updateLoginStatus(role: string): void {
    if (role === 'admin') {
      this.isLogin = 3;
    } else if (this.role === 'instructor') {
      this.isLogin = 2;
      this.instructorDashboardURL = '/user/instructor/';
    } else if (this.role === 'student') {
      this.isLogin = 1;
      this.instructorDashboardURL = '/user/instructor/register';
    } else {
      this.isLogin = 0; // Reset nếu role không hợp lệ
    }

    console.log("......"+this.isLogin);
  }

  onHover(isHovered: boolean) {
    this.isHovered = isHovered; // Cập nhật trạng thái hover
    if (!isHovered) {
      this.hoveredField = null;
      // Reset selectedSubfields về giá trị ban đầu khi chuột rời khỏi
      if (this.fields.length > 0) {
        this.selectedSubfields = this.fields[0].subfields;
      }
    }
  }

  onHoverField(field: Field | null) {
    this.hoveredField = field;
    this.selectedSubfields = field ? field.subfields : [];
    // console.log('Hovered field:', field);
  }

  onHoverSubfield(subfield: any) {
    if (subfield !== null) {
      this.hoveredFieldSubitem = subfield; // Lưu field được hover vào biến hoveredField
      this.isShowCol3 = true;
    } else {
      this.isShowCol3 = false;
      this.hoveredFieldSubitem = []; // Lưu field được hover vào biến hoveredField
    }
  }

  // ===================
  // Đăng xuất
  // ===================

  logout(): void {
    this.apiService.authGoogleServiceService.logoutGoogle().subscribe({
      next: () => {
        this.RemoveInfoUserLogout();
        window.location.reload();
        console.log('Đăng xuất thành công');
      },
      error: (err) => {
        console.error('Lỗi khi đăng xuất:', err);
        // Ngay cả khi API lỗi, vẫn thực hiện đăng xuất local
        this.apiService.authGoogleServiceService.logoutLocal();
      },
    });
  }

  RemoveInfoUserLogout(): void {
    this.cookieService.clearAllCookies();
    console.log(this.cookieService.getAllCookieNames());
  }

  submitSeach() {
    const searchcontext = this.searchFormMode.SearchContext.trim();
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
      });
      this.fetchResults(searchcontext, 0, -1, 0, '', 0, 1, 'Mới nhất');
    }
  }
  submitSeachCategories(name:any) {
    console.log(name);
    const searchcontext = name;
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
              // console.log(data.success);
              // console.log(data.courses);
              // console.log(data.total);
              // console.log(data.currentPage);

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
            // console.error('Lỗi HTTP 0 self signal chứng chỉ bảo mật:', error);
            console.log(
              'Lỗi HTTP 0 self signal chứng chỉ https header component:'
            );
          },
        });
    }
  }

  getInstructorId(): { id: number; roleUser: string } {
    const userInfo = this.apiService.userServiceService.getUserLogin();
    console.log('userInfo:', userInfo.userName);
    if (!userInfo || userInfo.id === -1) {
      return { id: -1, roleUser: '' }; // Trả về 0 nếu chưa đăng nhập
    }


    return { id: userInfo.id, roleUser: userInfo.roleUser || '' };
  }

 
}
