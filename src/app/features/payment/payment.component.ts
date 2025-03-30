import { PaginationComponent } from './../../components/pagination/pagination.component';
import { Component } from '@angular/core';
import { VnpayService } from '@app/services/vnpay/vnpay.service';
import { FormsModule } from '@angular/forms';
import { UserServiceService } from '@app/services/user/user-service.service';
import { CourseSearch } from '@app/interface/course';
import { ApiService } from '@app/services/api.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [FormsModule, CommonModule],
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

  urlBackend_img_banner_course: string = '';
  listCourse: CourseSearch[] = [];
  priceTotal: number = 0;
  pricePromotion: number = 0;
  priceToPay: number = 0;

  listCourseBuy: number[] = [];

  constructor(
    private vnpayService: VnpayService,
    private userServiceService: UserServiceService,
    private apiService: ApiService
  ) {
    this.urlBackend_img_banner_course =
      this.apiService.API_URL + '/uploads/img/bannerCourses/';
  }

  ngOnInit(): void {
    this.getCoursePayLocalstorage();
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

  btnCreatePayment() {
    const userId = this.getInstructorId();
    if (userId === -1) {
      console.warn('Người dùng chưa đăng nhập');
      alert('Bạn cần đăng nhập để thực hiện mua khóa học này!');
      return;
    }
    this.getCoursePayLocalstorage();

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
    listCourseBuy: number[],
    userId: number
  ) {
    // Cấu hình các tham số thanh toán
    const paymentData = {
      amount: amount,//ok
      bankCode: 'NCB', // Tạm thờ i chọn ngân hàng NCB để test
      language: language,//ok
      orderType: orderType, //ok
      orderDescription: orderDescription,//ok
      orderRef: orderId,//ok
    };

    console.log('paymentDataHHHHHHH->:', paymentData);

    // Gọi service để tạo URL thanh toán
    this.vnpayService
      .createPayment(paymentData, listCourseBuy, userId)
      .subscribe({
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

  getCoursePayLocalstorage() {
    let paymentDataString = localStorage.getItem('paymentData');

    if (!paymentDataString) {
      console.log('No payment data found in localStorage.');
      return;
    }

    const paymentData = JSON.parse(paymentDataString);
    console.log('Raw payment data from localStorage:', paymentDataString);


    if (paymentData.amount) {
      this.orderData.amount = paymentData.amount || this.orderData.amount;
      this.orderData.language = paymentData.language || this.orderData.language;
      this.orderData.orderType =
        paymentData.orderType || this.orderData.orderType;
      this.orderData.orderDescription =
        paymentData.orderDescription || this.orderData.orderDescription;
      this.orderData.orderId = paymentData.orderId || this.orderData.orderId;
      this.listCourseBuy  = paymentData.listCourseBuy;
      this.fetchCoursePay();
      console.log('List of course IDs to buy111:', this.listCourseBuy);
      console.log("paymentData:00--<<<<>>>", paymentData);
      console.log('hahahahahahahhhh111');
    } else {
      console.log('hahahahahahahhhh2222');
      // Validate and use the fetched data
      if (paymentData.courses && Array.isArray(paymentData.courses)) {
        this.listCourseBuy = paymentData.courses.map(
          (course: any) => course.id
        );
        console.log("paymentData:00--<<<<>>>", paymentData);
        this.fetchCoursePay();
        console.log('List of course IDs to buy:', this.listCourseBuy);
      } else {
        console.warn('Invalid courses data in paymentData.');
        return;
      }
    }
  }

  fetchCoursePay() {
    this.apiService.courseInstructorService
      .getCoursePaymentById(this.listCourseBuy)
      .subscribe({
        next: (response: any) => {
          if (response.success && response.course) {
            this.listCourse = response.course;
            console.log('this.listCourse:', this.listCourse);
            this.calculateTotalPrice();
            this.calculatePromotionPrice();
            this.calculatePriceToPay();
          } else {
            console.warn('Failed to fetch course data:', response.message);
          }
        },
        error: (error) => {
          console.error('Error fetching course data:', error);
        },
      });
  }

  calculateTotalPrice() {
    this.priceTotal = this.listCourse.reduce((total, course) => {
      return total + course.price;
    }, 0);
  }

  calculatePromotionPrice() {
    this.pricePromotion = this.listCourse.reduce((total, course) => {
      const discount = (course.price * course.percent_discount) / 100;
      return total + discount;
    }, 0);
    console.log(
      'Total discount amount based on percent_discount:',
      this.pricePromotion
    );
  }

  calculatePriceToPay() {
    this.priceToPay = this.priceTotal - this.pricePromotion;
    console.log('Price to pay:', this.priceToPay);
    this.orderData.amount = Math.floor(this.priceToPay);
  }
}
