import { Component, ChangeDetectorRef } from '@angular/core';
import { PaymentRequest } from '@app/interface/paymentshistory';
import { ApiService } from '@app/services/api.service';
import * as XLSX from 'xlsx';
interface RevenueData {
  date: string;
  revenue: number;
  courseSold: number;
  registeredStudents: number;
  websiteCommission: number;
  instructorPayment: number;
}

@Component({
  selector: 'app-admin-pay',
  templateUrl: './admin-pay.component.html',
  styleUrl: './admin-pay.component.css',
  standalone: false,
})
export class AdminPayComponent {
  // ================================
  // table data revenue detail
  // ================================
  bankdata: {
    id: number;
    nameBank: string;
    logo: string;
  }[] = [];
  transactions: PaymentRequest[] = [];

  transactions_pending: PaymentRequest[] = [];
  transactions_confirmed: PaymentRequest[] = [];
  transactions_approved: PaymentRequest[] = [];
  transactions_rejected: PaymentRequest[] = [];
  revenueData: RevenueData[] = [
    {
      date: '01/01/2024',
      revenue: 1000000,
      courseSold: 2,
      registeredStudents: 2,
      websiteCommission: 100000,
      instructorPayment: 900000,
    }
  ];

  constructor(private apiService: ApiService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.getBank();
    this.getFetchRequestWithdrawTable();
    this.getFetchRequestWithdrawTable_confirmed();
  }

  formatCurrency(amount: number): string {
    return amount.toLocaleString('vi-VN', {
      style: 'currency',
      currency: 'VND',
    });
  }
  getInstructorId(): number {
    const userInfo = this.apiService.userServiceService.getUserLogin();
    if (!userInfo || userInfo.id === -1) {
      return 0; // Trả về 0 nếu chưa đăng nhập
    }
    return userInfo.id;
  }

  getBank() {
    this.apiService.bankService.getAllBanks().subscribe({
      next: (banks) => {
        console.log('Banks retrieved successfully:', banks);
        this.bankdata = banks;
      },
      error: (err) => {
        console.error('Error retrieving banks:');
      },
    });
  }
  getFetchRequestWithdrawTable() {
    // const userId = this.getInstructorId(); // Lấy userId từ cookie hoặc dịch vụ người dùng
    const userId = -1;
    this.apiService.paymentHistoryService
      .getWithdrawalHistoryByInstructor(userId)
      .subscribe({
        next: (response) => {
          if (response && response.success) {
            console.log('Lịch sử rút tiền:', response.data);
            this.transactions = response.data;
            this.transactions_pending = this.transactions.filter(
              (transaction) => transaction.status === 'pending'
            );
            this.transactions_rejected = this.transactions.filter(
              (transaction) => transaction.status === 'rejected'
            );
          } else {
            console.error('Lỗi khi lấy lịch sử rút tiền:', response.message);
          }
        },
        error: (error) => {
          console.error('Lỗi khi lấy lịch sử rút tiền:');
        },
      });
  }
  getFetchRequestWithdrawTable_confirmed() {
    // const userId = this.getInstructorId(); // Lấy userId từ cookie hoặc dịch vụ người dùng
    const userId = -1;
    this.apiService.paymentHistoryService
      .getWithdrawalHistoryByInstructor_confirmed(userId)
      .subscribe({
        next: (response) => {
          if (response && response.success) {
            console.log('Lịch sử rút tiền:', response.data);
            this.transactions_confirmed = response.data;
            this.TableDataRequestWithdraw_approved();
          } else {
            console.error('Lỗi khi lấy lịch sử rút tiền:', response.message);
          }
        },
        error: (error) => {
          console.error('Lỗi khi lấy lịch sử rút tiền:');
        },
      });
  }

  TableDataRequestWithdraw_approved() {
    this.transactions_approved = this.transactions.filter(
      (transaction) => transaction.status === 'approved'
    );
  }

  getStatusClass(status: string): string {
    switch (status.toLowerCase()) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      case 'refunded':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  }

  XacNhanDongY(id: number): void {
    console.log('Clicked row ID:', id);
    this.updatePaymentStatus(id, 'approved');
    this.cdr.detectChanges();
  }
  XacNhanThanhToan(id: number): void {
    console.log('Clicked row ID:', id);
    this.updatePaymentStatus(id, 'completed');
    this.cdr.detectChanges();
  }
  TuChoiThanhToan(id: number): void {
    console.log('Clicked row ID:', id);
    this.updatePaymentStatus(id, 'rejected');
    this.cdr.detectChanges();
  }

  updatePaymentStatus(paymentHistoryId: number, newStatus: string): void {
    const validStatuses = ['completed', 'rejected', 'approved'];
    if (!validStatuses.includes(newStatus)) {
      console.error(
        `Invalid status. Valid statuses are: ${validStatuses.join(', ')}.`
      );
      return;
    }

    this.apiService.paymentHistoryService
      .updatePaymentStatus(paymentHistoryId, newStatus)
      .subscribe({
        next: (response) => {
          if (response && response.success) {
            console.log(
              'Payment status updated successfully:',
              response.message
            );
            // Refresh the data or perform any additional actions if needed
            this.getFetchRequestWithdrawTable();
            this.getFetchRequestWithdrawTable_confirmed();
            this.cdr.detectChanges();
          } else {
            console.error('Error updating payment status:', response.message);
          }
        },
        error: (error) => {
          console.error('Error updating payment status:', error);
        },
      });
  }


  exportToExcel(): void {
    // Định nghĩa header với các key chính xác
    const header = [
      'Request ID',
      'Payment Method ID',
      'User ID',
      'Account Holder Name',
      'Bank Account Number',
      'Email',
      'Amount',
      'Bank Name',
      'Status',
      'Request Created At'
    ];

    // Chuyển đổi dữ liệu
    const data = this.transactions.map((item) => ({
      'Request ID': item.request_id || '',
      'Payment Method ID': item.payment_method_id || '',
      'User ID': item.userId || '',
      'Account Holder Name': item.account_holder_name || '',
      'Bank Account Number': item.bank_account_number || '',
      'Email': item.email || '',
      'Amount': item.amount || 0,
      'Bank Name': item.bank_name || '',
      'Status': item.status || '',
      'Request Created At': item.request_created_at
      ? new Date(item.request_created_at).toLocaleString('vi-VN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        })
      : ''
    }));

    // Tạo worksheet với header và data
    const worksheet = XLSX.utils.json_to_sheet(data, { header });

    // Tạo workbook và thêm worksheet
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Transactions');

    // Xuất file Excel
    XLSX.writeFile(workbook, 'transactions.xlsx');
}
}
