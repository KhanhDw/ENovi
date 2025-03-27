import { Component, OnInit } from '@angular/core';
import { PaymentsHistory } from '@app/interface/paymentshistory';
import { ApiService } from '@app/services/api.service';
import { UserServiceService } from '@app/services/user/user-service.service';
@Component({
  selector: 'app-purchase-history',
  templateUrl: './purchase-history.component.html',
  styleUrl: './purchase-history.component.css',
  standalone: false,
})
export class PurchaseHistoryComponent implements OnInit {
  paymentshistory: PaymentsHistory[] = [];

  constructor(
    private apiService: ApiService,
    private userServiceService: UserServiceService
  ) {
    // Initialization logic can go here
  }

  ngOnInit(): void {
    this.fetchDataPaymentHistory();
  }

  // ====================
  // get user id
  // ====================

  getInstructorId(): number {
    const userInfo = this.userServiceService.getUserLogin();
    if (!userInfo || userInfo.id === -1) {
      return 0; // Trả về 0 nếu chưa đăng nhập
    }
    return userInfo.id;
  }

  fetchDataPaymentHistory() {
    const userId = this.getInstructorId();

    this.apiService.paymentHistoryService
      .getPaymentHistoryByUserId(userId.toString())
      .subscribe({
        next: (response) => {
          if (response.success) {
            this.paymentshistory = response.data;
          } else {
            console.error('Failed to fetch payment history:', response.message);
          }
        },
        error: (err) => {
          console.error('Error fetching payment history:', err);
        },
        complete: () => {
          console.log('Payment history fetch completed.');
        },
      });
  }

  getStatusColor(status: string) {
    switch (status) {
      case 'completed':
        return 'text-green-600';
      case 'pending':
        return 'text-yellow-600';
      case 'failed':
        return 'text-red-600';
      case 'refunded':
        return 'text-blue-600';
      default:
        return '';
    }
  }
}
