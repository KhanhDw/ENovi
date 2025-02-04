import { Component, QueryList, ViewChildren } from '@angular/core';
import { CourseItemShoppingCartComponent } from '../../components/course-item-shopping-cart/course-item-shopping-cart.component';

@Component({
    selector: 'app-shopping-cart',
    templateUrl: './shopping-cart.component.html',
    styleUrl: './shopping-cart.component.css',
    standalone: false
})
export class ShoppingCartComponent {
  // ===========
  // construstor
  // ===========
  ShoppingCartComponent() {}

  // =========================
  // list course - right body
  // =========================
  listCourse = [
    {
      id: '1',
      img: 'https://cdn-media.sforum.vn/storage/app/media/Van%20Pham/7/hinh-nen-desktop-35.jpg',
      title: 'this is title',
      description: 'this is description',
      author: 'this is author',
      duration: 'this is duration',
      rate: 'this is ratings',
      price: '10,000,000',
    },
    {
      id: '2',
      img: 'https://cdn-media.sforum.vn/storage/app/media/Van%20Pham/7/hinh-nen-desktop-35.jpg',
      title: 'this is title',
      description: 'this is description',
      author: 'this is author',
      duration: 'this is duration',
      rate: 'this is ratings',
      price: '10,000,000',
    },
    {
      id: '3',
      img: 'https://cdn-media.sforum.vn/storage/app/media/Van%20Pham/7/hinh-nen-desktop-35.jpg',
      title: 'this is title',
      description: 'this is description',
      author: 'this is author',
      duration: 'this is duration',
      rate: 'this is ratings',
      price: '10,000,000',
    },
    {
      id: '4',
      img: 'https://cdn-media.sforum.vn/storage/app/media/Van%20Pham/7/hinh-nen-desktop-35.jpg',
      title: 'this is title',
      description: 'this is description',
      author: 'this is author',
      duration: 'this is duration',
      rate: 'this is ratings',
      price: '10,000,000',
    },
    {
      id: '5',
      img: 'https://cdn-media.sforum.vn/storage/app/media/Van%20Pham/7/hinh-nen-desktop-35.jpg',
      title: 'this is title',
      description: 'this is description',
      author: 'this is author',
      duration: 'this is duration',
      rate: 'this is ratings',
      price: '10,000,000',
    },
    {
      id: '6',
      img: 'https://cdn-media.sforum.vn/storage/app/media/Van%20Pham/7/hinh-nen-desktop-35.jpg',
      title: 'this is title',
      description: 'this is description',
      author: 'this is author',
      duration: 'this is duration',
      rate: 'this is ratings',
      price: '10,000,000',
    },
    {
      id: '7',
      img: 'https://cdn-media.sforum.vn/storage/app/media/Van%20Pham/7/hinh-nen-desktop-35.jpg',
      title: 'this is title',
      description: 'this is description',
      author: 'this is author',
      duration: 'this is duration',
      rate: 'this is ratings',
      price: '10,000,000',
    },
  ];

  lengthListCourse = this.listCourse.length;

  // ================================
  // selected all item shopping cart
  // ================================

  isSelectAll: boolean = false; // Trạng thái của nút "Chọn tất cả"
  checkedCount: number = 0; // Số lượng item được chọn
  selectedItems = new Map<string, boolean>(); // Sử dụng Map để lưu trữ dữ liệu

  @ViewChildren(CourseItemShoppingCartComponent)
  courseItemShoppingCartComponents!: QueryList<CourseItemShoppingCartComponent>;

  selectAll() {
    this.isSelectAll = !this.isSelectAll; // Đổi trạng thái của nút "Chọn tất cả"
    this.courseItemShoppingCartComponents.forEach(
      (item) => (item.isSelected = this.isSelectAll)
    );

    if (this.isSelectAll) {
      this.checkedCount = this.listCourse.length;
    } else {
      this.checkedCount = 0;
    }
  }

  onCheckboxChange(event: { value: string; checked: boolean }) {
    const { value, checked } = event;
    console.log(value, checked);
    // Thêm hoặc cập nhật dữ liệu trong Map
    this.selectedItems.set(value, checked);
    // In ra Map để kiểm tra
    console.log(this.selectedItems);
    // Nếu bạn muốn xóa một phần tử khỏi Map khi checkbox bỏ chọn
    if (!checked) {
      this.selectedItems.delete(value);
    }
    this.checkedCount = this.selectedItems.size;
  }

  // =====
  // modal
  // =====
  isShowModal: boolean = false;

  isShowModalF() {
    this.isShowModal = !this.isShowModal;
    console.log(this.isShowModal);
  }
}
