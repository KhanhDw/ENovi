import {
  Directive,
  Component,
  ElementRef,
  HostListener,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrl: './course-detail.component.css',
})
export class CourseDetailComponent {
  // ====================
  // Section
  // ====================

  // Map chứa trạng thái của các section
  sections: Map<string, boolean> = new Map([
    ['isShowSection1', false],
    ['isShowSection2', false],
    ['isShowSection3', false],
    ['isShowSection4', false],
    ['isShowSection5', false],
  ]);

  // chuyển map thành các mảng Key và Value
  get sectionsArray(): [string, boolean][] {
    return Array.from(this.sections.entries());
  }

  getSectionState(section: string): boolean {
    return this.sections.get(section) || false;
  }

  toggleSection(key: string): void {
    const currentValue = this.sections.get(key);
    if (currentValue !== undefined) {
      this.sections.set(key, !currentValue);
    }
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
  @ViewChild('infor_bottom') inforBottomElement!: ElementRef; // Tham chiếu đến infor
  @ViewChild('sidebar') sidebarElement!: ElementRef; // Tham chiếu đến sidebar
  @ViewChild('infor_top') inforTopElement!: ElementRef; // Tham chiếu đến infor

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.syncSidebarHeight(); // Đồng bộ sau khi nội dung render
    }, 0);
  }

  @HostListener('window:resize')
  onResize() {
    this.syncSidebarHeight(); // Cập nhật khi thay đổi kích thước cửa sổ
  }

  private syncSidebarHeight(): void {
    const inforBottomHeight =
      this.inforBottomElement.nativeElement.offsetHeight; // Bao gồm cả nội dung bị cuộn
    const inforTopHeight = this.inforTopElement.nativeElement.offsetHeight; // Bao gồm cả nội dung bị cuộn

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

  constructor(private elementRef: ElementRef) {}

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
}
