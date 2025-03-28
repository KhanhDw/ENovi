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
    this.fetchCourses( '', this.sortBy);
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
    private cookieStorageService: CookieStorageService
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
            // Xử lý dữ liệu học viên ở đây
          }
        },
        error: (error) => {
          console.error('Lỗi khi lấy danh sách học viên:', error);
        },
      });
  }

  // Hàm cập nhật lại chartOptions
  updateChartOptions() {
    this.chartOptions = {
      series: [
        {
          name: 'RevenueData',
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
          'Jan',
          'Feb',
          'Mar',
          'Apr',
          'May',
          'Jun',
          'Jul',
          'Aug',
          'Sep',
          'Oct',
          'Nov',
          'Dec',
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
          name: 'RevenueData',
          data: this.dataChart, // Cập nhật dữ liệu mới
        },
      ],
      title: Object.assign({}, this.chartOptions.title, {
        text: this.nameChart, // Cập nhật tiêu đề mới
      }),
    });
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
    if (this.selectedCourseId === -1) {
      this.nameChart = "Tất cả khóa học";
      return;
    }
    if (!this.courses || this.courses.length === 0) {
      console.error('Courses list is empty or not initialized.');
      this.nameChart = "Tổng doanh thu Unknown Course";
      return;
    }


    console.log(this.courses);
    const selectedCourse = this.courses.find(course => Number(course.id) === Number(this.selectedCourseId));

    if (!selectedCourse) {
      console.warn(`Course with ID ${this.selectedCourseId} not found.`);
      this.nameChart = "Tổng doanh thu Unknown Course";
      return;
    }
    const chuoibandau = 'Tổng doanh thu';
    this.nameChart = `${chuoibandau}: ${selectedCourse.title}`;

    console.log(this.nameChart);
    console.log(this.selectedCourseId);

    this.updateChartOptions1(); // Cập nhật lại chartOptions với tên mới
  }
  
}
