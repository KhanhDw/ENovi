import { Component, HostListener, ElementRef } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.css',
  standalone: false,
})
export class SearchComponent {
  // ====================
  // button show filter
  // ====================

  isOpenFilter: boolean = true;

  constructor(private elementRef: ElementRef) {}

  toggleFilter() {
    this.isOpenFilter = !this.isOpenFilter;
  }

  // ====================
  // button sort by
  // ====================

  isOpenDropdownSortBy: boolean = false;

  sortby = [{ name: 'Tăng dần' }, { name: 'Giảm dần' }, { name: 'Mới nhất' }];

  toggleSortBy() {
    this.isOpenDropdownSortBy = !this.isOpenDropdownSortBy;
  }

  // lấy sự kiện click trên toàn trang web
  @HostListener('document:click', ['$event'])
  // thực hiện sự kiện click
  onClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    const clickedInside_id =
      this.elementRef.nativeElement.querySelector('#btnSortBy');
    const clickedInside = clickedInside_id.contains(target);

    if (!clickedInside) {
      this.isOpenDropdownSortBy = false;
    }
  }

  // ====================
  // ratings
  // ====================
  isRating: boolean = true;

  // ====================
  // list languages
  // ====================

  languages = [
    { name: 'Tiếng Trung Quốc' },
    { name: 'Tiếng Anh' },
    { name: 'Tiếng Hindi' },
    { name: 'Tiếng Tây Ban Nha' },
    { name: 'Tiếng Pháp' },
    { name: 'Tiếng Ả Rập' },
    { name: 'Tiếng Bengali' },
    { name: 'Tiếng Nga' },
    { name: 'Tiếng Bồ Đào Nha' },
    { name: 'Tiếng Urdu' },
    { name: 'Tiếng Indonesia' },
    { name: 'Tiếng Đức' },
    { name: 'Tiếng Nhật' },
    { name: 'Tiếng Swahili' },
    { name: 'Tiếng Marathi' },
    { name: 'Tiếng Telugu' },
    { name: 'Tiếng Thổ Nhĩ Kỳ' },
    { name: 'Tiếng Tamil' },
    { name: 'Tiếng Việt' },
    { name: 'Tiếng Hàn' },
    { name: 'Tiếng Ý' },
    { name: 'Tiếng Thái' },
    { name: 'Tiếng Gujarati' },
    { name: 'Tiếng Ba Tư (Farsi)' },
    { name: 'Tiếng Punjabi' },
    { name: 'Tiếng Malayalam' },
    { name: 'Tiếng Kannada' },
    { name: 'Tiếng Ukraina' },
    { name: 'Tiếng Myanmar (Miến Điện)' },
    { name: 'Tiếng Tagalog (Philippines)' },
  ];

  isLanguage: boolean = false;

  // ====================
  // Video duration
  // ====================

  VideoDuration = [
    { name: '0-1 giờ' },
    { name: '1-3 giờ' },
    { name: '3-6 giờ' },
    { name: '6-17 giờ' },
    { name: '17+ giờ' },
  ];

  isVideoDuration: boolean = true;

  // ====================
  // Level  of course
  // ====================

  LevelOfCourse = [
    { name: 'Tất cả trình độ' },
    { name: 'Người mới bắt đầu' },
    { name: 'Trung cấp' },
    { name: 'Chuyên gia' },
  ];

  isLevelOfCourse: boolean = true;

  // ====================
  // price  of course
  // ====================

  PriceOfCourse = [{ name: 'Trả phí' }, { name: 'Miễn phí' }];

  isPriceOfCourse: boolean = true;

  ToggleFilterItem(name: string) {
    if (name === 'ratings') {
      this.isRating = !this.isRating;
    } else if (name === 'language') {
      this.isLanguage = !this.isLanguage;
    } else if (name === 'VideoDuration') {
      this.isVideoDuration = !this.isVideoDuration;
    } else if (name === 'Level') {
      this.isLevelOfCourse = !this.isLevelOfCourse;
    } else if (name === 'Price') {
      this.isPriceOfCourse = !this.isPriceOfCourse;
    }
  }

  //list course - right body
  listCourse = [
    {
      img: 'https://cdn-media.sforum.vn/storage/app/media/Van%20Pham/7/hinh-nen-desktop-35.jpg',
      title: 'this is title',
      description: 'this is description',
      author: 'this is author',
      duration: 'this is duration',
      rate: 'this is ratings',
      price: '10,000,000',
    },
    {
      img: 'https://cdn-media.sforum.vn/storage/app/media/Van%20Pham/7/hinh-nen-desktop-35.jpg',
      title: 'this is title',
      description: 'this is description',
      author: 'this is author',
      duration: 'this is duration',
      rate: 'this is ratings',
      price: '10,000,000',
    },
    {
      img: 'https://cdn-media.sforum.vn/storage/app/media/Van%20Pham/7/hinh-nen-desktop-35.jpg',
      title: 'this is title',
      description: 'this is description',
      author: 'this is author',
      duration: 'this is duration',
      rate: 'this is ratings',
      price: '10,000,000',
    },
    {
      img: 'https://cdn-media.sforum.vn/storage/app/media/Van%20Pham/7/hinh-nen-desktop-35.jpg',
      title: 'this is title',
      description: 'this is description',
      author: 'this is author',
      duration: 'this is duration',
      rate: 'this is ratings',
      price: '10,000,000',
    },
    {
      img: 'https://cdn-media.sforum.vn/storage/app/media/Van%20Pham/7/hinh-nen-desktop-35.jpg',
      title: 'this is title',
      description: 'this is description',
      author: 'this is author',
      duration: 'this is duration',
      rate: 'this is ratings',
      price: '10,000,000',
    },
    {
      img: 'https://cdn-media.sforum.vn/storage/app/media/Van%20Pham/7/hinh-nen-desktop-35.jpg',
      title: 'this is title',
      description: 'this is description',
      author: 'this is author',
      duration: 'this is duration',
      rate: 'this is ratings',
      price: '10,000,000',
    },
    {
      img: 'https://cdn-media.sforum.vn/storage/app/media/Van%20Pham/7/hinh-nen-desktop-35.jpg',
      title: 'this is title',
      description: 'this is description',
      author: 'this is author',
      duration: 'this is duration',
      rate: 'this is ratings',
      price: '10,000,000',
    },
  ];
}
