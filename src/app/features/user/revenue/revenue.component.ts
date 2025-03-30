import { StudentEnrollment } from './../../../interface/paymentshistory';
import { PaymentRequest } from './../../../interface/paymentshistory';
import { AdminPayComponent } from './../../admin/admin-pay/admin-pay.component';

import {
  Component,
  ElementRef,
  ViewChild,
  HostListener,
  AfterViewInit,
  type OnInit,
  ChangeDetectorRef,
} from '@angular/core';
import { ApiService } from '@app/services/api.service';
import { CookieStorageService } from '@app/services/cookie_storage/cookie-storage.service';

import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexStroke,
  ApexYAxis,
  ApexTitleSubtitle,
  ApexLegend,
  ApexPlotOptions,
  ApexFill,
  ChartType,
} from 'ng-apexcharts';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  stroke: ApexStroke;
  dataLabels: ApexDataLabels;
  yaxis: ApexYAxis;
  title: ApexTitleSubtitle;
  labels: string[];
  legend: ApexLegend;
  subtitle: ApexTitleSubtitle;
  plotOptions: ApexPlotOptions;
  fill: ApexFill;
};

import { CourseInstructor } from './../../../interface/course';

@Component({
  selector: 'app-revenue',
  templateUrl: './revenue.component.html',
  styleUrl: './revenue.component.css',
  standalone: false,
})
export class RevenueComponent implements AfterViewInit, OnInit {
  selectedBankId: number = 0;
  recipientName: string = '';
  accountNumber: string = '';
  phoneNumber: string = '';
  email: string = '';

  bankdata: {
    id: number;
    nameBank: string;
    logo: string;
  }[] = [];

  checkClickedWithdraw: boolean = false;
  selectedCourseId: number = -1;
  students: StudentEnrollment[] = [];
  courses: CourseInstructor[] = [];
  clickedRequestWithdraw: boolean = false;
  sortBy: string = 'newest';
  TongDoanhThu: number = 0;
  TongDoanhThuThangHienTai: number = 0;
  TongHocVien: number = 0;
  TongHocVienThangHienTai: number = 0;

  TongDoanhThuDaGiaoDich: number = 0;
  // =========================
  // biến dữ liệu ^^^^^^^^^^^^
  // =========================

  isShowModalWithdraw = false;
  isShowModalWithdrawHistory = false;
  isShowModalEnrollmentBuyCourse = false;
  isShowModalQA = false;

  toggleShowModalWithdraw() {
    this.isShowModalWithdraw = !this.isShowModalWithdraw;
  }
  toggleShowModalWithdrawHistory() {
    this.isShowModalWithdrawHistory = !this.isShowModalWithdrawHistory;
  }
  toggleisShowModalEnrollmentBuyCourse() {
    this.isShowModalEnrollmentBuyCourse = !this.isShowModalEnrollmentBuyCourse;
  }
  toggleShowModalQA() {
    this.isShowModalQA = !this.isShowModalQA;
  }

  @ViewChild('ModalWithdraw') modalWithdrawElementRef!: ElementRef;
  @ViewChild('ModalWithdrawHistory')
  ModalWithdrawHistoryElementRef!: ElementRef;
  @ViewChild('ModalQA') modalQAElementRef!: ElementRef;

  ngAfterViewInit(): void {}

  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent): void {
    this.modalWithdraw(event);
    this.modalWithdrawHistory(event);
    this.modalQA(event);
  }

  // withdraw

  private modalWithdraw(event: MouseEvent) {
    if (!this.modalWithdrawElementRef) {
      return; // Không làm gì nếu modal chưa sẵn sàng
    }

    const target = event.target as HTMLElement;
    if (this.modalWithdrawElementRef.nativeElement !== undefined) {
      const clickedInside_id1 =
        this.modalWithdrawElementRef.nativeElement.contains(target);
      if (!clickedInside_id1 && this.isShowModalWithdraw) {
        this.isShowModalWithdraw = false;
      }
    }
  }

  // withdraw history

  transactions: PaymentRequest[] = [];

  ngOnInit(): void {
    // this.deleteRequestWithdrawCookie();
    this.getBank();
    this.getPaymentMethodByUserId();
    this.checkRequestWithdraw();
    this.listEnrollmentBuyCourse();
    this.getFetchRequestWithdrawTable();
    this.fetchCourses('', this.sortBy);

    // if (this.selectedCourseId === -1) {
    //   this.revenueChart();
    // }
  }

  getStatusClass(status: string): string {
    switch (status.toLowerCase()) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      case 'refunded':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  }

  private modalWithdrawHistory(event: MouseEvent) {
    if (!this.ModalWithdrawHistoryElementRef) {
      return; // Không làm gì nếu modal chưa sẵn sàng
    }

    const target = event.target as HTMLElement;
    if (this.ModalWithdrawHistoryElementRef.nativeElement !== undefined) {
      const clickedInside_id1 =
        this.ModalWithdrawHistoryElementRef.nativeElement.contains(target);
      if (!clickedInside_id1 && this.isShowModalWithdrawHistory) {
        this.isShowModalWithdrawHistory = false;
      }
    }
  }

  // QA

  private modalQA(event: MouseEvent) {
    if (!this.modalQAElementRef) {
      return; // Không làm gì nếu modal chưa sẵn sàng
    }

    const target = event.target as HTMLElement;
    if (this.modalQAElementRef.nativeElement !== undefined) {
      const clickedInside_id1 =
        this.modalQAElementRef.nativeElement.contains(target);
      if (!clickedInside_id1 && this.isShowModalQA) {
        this.isShowModalQA = false;
      }
    }
  }

  // =============
  // chart
  // =============

  public chartOptions: Partial<ChartOptions> = {};
  // dữ liệU biểu đồ để trên contructor

  nameChart = 'Tổng doanh thu';
  dataChart = [10, 41, 35, 51, 405, 62, 69, 91, 148, 168, 248, 348];
  typeChartInput: ChartType = 'area';
  typeChartList = [
    // { name: 'line', title: 'Biểu đồ đường' },
    { name: 'area', title: 'Biểu đồ vùng' },
    { name: 'bar', title: 'Biểu đồ cột' },
  ];

  constructor(
    private elementRef: ElementRef,
    private apiService: ApiService,
    private cookieStorageService: CookieStorageService,
    private cdr: ChangeDetectorRef
  ) {
    this.updateChartOptions(); // Cập nhật lại `chartOptions`
  }

  onChangeTypeChart(event: Event) {
    const target = event.target as HTMLSelectElement;
    if (target && target.value) {
      const selectedValue = target.value;
      this.typeChartInput = selectedValue as ChartType;
      this.updateChartOptions(); // Cập nhật lại `chartOptions`
    } else {
      console.error('Không thể lấy giá trị từ select');
    }
  }

  getInstructorId(): number {
    const userInfo = this.apiService.userServiceService.getUserLogin();
    if (!userInfo || userInfo.id === -1) {
      return 0; // Trả về 0 nếu chưa đăng nhập
    }
    return userInfo.id;
  }

  getBank() {
    this.apiService.bankService.getAllBanks().subscribe({
      next: (banks) => {
        console.log('Banks retrieved successfully:', banks);
        this.bankdata = banks;
      },
      error: (err) => {
        console.error('Error retrieving banks:');
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
            `Error retrieving payment method for user ID ${userId}:`
          );
          // err.message
        },
      });
  }

  requestWithdraw() {
    if (this.checkRequestWithdraw()) {
      alert('Bạn đã gửi yêu cầu rút tiền trước đó. Vui lòng chờ xử lý.');
      this.checkClickedWithdraw = true;
      return; // Nếu đã có yêu cầu rút tiền, không thực hiện gì cả
    }

    alert('Yêu cầu rút tiền của bạn đã được gửi thành công.');
    const userId = this.getInstructorId(); // Lấy userId từ cookie hoặc dịch vụ người dùng
    if (!userId) {
      console.error('Không tìm thấy userId');
      return;
    } // Kiểm tra xem đã có yêu cầu rút tiền chưa

    if (this.checkRequestWithdraw()) {
      this.checkClickedWithdraw = true;
      return; // Nếu đã có yêu cầu rút tiền, không thực hiện gì cả
    }

    this.apiService.paymentHistoryService
      .createPaymentRequest(userId, 1000000)
      .subscribe({
        next: (response) => {
          if (response && response.success) {
            console.log('Yêu cầu rút tiền đã được gửi thành công:', response);
            this.checkClickedWithdraw = true;
            // Xử lý phản hồi thành công ở đây
          } else {
            console.error('Lỗi khi gửi yêu cầu rút tiền:', response.message);
          }
        },
        error: (error) => {
          console.error('Lỗi khi gửi yêu cầu rút tiền:', error);
        },
      });

    // Đặt cookie requestWithdraw và lưu trong 5 ngày
    this.cookieStorageService.setCookie('requestWithdraw', 'true', 5);

    console.log('Yêu cầu rút tiền đã được ghi nhận.');
  }

  checkRequestWithdraw(): boolean {
    const requestWithdraw =
      this.cookieStorageService.getCookie('requestWithdraw');
    return requestWithdraw === 'true';
  }
  deleteRequestWithdrawCookie(): void {
    this.cookieStorageService.removeCookie('requestWithdraw');
  }

  listEnrollmentBuyCourse() {
    const userId = this.getInstructorId(); // Lấy userId từ cookie hoặc dịch vụ người dùng
    if (!userId) {
      console.error('Không tìm thấy userId');
      return;
    }
    this.apiService.paymentHistoryService
      .getRegisteredStudents(userId)
      .subscribe({
        next: (response) => {
          if (response && response.success) {
            this.students = response.data;
            console.log('Danh sách học viên:', response.data);

            /* cập nhật dữ liệu cho chart */
            this.revenueChartUpdate();
            /*  tính tổng doanh thu */
            this.revenueSum();
            /* tính tổng doanh thu tháng hiện tại */
            this.revenueSumPerMonth();
            /* Tổng học viên  */
            this.enrollmentSum();
            /* Tổng học viên tháng hiện tại */
            this.enrollmentSumPerMonth();

            /* cập nhật lại giao diện */
            this.cdr.detectChanges();
          }
        },
        error: (error) => {
          console.error('Lỗi khi lấy danh sách học viên:', error);
        },
      });
  }

  revenueChartUpdate() {
    this.dataChart = Array.from({ length: 12 }, (_, month) => {
      return this.students.reduce((total, student) => {
        const paymentDate = new Date(student.paymentDate);
        if (paymentDate.getMonth() === month) {
          return total + parseInt(String(student.amount || '0'), 10);
        }
        return total;
      }, 0);
    });
    this.updateChartOptions1(); // Cập nhật lại chartOptions với dữ liệu mới
  }
  revenueSum() {
    if (Number(this.selectedCourseId) === -1) {
      this.TongDoanhThu = this.students.reduce(
        (total, student) => total + parseInt(String(student.amount || '0'), 10),
        0
      );
    } else {
      this.TongDoanhThu = this.students.reduce((total, student) => {
        if (Number(student.courseId) === Number(this.selectedCourseId)) {
          return total + parseInt(String(student.amount || '0'), 10);
        }
        return total;
      }, 0);
    }
  }

  revenueSumPerMonth() {
    const currentMonth = new Date().getMonth() + 1; // Lấy tháng hiện tại (0-based nên cần +1)
    const currentYear = new Date().getFullYear(); // Lấy năm hiện tại
    if (Number(this.selectedCourseId) === -1) {
      this.TongDoanhThuThangHienTai = this.students.reduce((total, student) => {
        const paymentDate = new Date(student.paymentDate);
        if (
          paymentDate.getMonth() + 1 === currentMonth &&
          paymentDate.getFullYear() === currentYear
        ) {
          return total + parseInt(String(student.amount || '0'), 10);
        }
        return total;
      }, 0);
    } else {
      this.TongDoanhThuThangHienTai = this.students.reduce((total, student) => {
        const paymentDate = new Date(student.paymentDate);
        if (
          paymentDate.getMonth() + 1 === currentMonth &&
          paymentDate.getFullYear() === currentYear &&
          Number(student.courseId) === Number(this.selectedCourseId)
        ) {
          return total + parseInt(String(student.amount || '0'), 10);
        }
        return total;
      }, 0);
    }
  }

  enrollmentSum() {
    if (Number(this.selectedCourseId) === -1) {
      this.TongHocVien = this.students.length;
    } else {
      this.TongHocVien = this.students.filter(
        (student) => Number(student.courseId) === Number(this.selectedCourseId)
      ).length;
    }
  }

  enrollmentSumPerMonth() {
    const currentMonth = new Date().getMonth() + 1;
    const currentYear = new Date().getFullYear();
    if (Number(this.selectedCourseId) === -1) {
      this.TongHocVienThangHienTai = this.students.filter((student) => {
        const paymentDate = new Date(student.paymentDate);
        return (
          paymentDate.getMonth() + 1 === currentMonth &&
          paymentDate.getFullYear() === currentYear
        );
      }).length;
    } else {
      this.TongHocVienThangHienTai = this.students.filter((student) => {
        const paymentDate = new Date(student.paymentDate);
        return (
          paymentDate.getMonth() + 1 === currentMonth &&
          paymentDate.getFullYear() === currentYear &&
          Number(student.courseId) === Number(this.selectedCourseId)
        );
      }).length;
    }
  }

  // Hàm cập nhật lại chartOptions
  updateChartOptions() {
    this.chartOptions = {
      series: [
        {
          name: 'Doanh thu',
          data: this.dataChart,
        },
      ],
      chart: {
        height: '100%',
        type: this.typeChartInput, // Cập nhật loại biểu đồ
        zoom: {
          enabled: true,
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: 'straight',
      },
      title: {
        text: this.nameChart,
        style: {
          fontSize: '20px',
          fontWeight: 'bold',
          fontFamily: 'Verdana, sans-serif',
          color: '#333',
        },
      },
      xaxis: {
        categories: [
          'Tháng 1',
          'Tháng 2',
          'Tháng 3',
          'Tháng 4',
          'Tháng 5',
          'Tháng 6',
          'Tháng 7',
          'Tháng 8',
          'Tháng 9',
          'Tháng 10',
          'Tháng 11',
          'Tháng 12',
        ],
      },
      yaxis: {
        opposite: true,
      },
      legend: {
        horizontalAlign: 'left',
      },
    };
  }

  updateChartOptions1() {
    this.chartOptions = Object.assign({}, this.chartOptions, {
      series: [
        {
          name: 'Doanh thu',
          data: this.dataChart, // Cập nhật dữ liệu mới
        },
      ],
      title: Object.assign({}, this.chartOptions.title, {
        text: this.nameChart, // Cập nhật tiêu đề mới
      }),
    });
    this.cdr.detectChanges();
  }

  getFetchRequestWithdrawTable() {
    const userId = this.getInstructorId(); // Lấy userId từ cookie hoặc dịch vụ người dùng

    this.apiService.paymentHistoryService
      .getWithdrawalHistoryByInstructor(userId)
      .subscribe({
        next: (response) => {
          if (response && response.success) {
            console.log('Lịch sử rút tiền:', response.data);
            this.transactions = response.data;
          } else {
            console.error('Lỗi khi lấy lịch sử rút tiền:', response.message);
          }
        },
        error: (error) => {
          console.error('Lỗi khi lấy lịch sử rút tiền:', error);
        },
      });
  }

  private fetchCourses(searchText: string, sortBy: string): void {
    let id = this.getInstructorId().toString();
    this.apiService.courseInstructorService
      .getSearchCourseInstructor(searchText, id, sortBy)
      .subscribe({
        next: (res) => {
          if (res.success) {
            this.courses = res.course;
          }
        },
        error: (err) => {
          console.warn('Lỗi lấy dữ liệu khóa học:');
        },
      });
  }

  setNameChart() {
    if (Number(this.selectedCourseId) === -1) {
      this.nameChart = 'Tất cả khóa học';
      this.revenueChartUpdate();
      this.updateChartOptions1();
      return;
    }
    if (!this.courses || this.courses.length === 0) {
      console.error('Courses list is empty or not initialized.');
      this.nameChart = 'Tổng doanh thu Unknown Course';
      return;
    }

    console.log(this.courses);
    const selectedCourse = this.courses.find(
      (course) => Number(course.id) === Number(this.selectedCourseId)
    );

    if (!selectedCourse) {
      console.warn(`Course with ID ${this.selectedCourseId} not found.`);
      this.nameChart = 'Tổng doanh thu Unknown Course';
      return;
    }
    const chuoibandau = 'Tổng doanh thu';
    this.nameChart = `${chuoibandau}: ${selectedCourse.title}`;

    console.log(this.nameChart);
    console.log(this.selectedCourseId);

    this.revenueChartUpdate1();
     /*  tính tổng doanh thu */
     this.revenueSum();
     /* tính tổng doanh thu tháng hiện tại */
     this.revenueSumPerMonth();
     /* Tổng học viên  */
     this.enrollmentSum();
     /* Tổng học viên tháng hiện tại */
     this.enrollmentSumPerMonth();
     
    this.updateChartOptions1(); // Cập nhật lại chartOptions với tên mới
  }

  revenueChartUpdate1() {
    
      // Nếu chọn một khóa học cụ thể, tính tổng doanh thu của khóa học đó
      this.dataChart = Array.from({ length: 12 }, (_, month) => {
        return this.students.reduce((total, student) => {
          const paymentDate = new Date(student.paymentDate);
          if (
            paymentDate.getMonth() === month &&
            Number(student.courseId) === Number(this.selectedCourseId)
          ) {
            return total + parseInt(String(student.amount || '0'), 10);
          }
          return total;
        }, 0);
      });

      this.updateChartOptions1(); // Cập nhật lại chartOptions với dữ liệu mới
    }
  
}
