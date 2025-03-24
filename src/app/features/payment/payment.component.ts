import { Component } from '@angular/core';
import { VnpayService } from '@app/services/vnpay/vnpay.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.css',
})
export class PaymentComponent {
  orderData = {
    amount: 10000,
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

  constructor(private vnpayService: VnpayService) {}

  ngOnInit(): void {}

  createPayment() {
    // Cấu hình các tham số thanh toán
    const paymentData = {
      amount: this.orderData.amount,
      bankCode: 'NCB', // Tạm thời chọn ngân hàng NCB để test
      language: this.orderData.language,
      orderType: this.orderData.orderType,
      orderDescription: this.orderData.orderDescription,
      orderRef: this.orderData.orderId,
    };

    // Gọi service để tạo URL thanh toán
    this.vnpayService.createPayment(paymentData).subscribe({
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
