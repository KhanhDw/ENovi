import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-payment-status',
  standalone: false,
  templateUrl: './payment-status.component.html',
  styleUrl: './payment-status.component.css'
})
export class PaymentStatusComponent implements OnInit {
  status: string | null = null;
  orderId: string | null = null;
  checkStatus: boolean | null = null;
  reason: string | null = null;
  messageErrorPayment: string | null = null;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    // Extract route parameter
    this.status = this.route.snapshot.paramMap.get('status');
    // Extract query parameters
    this.route.queryParams.subscribe(params => {
      this.orderId = params['orderId'];
      this.reason = params['reason']; // Extract reason if available
    });

    // Add a checkStatus variable to determine the display logic
    this.checkStatus = this.status === 'success';
    console.log('Check Status:', this.checkStatus); // You can use this variable in your template or logic
    console.log('Reason:', this.reason); // Log the reason for failure if applicable

    // Map error codes to their corresponding messages
    const errorMessages: { [key: string]: string } = {
      '00': 'Giao dịch thành công',
      '07': 'Trừ tiền thành công. Giao dịch bị nghi ngờ (liên quan tới lừa đảo, giao dịch bất thường).',
      '09': 'Thẻ/Tài khoản của khách hàng chưa đăng ký dịch vụ InternetBanking tại ngân hàng.',
      '10': 'Khách hàng xác thực thông tin thẻ/tài khoản không đúng quá 3 lần',
      '11': 'Đã hết hạn chờ thanh toán. Xin quý khách vui lòng thực hiện lại giao dịch.',
      '12': 'Thẻ/Tài khoản của khách hàng bị khóa.',
      '13': 'Quý khách nhập sai mật khẩu xác thực giao dịch (OTP). Xin quý khách vui lòng thực hiện lại giao dịch.',
      '24': 'Khách hàng hủy giao dịch',
      '51': 'Tài khoản của quý khách không đủ số dư để thực hiện giao dịch.',
      '65': 'Tài khoản của Quý khách đã vượt quá hạn mức giao dịch trong ngày.',
      '75': 'Ngân hàng thanh toán đang bảo trì.',
      '79': 'KH nhập sai mật khẩu thanh toán quá số lần quy định. Xin quý khách vui lòng thực hiện lại giao dịch',
      '99': 'Đã xảy ra lỗi từ hệ thống của chúng tôi. Quý khách vui lòng thực hiện lại giao dịch sau ít phút.',
    };

    // If the status is not success, map the reason code to its message
    if (!this.checkStatus && this.reason) {
      this.messageErrorPayment = errorMessages[this.reason] || 'Lỗi không xác định';
    }
  }


  navigateToPaymentConfirmation(): void {
    // Logic to navigate back to the payment confirmation page
    window.location.href = '/payment';
  }
  navigateToMyLearning(): void {
    // Logic to navigate back to the payment confirmation page
    window.location.href = '/my-learning';
  }
}
