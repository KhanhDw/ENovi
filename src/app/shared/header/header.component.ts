import { Component, HostListener, ElementRef } from '@angular/core';
import { Route } from '@angular/router';
import { ApiService } from '@app/services/api.service';
import { WindowRef } from '@app/services/window/window-ref.service';

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
export class HeaderComponent {
  isLogin: number = 0; // 0 - 1 - 2 - 3  : chưa đăng nhập - user - instructor - admin
  adminDashboardURL: string = '/admin';
  userDashboardURL: string = '/user/';
  instructorDashboardURL: string = '/user/instructor';
  publishProfileURL: string = '/user/profile';
  cartURL: string = '/cart';
  signupURL: string = '/register';
  loginURL: string = '/login';

  nameUser: string = 'GiaKhanh';
  emailUser: string = 'GiaKhanh@gmail.com';
  // dropdown
  isOpen: boolean = false;

  avartFeature = [
    { name: 'Khoá học của tôi', url: '/my-learning' },
    { name: 'Hoạt động giảng dạy', url: '/user/courses-instructor' },
    { name: 'Điều chỉnh hồ sơ giảng viên', url: '/notfound' },
    { name: 'Điều chỉnh hồ sơ cá nhân', url: '' },
    { name: 'Ngôn ngữ', url: '' },
  ];

  constructor(private elementRef: ElementRef, private apiService: ApiService,private winRef: WindowRef) {}

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
    const clickedInside_target = clickedInside_id.contains(target); // lấy đúng button có id=btnAvarta

    if (!clickedInside_target) {
      this.isOpen = false;
    }
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

    const win = this.winRef.nativeWindow;
    if (win) {
      console.log('Chiều rộng màn hình:', win.innerWidth);
    }else{
      console.log('Không thể lấy window');
    }

    // Khởi tạo selectedSubfields với subfields của field đầu tiên (nếu có)
    if (this.fields.length > 0) {
      this.selectedSubfields = this.fields[0].subfields;
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
    this.hoveredField = field; // Lưu field được hover vào biến hoveredField
    if (field) {
      // Kiểm tra field khác null
      this.selectedSubfields = field.subfields;
    } else {
      this.selectedSubfields = []; // Nếu field là null, gán selectedSubfields là mảng rỗng
    }
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

  // other properties and methods

  get isLoggedIn(): boolean {
    if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
      return !!localStorage.getItem('token'); // Ví dụ
    }
    return false; // Giá trị mặc định khi không có localStorage
  }

  logout(): void {
    this.apiService.authGoogleServiceService.logoutGoogle().subscribe({
      next: () => {
        console.log('Đăng xuất thành công');
      },
      error: (err) => {
        console.error('Lỗi khi đăng xuất:', err);
        // Ngay cả khi API lỗi, vẫn thực hiện đăng xuất local
        this.apiService.authGoogleServiceService.logoutLocal();
      },
    });
  }
}
