import { Component, Input, OnInit } from '@angular/core';

interface user {
  username: string;
  email: string;
  role: string;
  createdAt: Date;
}
@Component({
  selector: 'app-table-data-user-admin',
  templateUrl: './table-data-user-admin.component.html',
  styleUrl: './table-data-user-admin.component.css',
  standalone: false,
})
export class TableDataUserAdminComponent implements OnInit {
  @Input() data: user[] = []; // Nhận dữ liệu từ component cha

  ngOnInit(): void {
    // (Tùy chọn) Thực hiện các tác vụ khởi tạo ở đây, ví dụ: gọi API để lấy dữ liệu
    if (!this.data || this.data.length === 0) {
      this.data = [
        {
          username: 'john_doe',
          email: 'john.doe@example.com',
          role: 'admin',
          createdAt: new Date('2023-10-26T10:00:00Z'),
        },
        {
          username: 'jane_smith',
          email: 'jane.smith@example.com',
          role: 'user',
          createdAt: new Date('2023-10-27T14:30:00Z'),
        },
      ];
    }
  }

  getStatusClass(status: string): string {
    return status === 'In Stock'
      ? 'bg-green-200 text-green-900'
      : 'bg-red-200 text-red-900';
  }
}
