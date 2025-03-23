import { ApiService } from '@app/services/api.service';
import { Component, QueryList, ViewChildren, OnInit, ChangeDetectorRef } from '@angular/core';
import { CourseItemShoppingCartComponent } from '../../components/course-item-shopping-cart/course-item-shopping-cart.component';
import { cart } from '@app/interface/cart';
import { CourseSearch } from '@app/interface/course';
import { CookieStorageService } from '@app/services/cookie_storage/cookie-storage.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrl: './shopping-cart.component.css',
  standalone: false,
})
export class ShoppingCartComponent implements OnInit {
  
  // ===========
  // construstor
  // ===========
  constructor(
    private apiService: ApiService,
    private CookieStorageService: CookieStorageService,
    private cdr: ChangeDetectorRef // Inject ChangeDetectorRef
  ) {}
  ngOnInit(): void {
    this.ShowListCourseInCart();
  }
  ShoppingCartComponent() {}

  // =========================
  // list course - right body
  // =========================
  listCourse: CourseSearch[] = [];

  lengthListCourse = this.listCourse.length;

  // ================================
  // selected all item shopping cart
  // ================================

  isSelectAll: boolean = false; // Trạng thái của nút "Chọn tất cả"
  checkedCount: number = 0; // Số lượng item được chọn
  selectedItems = new Map<string, boolean>(); // Sử dụng Map để lưu trữ dữ liệu

  @ViewChildren(CourseItemShoppingCartComponent)
  courseItemShoppingCartComponents!: QueryList<CourseItemShoppingCartComponent>;

  // Add this method to handle the updateListChange event
  onUpdateListChange() {
    this.checkedCount = 0;
  }

  getInstructorId(): number {
    const instructorId = this.CookieStorageService.getCookie('user');
    if (!instructorId) {
      console.log('instructorId is null');
      return -1;
    }
    const id = JSON.parse(instructorId).id;
    return id;
  }

  selectAll() {
    this.isSelectAll = !this.isSelectAll; // Toggle "Select All" state
    this.courseItemShoppingCartComponents.forEach(
      (item) => (item.isSelected = this.isSelectAll)
    );

    if (this.isSelectAll) {
      this.checkedCount = this.listCourse.length;
      this.listCourse.forEach(course => this.selectedItems.set(course.id.toString(), true));
    } else {
      this.checkedCount = 0;
      this.selectedItems.clear();
    }
  }

  onCheckboxChange(event: { value: string; checked: boolean }) {
    const { value, checked } = event;
    console.log(value, checked);

    if (checked) {
      this.selectedItems.set(value, true);
    } else {
      this.selectedItems.delete(value);
    }

    this.checkedCount = this.selectedItems.size;
    this.isSelectAll = this.checkedCount === this.listCourse.length;

    // Log the total price of selected items
    console.log('Total Selected Price:', this.getTotalSelectedPrice());
  }

  // =====
  // modal
  // =====
  isShowModal: boolean = false;

  isShowModalF() {
    this.isShowModal = !this.isShowModal;
    console.log(this.isShowModal);
  }

  ShowListCourseInCart() {
    // console.log('objectobjectobject11');
    const idInstructor = this.getInstructorId();

    if (!idInstructor) return;

    this.apiService.cartService.getCartListCourseUser(idInstructor).subscribe({
      next: (res) => {
        if (res.success) {
          console.log('ShowListCourseInCart11');
          this.listCourse = res.listCourse;
          this.checkedCount = 0;
          this.selectedItems.clear();
          this.cdr.detectChanges(); // Trigger change detection
        }
      },
      error: (err) => {
        console.warn('shoping cart request');
      },
    });
  }

  // ==================
  // Calculate total price for selected items
  // ==================
  getTotalSelectedPrice(): number {
    let totalSelectedPrice = 0;
    this.listCourse.forEach(course => {
      if (this.selectedItems.has(course.id.toString())) {
        totalSelectedPrice += course.price;
      }
    });
    return totalSelectedPrice;
  }
}
