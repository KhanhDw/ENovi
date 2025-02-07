import { Component } from '@angular/core';

interface PurchaseItem {
  id: number;
  date: string;
  product: string;
  amount: number;
  status: 'Completed' | 'Pending' | 'Cancelled';
}

@Component({
    selector: 'app-purchase-history',
    templateUrl: './purchase-history.component.html',
    styleUrl: './purchase-history.component.css',
    standalone: false
})
export class PurchaseHistoryComponent {
  purchases: PurchaseItem[] = [
    {
      id: 1,
      date: '2023-05-01',
      product: 'Lập trình C++ từ cơ bản đến nâng cao bootcamp (Vietnamese)',
      amount: 999.99,
      status: 'Completed',
    },
    {
      id: 2,
      date: '2023-05-15',
      product: 'Smartphone',
      amount: 599.99,
      status: 'Completed',
    },
    {
      id: 3,
      date: '2023-06-02',
      product: 'Headphones',
      amount: 149.99,
      status: 'Pending',
    },
    {
      id: 4,
      date: '2023-06-10',
      product: 'Smartwatch',
      amount: 249.99,
      status: 'Cancelled',
    },
    {
      id: 5,
      date: '2023-06-20',
      product: 'Tablet',
      amount: 399.99,
      status: 'Completed',
    },
    {
      id: 5,
      date: '2023-06-20',
      product: 'Tablet',
      amount: 399.99,
      status: 'Completed',
    },
    {
      id: 5,
      date: '2023-06-20',
      product: 'Tablet',
      amount: 399.99,
      status: 'Completed',
    },
    {
      id: 5,
      date: '2023-06-20',
      product: 'Tablet',
      amount: 399.99,
      status: 'Completed',
    },
    {
      id: 5,
      date: '2023-06-20',
      product: 'Tablet',
      amount: 399.99,
      status: 'Completed',
    },
    {
      id: 5,
      date: '2023-06-20',
      product: 'Tablet',
      amount: 399.99,
      status: 'Completed',
    },
    {
      id: 5,
      date: '2023-06-20',
      product: 'Tablet',
      amount: 399.99,
      status: 'Completed',
    },
    {
      id: 5,
      date: '2023-06-20',
      product: 'Tablet',
      amount: 399.99,
      status: 'Completed',
    },
    {
      id: 5,
      date: '2023-06-20',
      product: 'Tablet',
      amount: 399.99,
      status: 'Completed',
    },
    {
      id: 5,
      date: '2023-06-20',
      product: 'Tablet',
      amount: 399.99,
      status: 'Completed',
    },
  ];

  getStatusColor(status: string): string {
    switch (status) {
      case 'Completed':
        return 'text-green-600';
      case 'Pending':
        return 'text-yellow-600';
      case 'Cancelled':
        return 'text-red-600';
      default:
        return '';
    }
  }
}
