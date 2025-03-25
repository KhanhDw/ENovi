import { Component } from '@angular/core';
import { VnpayService } from '@app/services/vnpay/vnpay.service';
import { FormsModule } from '@angular/forms';
import { UserServiceService } from '@app/services/user/user-service.service';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.css',
})
export class PaymentComponent {
  orderData = {
    amount: 100000,
    orderDescription: 'Thanh toán đơn hàng khóa học trực tuyến',
    orderType: 'billpayment',
    language: 'vn',
    orderId: new Date()
      .toLocaleString('vi-VN', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      })
      .replace(/[\/\s,:]/g, ''),
  };

  listCourseBuy: string[] = ['111', '112', '113'];

  constructor(private vnpayService: VnpayService, private userServiceService: UserServiceService) {}

  ngOnInit(): void {}


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

  btnCreatePayment() {

    const userId = this.getInstructorId();
    if (userId === -1) {
      console.warn('Người dùng chưa đăng nhập');
      return;
    }

    this.createPayment(
      this.orderData.amount,
      this.orderData.language,
      this.orderData.orderType,
      this.orderData.orderDescription,
      this.orderData.orderId,
      this.listCourseBuy,
      userId
    );
  }

  createPayment(
    amount: any,
    language: any,
    orderType: any,
    orderDescription: any,
    orderId: any,
    listCourseBuy: string[],
    userId:number
  ) {
    // Cấu hình các tham số thanh toán
    const paymentData = {
      amount: amount,
      bankCode: 'NCB', // Tạm thời chọn ngân hàng NCB để test
      language: language,
      orderType: orderType,
      orderDescription: orderDescription,
      orderRef: orderId,
    };

    // Gọi service để tạo URL thanh toán
    this.vnpayService.createPayment(paymentData, listCourseBuy, userId).subscribe({
      next: (response) => {
        if (response.urlvnpay) {
          // Chuyển hướng sang trang thanh toán VNPay
          window.location.href = response.urlvnpay;
        } else {
          console.error('Lỗi tạo URL thanh toán: Không nhận được URL');
        }
      },
      error: (error) => {
        console.error('Lỗi kết nối:', error);
      },
    });
  }
}
