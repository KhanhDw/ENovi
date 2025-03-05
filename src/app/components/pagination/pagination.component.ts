import { Component, Input, OnInit, OnChanges, EventEmitter, Output , SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-pagination',
  standalone: false,
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.css',
})
export class PaginationComponent implements OnInit {
  @Input() totalItem!: number; // tổng số item lấy được từ server
  @Input() itemCurrentPage!: number; // số item trong mõi trang
  @Input() currentPageParent!: number; // trang hiện tại

  currentPage: number = 1; // Khởi tạo trang đầu tiên
  totalPage: number = 1; // Mặc định 1 trang nếu chưa có dữ liệu

  @Output() btnNextPage = new EventEmitter<void>();
  @Output() btnPreviousPage = new EventEmitter<void>();

  ngOnInit(): void {
    this.calculateTotalPage();
    this.currentPage = this.currentPageParent;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['totalItem'] || changes['itemCurrentPage']) {
      this.calculateTotalPage();
    }
    if (changes['currentPageParent']) {
      this.currentPage = this.currentPageParent;
    }
  }

  private calculateTotalPage() {
    this.totalPage = this.itemCurrentPage > 0 ? Math.ceil(this.totalItem / this.itemCurrentPage) : 1;
  }

  PageNext() {
    this.btnNextPage.emit();
  }

  PagePrevious() {
    this.btnPreviousPage.emit();
  }
}
