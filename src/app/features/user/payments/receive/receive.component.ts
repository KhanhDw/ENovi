import { Component } from '@angular/core';

@Component({
  selector: 'app-receive',
  templateUrl: './receive.component.html',
  styleUrl: './receive.component.css',
})
export class ReceiveComponent {
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

  toggleUpdateInfo() {
    this.updateInfo = !this.updateInfo;
  }
}
