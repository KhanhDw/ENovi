export interface PaymentsHistory {
  id: number;
  userId: number;
  courseId: number;
  courseTitle: string;
  amount: number;
  paymentMethod: string;
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  paymentDate: Date;
}
