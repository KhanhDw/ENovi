import {
  Component,
  ElementRef,
  ViewChild,
  HostListener,
  AfterViewInit,
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
  // =========================
  // modal bank
  // =========================

  banks = [
    { brandName: '', fullName: 'Vui lòng chọn ngân hàng' },
    { brandName: 'VPBank', fullName: 'Ngân hàng TMCP Việt Nam Thịnh Vượng' },
    {
      brandName: 'BIDV',
      fullName: 'Ngân hàng TMCP Đầu tư và Phát triển Việt Nam',
    },
    {
      brandName: 'Vietcombank',
      fullName: 'Ngân hàng TMCP Ngoại Thương Việt Nam',
    },
    {
      brandName: 'VietinBank',
      fullName: 'Ngân hàng TMCP Công thương Việt Nam',
    },
    { brandName: 'MBBANK', fullName: 'Ngân hàng TMCP Quân Đội' },
    { brandName: 'ACB', fullName: 'Ngân hàng TMCP Á Châu' },
    { brandName: 'SHB', fullName: 'Ngân hàng TMCP Sài Gòn – Hà Nội' },
    { brandName: 'Techcombank', fullName: 'Ngân hàng TMCP Kỹ Thương' },
    { brandName: 'Agribank', fullName: 'Ngân hàng NN&PT Nông thôn Việt Nam' },
    {
      brandName: 'HDBank',
      fullName: 'Ngân hàng TMCP Phát triển Thành phố Hồ Chí Minh',
    },
    {
      brandName: 'LienVietPostBank',
      fullName: 'Ngân hàng TMCP Bưu điện Liên Việt',
    },
    { brandName: 'VIB', fullName: 'Ngân hàng TMCP Quốc Tế' },
    { brandName: 'SeABank', fullName: 'Ngân hàng TMCP Đông Nam Á' },
    { brandName: 'VBSP', fullName: 'Ngân hàng Chính sách xã hội Việt Nam' },
    { brandName: 'TPBank', fullName: 'Ngân hàng TMCP Tiên Phong' },
    { brandName: 'OCB', fullName: 'Ngân hàng TMCP Phương Đông' },
    { brandName: 'MSB', fullName: 'Ngân hàng TMCP Hàng Hải' },
    { brandName: 'Sacombank', fullName: 'Ngân hàng TMCP Sài Gòn Thương Tín' },
    { brandName: 'Eximbank', fullName: 'Ngân hàng TMCP Xuất Nhập Khẩu' },
    { brandName: 'SCB', fullName: 'Ngân hàng TMCP Sài Gòn' },
    { brandName: 'VDB', fullName: 'Ngân hàng Phát triển Việt Nam' },
    { brandName: 'Nam A Bank', fullName: 'Ngân hàng TMCP Nam Á' },
    { brandName: 'ABBANK', fullName: 'Ngân hàng TMCP An Bình' },
    { brandName: 'PVcomBank', fullName: 'Ngân hàng TMCP Đại Chúng Việt Nam' },
    { brandName: 'Bac A Bank', fullName: 'Ngân hàng TMCP Bắc Á' },
    { brandName: 'UOB', fullName: 'Ngân hàng TNHH MTV UOB Việt Nam' },
    { brandName: 'Woori', fullName: 'Ngân hàng TNHH MTV Woori Việt Nam' },
    { brandName: 'HSBC', fullName: 'Ngân hàng TNHH MTV HSBC Việt Nam' },
    {
      brandName: 'SCBVL',
      fullName: 'Ngân hàng TNHH MTV Standard Chartered Việt Nam',
    },
    { brandName: 'PBVN', fullName: 'Ngân hàng TNHH MTV Public Bank Việt Nam' },
    { brandName: 'SHBVN', fullName: 'Ngân hàng TNHH MTV Shinhan Việt Nam' },
    { brandName: 'NCB', fullName: 'Ngân hàng TMCP Quốc dân' },
    { brandName: 'VietABank', fullName: 'Ngân hàng TMCP Việt Á' },
    { brandName: 'Viet Capital Bank', fullName: 'Ngân hàng TMCP Bản Việt' },
    { brandName: 'DongA Bank', fullName: 'Ngân hàng TMCP Đông Á' },
    { brandName: 'Vietbank', fullName: 'Ngân hàng TMCP Việt Nam Thương Tín' },
    { brandName: 'ANZVL', fullName: 'Ngân hàng TNHH MTV ANZ Việt Nam' },
    { brandName: 'OceanBank', fullName: 'Ngân hàng TNHH MTV Đại Dương' },
    { brandName: 'CIMB', fullName: 'Ngân hàng TNHH MTV CIMB Việt Nam' },
    { brandName: 'Kienlongbank', fullName: 'Ngân hàng TMCP Kiên Long' },
    { brandName: 'IVB', fullName: 'Ngân hàng TNHH Indovina' },
    { brandName: 'BAOVIET Bank', fullName: 'Ngân hàng TMCP Bảo Việt' },
    { brandName: 'SAIGONBANK', fullName: 'Ngân hàng TMCP Sài Gòn Công Thương' },
    { brandName: 'Co-opBank', fullName: 'Ngân hàng Hợp tác xã Việt Nam' },
    { brandName: 'GPBank', fullName: 'Ngân hàng TNHH MTV Dầu khí toàn cầu' },
    { brandName: 'VRB', fullName: 'Ngân hàng Liên doanh Việt Nga' },
    { brandName: 'CB', fullName: 'Ngân hàng TNHH MTV Xây dựng' },
    { brandName: 'HLBVN', fullName: 'Ngân hàng TNHH MTV Hong Leong Việt Nam' },
    { brandName: 'PG Bank', fullName: 'Ngân hàng TMCP Xăng dầu Petrolimex' },
  ];

  isShowModalWithdraw = false;
  isShowModalWithdrawHistory = false;
  isShowModalQA = false;

  toggleShowModalWithdraw() {
    this.isShowModalWithdraw = !this.isShowModalWithdraw;
  }
  toggleShowModalWithdrawHistory() {
    this.isShowModalWithdrawHistory = !this.isShowModalWithdrawHistory;
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
    {
      id: 2,
      amount: 1000,
      currency: 'EUR',
      status: 'Pending',
      date: new Date('2023-05-03'),
      method: 'PayPal',
      senderName: 'Trần Thị B',
      phoneNumber: '0912345678',
      email: 'tranthib@example.com',
    },
    {
      id: 3,
      amount: 250,
      currency: 'GBP',
      status: 'Failed',
      date: new Date('2023-05-05'),
      method: 'Crypto',
      senderName: 'Lê Văn C',
      phoneNumber: '0923456789',
      email: 'levanc@example.com',
    },
    {
      id: 4,
      amount: 750,
      currency: 'USD',
      status: 'Completed',
      date: new Date('2023-05-07'),
      method: 'Bank Transfer',
      senderName: 'Phạm Thị D',
      phoneNumber: '0934567890',
      email: 'phamthid@example.com',
    },
    {
      id: 5,
      amount: 300,
      currency: 'EUR',
      status: 'Completed',
      date: new Date('2023-05-09'),
      method: 'PayPal',
      senderName: 'Hoàng Văn E',
      phoneNumber: '0945678901',
      email: 'hoangvane@example.com',
    },
    {
      id: 5,
      amount: 300,
      currency: 'EUR',
      status: 'Completed',
      date: new Date('2023-05-09'),
      method: 'PayPal',
      senderName: 'Hoàng Văn E',
      phoneNumber: '0945678901',
      email: 'hoangvane@example.com',
    },
    {
      id: 5,
      amount: 300,
      currency: 'EUR',
      status: 'Completed',
      date: new Date('2023-05-09'),
      method: 'PayPal',
      senderName: 'Hoàng Văn E',
      phoneNumber: '0945678901',
      email: 'hoangvane@example.com',
    },
    {
      id: 5,
      amount: 300,
      currency: 'EUR',
      status: 'Completed',
      date: new Date('2023-05-09'),
      method: 'PayPal',
      senderName: 'Hoàng Văn E',
      phoneNumber: '0945678901',
      email: 'hoangvane@example.com',
    },
    {
      id: 5,
      amount: 300,
      currency: 'EUR',
      status: 'Completed',
      date: new Date('2023-05-09'),
      method: 'PayPal',
      senderName: 'Hoàng Văn E',
      phoneNumber: '0945678901',
      email: 'hoangvane@example.com',
    },
    {
      id: 5,
      amount: 300,
      currency: 'EUR',
      status: 'Completed',
      date: new Date('2023-05-09'),
      method: 'PayPal',
      senderName: 'Hoàng Văn E',
      phoneNumber: '0945678901',
      email: 'hoangvane@example.com',
    },
    {
      id: 5,
      amount: 300,
      currency: 'EUR',
      status: 'Completed',
      date: new Date('2023-05-09'),
      method: 'PayPal',
      senderName: 'Hoàng Văn E',
      phoneNumber: '0945678901',
      email: 'hoangvane@example.com',
    },
    {
      id: 5,
      amount: 300,
      currency: 'EUR',
      status: 'Completed',
      date: new Date('2023-05-09'),
      method: 'PayPal',
      senderName: 'Hoàng Văn E',
      phoneNumber: '0945678901',
      email: 'hoangvane@example.com',
    },
    {
      id: 5,
      amount: 300,
      currency: 'EUR',
      status: 'Completed',
      date: new Date('2023-05-09'),
      method: 'PayPal',
      senderName: 'Hoàng Văn E',
      phoneNumber: '0945678901',
      email: 'hoangvane@example.com',
    },
    {
      id: 5,
      amount: 300,
      currency: 'EUR',
      status: 'Completed',
      date: new Date('2023-05-09'),
      method: 'PayPal',
      senderName: 'Hoàng Văn E',
      phoneNumber: '0945678901',
      email: 'hoangvane@example.com',
    },
    {
      id: 5,
      amount: 300,
      currency: 'EUR',
      status: 'Completed',
      date: new Date('2023-05-09'),
      method: 'PayPal',
      senderName: 'Hoàng Văn E',
      phoneNumber: '0945678901',
      email: 'hoangvane@example.com',
    },
    {
      id: 5,
      amount: 300,
      currency: 'EUR',
      status: 'Completed',
      date: new Date('2023-05-09'),
      method: 'PayPal',
      senderName: 'Hoàng Văn E',
      phoneNumber: '0945678901',
      email: 'hoangvane@example.com',
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
  typeChartInput: ChartType = 'line';
  typeChartList = [
    { name: 'line', title: 'Biểu đồ đường' },
    { name: 'area', title: 'Biểu đồ vùng' },
    { name: 'bar', title: 'Biểu đồ cột' },
  ];

  constructor(private elementRef: ElementRef) {
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
    // Add more sample data here
  ];

  ngOnInit(): void {}

  formatCurrency(amount: number): string {
    return amount.toLocaleString('vi-VN', {
      style: 'currency',
      currency: 'VND',
    });
  }

  // ================================
  // table data revenue by instructor
  // ================================
  // ================================
  // table data revenue by course
  // ================================
  // ================================
  // table data pay for instructor
  // ================================
  // ================================
  // table data transaction paid
  // ================================
}
