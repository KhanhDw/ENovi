import { Component, HostListener, ElementRef } from '@angular/core';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrl: './header.component.css',
    standalone: false
})
export class HeaderComponent {
  isLogin: number = 1;
  // dropdown
  isOpen: boolean = false;

  avartFeature = [
    { name: 'Bảng điều khiển' },
    { name: 'Khoá học' },
    { name: 'Giảng dạy' },
  ];

  constructor(private elementRef: ElementRef) {}

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
}
