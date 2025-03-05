import {
  Component,
  HostListener,
  ElementRef,
  Input,
  ViewChild,
  OnInit,
} from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';
import { ShareHeaderSearchService } from '@app/services/search/header_search/share-header-search.service';
import { Route, Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '@app/services/api.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.css',
  standalone: false,
})
export class SearchComponent implements OnInit {
  @ViewChild('FilterSearchForm') filterSearchForm!: NgForm;
  numberofResult: number = 0;
  filterElement = {
    rating: -1,
    language: -1,
    level: '',
    duration: -1,
    price: -1,
    page: 1,
  };

  SearchContext: string = '';

  totalPage = 0;
  totalItems = 0;
  currentPage = 1;
  itemsPerPage = 10;

  // ====================
  // button show filter
  // ====================

  isOpenFilter: boolean = true;

  constructor(
    private elementRef: ElementRef,
    private apiService: ApiService,
    private shareHeaderSearchService: ShareHeaderSearchService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

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
  // lọc theo cài đặt
  // ====================
  isHoveredLocTheoCaiDat = false;



  // ====================
  // ratings
  // ====================
  isRating: boolean = true;

  ratingValue = [{ value: 3 }, { value: 4 }, { value: 4.5 }];

  // ====================
  // list languages
  // ====================

  languages = [
    { id: '0', name: 'Tiếng Việt', value: 1 },
    { id: '1', name: 'Tiếng Anh', value: 2 },
    { id: '2', name: 'Tiếng Trung', value: 3 },
    { id: '3', name: 'Tiếng Hàn', value: 4 },
    { id: '4', name: 'Tiếng Nhật', value: 5 },
  ];

  isLanguage: boolean = false;

  // ====================
  // Video duration
  // ====================
  // so sánh giá trị nhỏ trước rồi so sánh giá trị lớn: n > 3 , n < 6 => id = 2

  VideoDuration = [
    { id: 0, name: '0-1 giờ', value: 1 },
    { id: 1, name: '1-3 giờ', value: 2 },
    { id: 2, name: '3-6 giờ', value: 3 },
    { id: 3, name: '6-17 giờ', value: 4 },
    { id: 4, name: '17+ giờ', value: 5 },
  ];

  isVideoDuration: boolean = true;

  // ====================
  // Level  of course
  // ====================

  LevelOfCourse = [
    { id: 0, name: 'Tất cả trình độ', value: 'all' },
    { id: 1, name: 'Người mới bắt đầu', value: 'beginner' },
    { id: 2, name: 'Trung cấp', value: 'intermediate' },
    { id: 3, name: 'Chuyên gia', value: 'advanced' },
  ];

  isLevelOfCourse: boolean = true;

  // ====================
  // price  of course
  // ====================

  PriceOfCourse = [
    { id: 0, name: 'Miễn phí', value: 1 },
    { id: 1, name: 'Trả phí', value: 2 },
  ];

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
      duration: 0,
      rate: 'this is ratings',
      price: 100,
    },
    {
      img: 'https://cdn-media.sforum.vn/storage/app/media/Van%20Pham/7/hinh-nen-desktop-35.jpg',
      title: 'this is title',
      description: 'this is description',
      author: 'this is author',
      duration: 0,
      rate: 'this is ratings',
      price: 10,
    },
  ];

  updateDataSearch() {
    this.shareHeaderSearchService.currentSearchTermTitle.subscribe((title) => {
      if (title !== null || title !== undefined) {
        this.listCourse = title;
      }
    });
  }

  ngOnInit(): void {
    this.updateDataSearch();
    this.getQueryParam();
    this.FilterSearchFormSubmit(1);
  }

  getQueryParam() {
    // this.route.queryParams.pipe(take(1)).subscribe((params) => {
    this.route.queryParams.subscribe((params) => {
      const title = params['title'];
      if (title !== undefined && title !== null && title.trim() !== '') {
        this.SearchContext = title;
      } else {
        console.warn('Query param "title" không hợp lệ:', title);
      }
    });
  }

  //------submit form search
  FilterSearchFormSubmit(pageSearch?: number) {
    let titleRecive: string = '';
    this.shareHeaderSearchService.currentSearchTermTitle.subscribe((title) => {
      if (title !== null || title !== undefined) {
        titleRecive = title;
      }
    });
    this.shareHeaderSearchService.currentSearchResultService.subscribe(
      (result) => {
        if (result !== null || result !== undefined) {
          this.listCourse = result;
          console.log(result.length);
        }
      }
    );
    this.shareHeaderSearchService.currentSearchTermTotalItem.subscribe(
      (data) => {
        if (data !== null || data !== undefined) {
          this.numberofResult = data;
          this.totalItems = data;
        }
      }
    );
    this.shareHeaderSearchService.currentSearchTermPage.subscribe((page) => {
      if (page !== null || page !== undefined) {
        this.onPageChange(page);
      }
    });

    if (titleRecive != undefined && titleRecive != '') {
      if (titleRecive?.trim()) {
        const queryParams: any = {
          title: titleRecive,
          rating: this.filterElement.rating,
          language: this.filterElement.language,
          duration: this.filterElement.duration,
          level: this.filterElement.level,
          price: this.filterElement.price,
          page: pageSearch ?? this.filterElement.page,
        };

        // Xóa các query params có giá trị null, undefined hoặc chuỗi rỗng
        Object.keys(queryParams).forEach(
          (key) =>
            (!queryParams[key] ||
              queryParams[key] === '' ||
              queryParams[key] === -1) &&
            delete queryParams[key]
        );

        this.router.navigate([], {
          relativeTo: this.route,
          queryParams: queryParams,
          queryParamsHandling: 'merge', // Giữ nguyên các query params khác nếu có
        });

        console.log(
          'this.filterElement.language: ' + this.filterElement.language
        );

        this.fetchResults(
          titleRecive,
          this.filterElement.rating,
          this.filterElement.language,
          this.filterElement.duration,
          this.filterElement.level,
          this.filterElement.price,
          queryParams.page
        );
      }
    }
  }

  fetchResults(
    titleSearch: string,
    ratingSearch: number,
    languageSearch: number,
    durationSearch: number,
    levelSearch: string,
    priceSearch: number,
    pageSearch: number
  ) {
    this.apiService.searchServiceService
      .searchCoursesByTitle(
        titleSearch,
        ratingSearch,
        languageSearch,
        durationSearch,
        levelSearch,
        priceSearch,
        pageSearch
      )
      .subscribe({
        next: (data) => {
          if (data.success) {
            console.log(data.success);
            console.log('tootle' + data.total);
            console.log('course: ' + data.courses.length);

            this.onPageChange(data.currentPage);
            this.calculateTotalPage(data.total);

            this.shareHeaderSearchService.updateSearchTerm(
              titleSearch,
              ratingSearch,
              languageSearch,
              durationSearch,
              levelSearch,
              priceSearch,
              data.courses,
              data.currentPage,
              data.total
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

  onPageChange(page: number): void {
    this.currentPage = page;
  }

  private calculateTotalPage(totalItem: number) {
    this.totalPage = Math.ceil(totalItem / 20);
  }

  nextPageRecivePagination() {
    if (this.filterElement.page == this.totalPage) return;

    this.filterElement.page += 1;
    this.FilterSearchFormSubmit(this.filterElement.page);
  }
  previousPageRecivePagination() {
    if (this.filterElement.page > 1) {
      this.filterElement.page -= 1;
      this.FilterSearchFormSubmit(this.filterElement.page);
    }
  }
}
