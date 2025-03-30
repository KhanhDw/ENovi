import { ApiService } from './../../../services/api.service';
import {
  Component,
  ElementRef,
  ViewChild,
  HostListener,
  AfterViewInit,
  ChangeDetectorRef,
  type OnInit,
} from '@angular/core';

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

interface WithdrawalTransaction {
  id: number;
  amount: number;
  currency: string;
  status: 'Completed' | 'Pending' | 'Failed';
  date: Date;
  method: string;
  senderName: string;
  phoneNumber: string;
  email: string;
}

interface RevenueData {
  date: string;
  revenue: number;
  courseSold: number;
  registeredStudents: number;
  websiteCommission: number;
  instructorPayment: number;
}

@Component({
  selector: 'app-admin-revenue',
  templateUrl: './admin-revenue.component.html',
  styleUrl: './admin-revenue.component.css',
  standalone: false,
})
export class AdminRevenueComponent implements OnInit {
  totalRevenue: number = 0;
  totalUser: number = 0;
  totalInstructor: number = 0;
  totalCourse: number = 0;
  isShowModalWithdraw = false;
  isShowModalWithdrawHistory = false;
  isShowModalQA = false;

  @ViewChild('ModalWithdraw') modalWithdrawElementRef!: ElementRef;
  @ViewChild('ModalWithdrawHistory')
  ModalWithdrawHistoryElementRef!: ElementRef;
  @ViewChild('ModalQA') modalQAElementRef!: ElementRef;

  ngOnInit(): void {
    this.DoanhThuToanHeThong(); // Gọi hàm khi component được khởi tạo
    this.updateChartOptions(); // Cập nhật lại `chartOptions` khi khởi tạo component
    this.fetchTotalUsers(); // Gọi hàm khi component được khởi tạo
    this.fetchTotalInstructors(); // Gọi hàm khi component được khởi tạo
    this.fetchMonthlyRevenue();
  }

  ngAfterViewInit(): void {}
  constructor(
    private elementRef: ElementRef,
    private apiService: ApiService,

    private cdRef: ChangeDetectorRef
  ) {
    this.updateChartOptions(); // Cập nhật lại `chartOptions`
  }

  toggleShowModalWithdraw() {
    this.isShowModalWithdraw = !this.isShowModalWithdraw;
  }
  toggleShowModalWithdrawHistory() {
    this.isShowModalWithdrawHistory = !this.isShowModalWithdrawHistory;
  }
  toggleShowModalQA() {
    this.isShowModalQA = !this.isShowModalQA;
  }

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

  transactions: WithdrawalTransaction[] = [
    {
      id: 1,
      amount: 500,
      currency: 'USD',
      status: 'Completed',
      date: new Date('2023-05-01'),
      method: 'Bank Transfer',
      senderName: 'Nguyễn Văn A',
      phoneNumber: '0901234567',
      email: 'nguyenvana@example.com',
    },
  ];

  getStatusClass(status: string): string {
    switch (status) {
      case 'Completed':
        return 'bg-green-100 text-green-800';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'Failed':
        return 'bg-red-100 text-red-800';
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

  nameChart = 'Tổng doanh thu của hệ thống qua các tháng';
  dataChart = [10, 41, 35, 51, 405, 62, 69, 91, 148, 168, 248, 348];
  typeChartInput: ChartType = 'area';
  typeChartList = [
    { name: 'area', title: 'Biểu đồ vùng' },
    { name: 'line', title: 'Biểu đồ đường' },
    { name: 'bar', title: 'Biểu đồ cột' },
  ];

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

  // Hàm cập nhật lại chartOptions
  updateChartOptions() {
    this.chartOptions = {
      series: [
        {
          name: 'RevenueDataAdmin',
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
          fontFamily: 'signika',
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
          name: 'Doanh thu',
          data: this.dataChart, // Cập nhật dữ liệu mới
        },
      ],
      title: Object.assign({}, this.chartOptions.title, {
        text: this.nameChart, // Cập nhật tiêu đề mới
      }),
    });
    this.cdRef.detectChanges();
  }

  // ================================
  // table data revenue detail
  // ================================
  revenueData: RevenueData[] = [
    {
      date: '01/01/2024',
      revenue: 1000000,
      courseSold: 2,
      registeredStudents: 2,
      websiteCommission: 100000,
      instructorPayment: 900000,
    },
    {
      date: '01/01/2024',
      revenue: 1000000,
      courseSold: 2,
      registeredStudents: 2,
      websiteCommission: 100000,
      instructorPayment: 900000,
    },
  ];

  formatCurrency(amount: number): string {
    return amount.toLocaleString('vi-VN', {
      style: 'currency',
      currency: 'VND',
    });
  }

  DoanhThuToanHeThong() {
    this.apiService.paymentHistoryService.getTotalRevenue().subscribe({
      next: (response) => {
        console.log('Tổng doanh thu:', response.data.totalRevenue);
        this.totalRevenue = response.data.totalRevenue;
        this.cdRef.detectChanges(); // Cập nhật lại view
      },
      error: (error) => {
        console.error('Lỗi khi lấy tổng doanh thu:', error);
      },
    });
  }

  fetchTotalUsers() {
    this.apiService.userServiceService.getTotalUsers().subscribe({
      next: (totalUsers) => {
        console.log('Tổng số người dùng:', totalUsers);
        this.totalUser = totalUsers;
        this.cdRef.detectChanges(); // Cập nhật lại view
      },
      error: (error) => {
        console.error('Lỗi khi lấy tổng số người dùng:', error);
      },
    });
  }

  fetchTotalInstructors() {
    this.apiService.userServiceService.getTotalInstructors().subscribe({
      next: (totalInstructors) => {
        console.log('Tổng số giảng viên:', totalInstructors);
        this.totalInstructor = totalInstructors;
        this.cdRef.detectChanges(); // Cập nhật lại view
        // You can add logic here to update the UI or store the value
      },
      error: (error) => {
        console.error('Lỗi khi lấy tổng số giảng viên:', error);
      },
    });
  }

  fetchMonthlyRevenue() {
    this.apiService.paymentHistoryService.getMonthlyRevenue().subscribe({
      next: (response) => {
        console.log('Doanh thu hàng tháng:', response.data);
        this.dataChart = response.data; // Cập nhật dữ liệu biểu đồ với doanh thu hàng tháng
        console.log(response.data);
        this.cdRef.detectChanges(); // Cập nhật lại view
        this.updateChartOptions1(); // Cập nhật lại `chartOptions` với dữ liệu mới
      },
      error: (error) => {
        console.error('Lỗi khi lấy doanh thu hàng tháng:', error);
      },
    });
  }
  // ========================
}
