import { catchError } from 'rxjs/operators';
import {
  Component,
  HostListener,
  ElementRef,
  OnInit,
  AfterViewInit,
  NgZone,
} from '@angular/core';
import { Route } from '@angular/router';
import { ApiService } from '@app/services/api.service';
import { WindowRef } from '@app/services/window/window-ref.service';
import { CookieStorageService } from '@app/services/cookie_storage/cookie-storage.service';
import { Observable } from 'rxjs';
import { User } from '@app/interface/user';

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
  publishProfileURL: string = '/user/profile';
  cartURL: string = '/cart';
  signupURL: string = '/register';
  loginURL: string = '/login';

  nameUser: string = '';
  emailUser: string = '';
  picture: string = '';
  role: string = '';

  // dropdown
  isOpen: boolean = false;

  avartFeature = [
    { name: 'Khoá học của tôi', url: '/my-learning' },
    { name: 'Hoạt động giảng dạy', url: '/user/courses-instructor' },
    { name: 'Điều chỉnh hồ sơ giảng viên', url: '/notfound' },
    { name: 'Điều chỉnh hồ sơ cá nhân', url: '' },
    { name: 'Ngôn ngữ', url: '' },
  ];

  constructor(
    private elementRef: ElementRef,
    private apiService: ApiService,
    private winRef: WindowRef,
    private cookieService: CookieStorageService,
    private ngZone: NgZone
  ) {}

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
    const categoriesCookie = this.cookieService.getCookie("categories");
    const categoriesCookieV1 = this.cookieService.getCookie("categoriesV1");
    const categoriesCookieV2 = this.cookieService.getCookie("categoriesV2");
    const fieldsLevel1  = categoriesCookie ? JSON.parse(categoriesCookie) : [];
    const fieldsLevel2  = categoriesCookieV1 ? JSON.parse(categoriesCookieV1) : [];
    const fieldsLevel3  = categoriesCookieV2 ? JSON.parse(categoriesCookieV2) : [];

    const structuredFields = fieldsLevel1.map((field1: { id: any; }) => ({
      ...field1,
      subfields: fieldsLevel2
        .filter((field2: { categories_id: any; }) => field2.categories_id === field1.id)
        .map((field2: { id: any; }) => ({ 
          ...field2,
          subitems: fieldsLevel3
            .filter((field3: { categoriesV1_id: any; }) => field3.categoriesV1_id === field2.id)
            .map((field3: { name: any; }) => field3.name)
        }))
    }));

    
    this.fields = structuredFields;

    if (this.fields.length > 0) {
      this.selectedSubfields = this.fields[0].subfields;
    }

    this.updateInforUser();
  }

  ngAfterViewInit(): void {
    this.ngZone.runOutsideAngular(() => {
      setInterval(() => {
        this.ngZone.run(() => {
          this.updateInforUser();
        });
      }, 5000);
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
            this.picture = user.avatar || '/img/avatar.png';
          }

          if (this.isLoggedIn) {
            this.nameUser = user.name || '';
            this.picture = user.picture || '';
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
}
