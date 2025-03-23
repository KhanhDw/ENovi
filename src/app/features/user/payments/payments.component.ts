import { Component } from '@angular/core';

@Component({
    selector: 'app-payments',
    templateUrl: './payments.component.html',
    styleUrl: './payments.component.css',
    standalone: false
})
export class PaymentsComponent {
  urls = [
    // { title: 'Nhận tiền', url: '/user/payments/recive', activeURL: true },
    // { title: 'Chuyển tiền', url: '/user/payments/transfer', activeURL: false },
  ];

  activeButtonIndex: number = 0;

  setActiveButton(index: number): void {
    this.activeButtonIndex = index;
  }
}
