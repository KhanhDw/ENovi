import { ApiService } from '@app/services/api.service';
import {
  Component,
  QueryList,
  ViewChildren,
  OnInit,
  OnDestroy, // Added OnDestroy
  ChangeDetectorRef,
} from '@angular/core';
import { CourseItemShoppingCartComponent } from '../../components/course-item-shopping-cart/course-item-shopping-cart.component';
import { cart } from '@app/interface/cart';
import { CourseSearch } from '@app/interface/course';
import { CookieStorageService } from '@app/services/cookie_storage/cookie-storage.service';
import { MyLearningService } from '@app/services/my-learning/my-learning.service';
@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrl: './shopping-cart.component.css',
  standalone: false,
})
export class ShoppingCartComponent implements OnInit, OnDestroy {
  // ===========
  // construstor
  // ===========
  constructor(
    private apiService: ApiService,
    private CookieStorageService: CookieStorageService,
    private myLearningService: MyLearningService,
    private cdr: ChangeDetectorRef // Inject ChangeDetectorRef
  ) {}
  ngOnInit(): void {
    this.ShowListCourseInCart();
  }
  ShoppingCartComponent() {}

  ngOnDestroy(): void {
    // Clear localStorage and reset component state
    this.listCourse = [];
    this.checkedCount = 0;
    this.selectedItems.clear();
    this.isSelectAll = false;
  }

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
      this.listCourse.forEach((course) =>
        this.selectedItems.set(course.id.toString(), true)
      );
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
       
          this.checkCouseHasInMylearning();

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
  getTotalOriginalPrice(): number {
    let totalOriginalPrice = 0;
    this.listCourse.forEach((course) => {
      if (this.selectedItems.has(course.id.toString())) {
        totalOriginalPrice += course.price;
      }
    });
    return totalOriginalPrice;
  }
  getTotalSelectedPrice(): number {
    let totalSelectedPrice = 0;
    this.listCourse.forEach((course) => {
      if (this.selectedItems.has(course.id.toString())) {
        const discount = course.percent_discount; // Default to 0% if no discount
        const discountedPrice = course.price * (1 - discount / 100);
        totalSelectedPrice += discountedPrice;
      }
    });
    return totalSelectedPrice;
  }
  // ==================
  // Calculate total discount for selected items
  // ==================
  getTotalSelectedDiscount(): number {
    let totalSelectedDiscount = 0;
    this.listCourse.forEach((course) => {
      if (this.selectedItems.has(course.id.toString())) {
        const discount = course.percent_discount; // Default to 0% if no discount
        const discountAmount = (course.price * discount) / 100;
        totalSelectedDiscount += discountAmount;
      }
    });
    return totalSelectedDiscount;
  }

  confirmPayment() {
    const selectedCourses = this.listCourse.filter((course) =>
      this.selectedItems.has(course.id.toString())
    );

    if (selectedCourses.length === 0) {
      console.log('No courses selected for payment.');
      alert(
        'Vui lòng chọn ít nhất một khóa học trước khi tiến hành thanh toán.'
      );
      return;
    }

    const paymentData = {
      courses: selectedCourses,
      totalOriginalPrice: this.getTotalOriginalPrice(),
      totalSelectedPrice: this.getTotalSelectedPrice(),
      totalDiscount: this.getTotalSelectedDiscount(),
      timestamp: new Date().toISOString(),
    };

    localStorage.setItem('paymentData', JSON.stringify(paymentData));
    console.log('Payment data saved to localStorage:', paymentData);

    // Optionally, you can clear the selection after confirming payment
    this.selectedItems.clear();
    this.checkedCount = 0;
    this.isSelectAll = false;
    this.courseItemShoppingCartComponents.forEach(
      (item) => (item.isSelected = false)
    );

    // Navigate to the payment page
    window.location.href = '/payment';
  }

  checkCouseHasInMylearning() {
    const userId = this.getInstructorId();
    if (userId === -1) {
      console.log('Invalid user ID');
      return;
    }

    const courseIds = this.listCourse.map((course) => course.id);

    console.log('courseIds11:', this.listCourse.length);
    console.log('courseIds:', courseIds);

    this.myLearningService
      .checkMultipleCoursesInMyLearning(userId, courseIds)
      .subscribe({
        next: (res) => {
          if (res.success) {
            console.log('Courses in My Learning:', res.data);
          } else {
            console.warn('Failed to check courses in My Learning');
          }
        },
        error: (err) => {
          console.error('Error checking courses in My Learning:', err);
        },
      });
  }
}
