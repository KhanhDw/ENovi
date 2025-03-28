import { Component, OnInit } from '@angular/core';
import { ApiService } from '@app/services/api.service';

@Component({
  selector: 'app-receive',
  templateUrl: './receive.component.html',
  styleUrl: './receive.component.css',
  standalone: false,
})
export class ReceiveComponent implements OnInit {
  bank = [
    {
      url: 'img/paymentsLogo/bank.png',
      name: 'Ngân hàng Việt Nam',
      recommend: 'Khuyên dùng',
      active: true,
    },
    {
      url: 'img/paymentsLogo/momo.png',
      name: 'Ví điện tử MoMo',
      recommend: '',
      active: false,
    },
    {
      url: 'img/paymentsLogo/paypal.png',
      name: 'Ví Paypal',
      recommend: '',
      active: false,
    },
    {
      url: 'img/paymentsLogo/nganluong.png',
      name: 'Ví Ngân Lượng',
      recommend: '',
      active: false,
    },
  ];

  updateInfo = false;
  bankdata: {
    id: number;
    nameBank: string;
    logo: string;
  }[] = [];

  checkUserHasInfor = false;

  selectedBankId: number = 0;
  recipientName: string = '';
  accountNumber: string = '';
  phoneNumber: string = '';
  email: string = '';

  verificationCode: string = '';

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.getBank();
    this.getPaymentMethodByUserId();
  }

  toggleUpdateInfo() {
    this.updateInfo = !this.updateInfo;
  }

  getBank() {
    this.apiService.bankService.getAllBanks().subscribe({
      next: (banks) => {
        console.log('Banks retrieved successfully:', banks);
        this.bankdata = banks;
      },
      error: (err) => {
        console.error('Error retrieving banks:',);
      },
    });
  }

  getInstructorId(): number {
    const userInfo = this.apiService.userServiceService.getUserLogin();
    if (!userInfo || userInfo.id === -1) {
      return 0; // Trả về 0 nếu chưa đăng nhập
    }
    return userInfo.id;
  }

  paymentmethod() {
    const userId = this.getInstructorId();

    const data = {
      user_id: userId,
      bank_id: this.selectedBankId,
      account_holder_name: this.recipientName,
      bank_account_number: this.accountNumber,
      phone_number: this.phoneNumber,
      email: this.email,
    };
    console.log(data);

    this.checkUserExists(userId, data);
  }

  checkUserExists(userId: number, data: any): void {
    this.apiService.paymentMethodService.checkUserExists(userId).subscribe({
      next: (response) => {
        if (response.success) {
          console.log(`User with ID ${userId} exists: ${response.message}`);
          this.checkUserHasInfor = true;

          this.apiService.paymentMethodService
            .updatePaymentMethod(userId, data)
            .subscribe({
              next: (response) => {
                console.log('Payment method updated successfully:', response);
                alert('Cập nhật thành công!');
                this.toggleUpdateInfo();
              },
              error: (err) => {
                alert('Cập nhật thất bại! Vui lòng thử lại.');
                console.error('Error updating payment method:', err);
              },
            });
        } else {
          console.log(
            `User with ID ${userId} does not exist: ${response.message}`
          );
          this.checkUserHasInfor = false;
          this.apiService.paymentMethodService
            .addPaymentMethod(data)
            .subscribe({
              next: (response) => {
                console.log('Payment method added successfully:', response);
              },
              error: (err) => {
                console.error('Error adding payment method:', err);
              },
            });
        }
      },
      error: (err) => {
        console.error(
          `Error checking if user with ID ${userId} exists:`,
          err.message
        );
      },
    });
  }

  getPaymentMethodByUserId(): void {
    const userId = this.getInstructorId();
    this.apiService.paymentMethodService
      .getPaymentMethodByUserId(userId)
      .subscribe({
        next: (response) => {
          if (response && response.success) {
            console.log(
              `Payment method for user ID ${userId} retrieved successfully:`,
              response.paymentMethod
            );
            const paymentMethod = response.paymentMethod;
            this.selectedBankId = paymentMethod.bank_id || 0;
            this.recipientName = paymentMethod.account_holder_name || '';
            this.accountNumber = paymentMethod.bank_account_number || '';
            this.phoneNumber = paymentMethod.phone_number || '';
            this.email = paymentMethod.email || '';
          } else {
            console.warn(`Payment method for user ID ${userId} not found.`);
          }
        },
        error: (err) => {
          console.error(
            `Error retrieving payment method for user ID ${userId}:`,
          );
          // err.message
        },
      });
  }
}
