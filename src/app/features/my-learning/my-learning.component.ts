import { Component } from '@angular/core';

@Component({
    selector: 'app-my-learning',
    templateUrl: './my-learning.component.html',
    styleUrl: './my-learning.component.css',
    standalone: false
})
export class MyLearningComponent {
  lengthListMyCourses = 0;

  // =========================
  // list courses
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

  // dùng trackby để tăng hiệu suất render
  trackByFn(index: number, item: any): any {
    return item.id; // Hoặc một thuộc tính duy nhất khác của item
  }

  // ====================
  // button sort by
  // ====================

  isOpenDropdownSortBy: boolean = false;

  sortby = [{ name: 'Tăng dần' }, { name: 'Giảm dần' }, { name: 'Mới nhất' }];

  toggleSortBy() {
    this.isOpenDropdownSortBy = !this.isOpenDropdownSortBy;
  }
}
