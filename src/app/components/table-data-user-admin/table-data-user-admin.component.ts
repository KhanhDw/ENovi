import { Component, Input, OnInit } from '@angular/core';

interface Product {
  name: string;
  price: number;
  quantity: number;
  status: 'In Stock' | 'Out of Stock';
}
@Component({
  selector: 'app-table-data-user-admin',
  templateUrl: './table-data-user-admin.component.html',
  styleUrl: './table-data-user-admin.component.css',
  standalone: false,
})
export class TableDataUserAdminComponent implements OnInit {
  @Input() data: Product[] = []; // Nhận dữ liệu từ component cha

  ngOnInit(): void {
    // (Tùy chọn) Thực hiện các tác vụ khởi tạo ở đây, ví dụ: gọi API để lấy dữ liệu
    if (!this.data || this.data.length === 0) {
      this.data = [
        {
          name: 'Áo Thun Cotton',
          price: 25,
          quantity: 150,
          status: 'In Stock',
        },
        {
          name: 'Quần Jeans Denim',
          price: 60,
          quantity: 80,
          status: 'Out of Stock',
        },
        { name: 'Giày Thể Thao', price: 85, quantity: 120, status: 'In Stock' },
      ];
    }
  }

  getStatusClass(status: string): string {
    return status === 'In Stock'
      ? 'bg-green-200 text-green-900'
      : 'bg-red-200 text-red-900';
  }
}
