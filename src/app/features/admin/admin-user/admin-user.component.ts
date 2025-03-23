import { AdminUserService } from './../../../services/admin/user/admin-user.service';
import {
  Component,
  ElementRef,
  ViewChild,
  HostListener,
  OnInit,
} from '@angular/core';

import { ApiService } from './../../../services/api.service';

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

import { UserAdmin } from '@app/interface/user';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-admin-user',
  templateUrl: './admin-user.component.html',
  styleUrl: './admin-user.component.css',
  standalone: false,
})
export class AdminUserComponent implements OnInit {
  selectedFilter: string = '';
  searchKey: string = '';

  countUsers: any[] = []; // Mảng lưu dữ liệu

  kindInforUser = [
    { name: 'Thông tin chung' },
    { name: 'Quản lý học viên' },
    { name: 'Quản lý giảng viên' },
  ];
  tableReciveData = this.kindInforUser[0];
  @ViewChild('chartContainer') chartContainer!: ElementRef;

  constructor(
    private apiService: ApiService,
    private adminUserService: AdminUserService
  ) {
    this.updateChartOptions(); // Cập nhật lại `chartOptions`
  }

  toggleFullScreen() {
    const elem = this.chartContainer.nativeElement;
    if (!document.fullscreenElement) {
      elem.requestFullscreen().catch((err: Error) => {
        console.error(`Error enabling fullscreen: ${err.message}`);
      });
    } else {
      document.exitFullscreen();
    }
  }

  //=========================
  // chang data with 3 button
  //=========================

  title = 'my-angular-app';

  user0: UserAdmin[] = [];
  user1: UserAdmin[] = [];
  user2: UserAdmin[] = [];

  users: UserAdmin[] = [];
  usersSubject = new BehaviorSubject<UserAdmin[]>([]);

  toggleDataTable(index: number) {
    switch (index) {
      case 1:
        this.users = this.user0;
        break;
      case 2:
        this.users = this.user1;
        break;
      case 3:
        this.users = this.user2;
        break;
      default:
        this.users = this.user0;
    }
  }

  // =============
  // chart
  // =============

  @ViewChild('chart') chart!: ChartComponent;
  public chartOptions1!: Partial<ChartOptions>;

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

  nameChart = 'Người dùng đăng ký theo tháng';
  dataChart = [10, 41, 35, 51, 405, 62, 69, 91, 148, 168, 248, 348];
  typeChartInput: ChartType = 'area';
  typeChartList = [
    { name: 'area', title: 'Biểu đồ vùng' },
    { name: 'bar', title: 'Biểu đồ cột' },
  ];

  updateChartOptions() {
    this.chartOptions1 = {
      series: [
        {
          name: 'RevenueData',
          data: this.dataChart,
        },
      ],
      chart: {
        height: 550,
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

  ngOnInit(): void {
    this.getAllUser();
    this.getCountUserRegiterInMonth(this.getCurrentYear());
  }

  getCurrentYear(): number {
    return new Date().getFullYear();
  }

  getAllUser() {
    this.adminUserService.getAllUser().subscribe({
      next: (res) => {
        if (res.success) {
          console.log('thanh cong');
          this.user0 = res.users;
          // Sử dụng .next() để cập nhật giá trị cho BehaviorSubject
          this.usersSubject.next(res.users);
          console.log(this.user0);
        }
      },
      error: (err) => {
        console.warn('load user all admin user');
      },
    });
  }

  btnSearch() {
    this.searchUser(this.searchKey);
  }

  searchUser(searchKey: string) {
    console.log('searchKey: ' + searchKey);
    this.adminUserService
      .getSearchUser(encodeURIComponent(searchKey))
      .subscribe({
        next: (res) => {
          if (res.success) {
            console.log('thanh cong 11');
            this.usersSubject.next(res.user);
          }
        },
        error: (err) => {
          console.warn('load user all admin user');
        },
      });
  }

  getCountUserRegiterInMonth(year: number) {
    console.log('searchKey: ' + year);
    this.adminUserService.getCountUserRegiterInMonth(year).subscribe({
      next: (res) => {
        if (res.success) {
          console.log('thanh con');
          this.dataChart = res.countuser.map(
            (item: { user_count: any }) => item.user_count
          );
          this.updateChartOptions(); // Cập nhật lại `chartOptions` sau khi thay đổi dữ liệu
        }
      },
      error: (err) => {
        console.warn('load user all admin user');
      },
    });
  }
}
