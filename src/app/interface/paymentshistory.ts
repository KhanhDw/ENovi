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


export interface StudentEnrollment {
  id: number;
  userId: number;
  courseId: number;
  amount: number;
  paymentMethod: string;
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  paymentDate: string;
  courseTitle: string;
  account_holder_name: string;
  bank_account_number: string;
  email: string;
}


export interface PaymentRequest {
  request_id: number;
  payment_method_id: number;
  userId: number;
  account_holder_name: string;
  bank_account_number: string;
  email: string;
  amount: number;
  bank_name: string;
  status: 'pending'|'approved'|'rejected'|'completed'
  request_created_at: Date;
}