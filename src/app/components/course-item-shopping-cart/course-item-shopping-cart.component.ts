import { Component, Input, EventEmitter, Output } from '@angular/core';

@Component({
    selector: 'app-course-item-shopping-cart',
    templateUrl: './course-item-shopping-cart.component.html',
    styleUrl: './course-item-shopping-cart.component.css',
    standalone: false
})
export class CourseItemShoppingCartComponent {
  // ==============================
  // Nhận dữ liệu từ component cha
  // ==============================
  @Input() listCourse!: {
    id: string;
    img: string;
    title: string;
    description: string;
    author: string;
    duration: string;
    rate: string;
    price: string;
  }[];

  @Input() isSelected: boolean = false;

  // ==============================
  // gửi dữ liệu lên component cha
  // ==============================
  @Output() checkedChange = new EventEmitter<{
    value: string;
    checked: boolean;
  }>();

  // ====================================================
  // cập nhật trang thái checked và gửi đến component cha
  // ====================================================
  toggleChecked(event: Event) {
    const target = event.target as HTMLInputElement; // Ép kiểu thành HTMLInputElement
    const value = target.value; // Lấy giá trị của checkbox
    const checked = target.checked; // Lấy trạng thái checked
    this.checkedChange.emit({ value, checked }); // Phát sự kiện thông báo lên cha
  }
}
