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

interface Product {
  name: string;
  price: number;
  quantity: number;
  status: 'In Stock' | 'Out of Stock';
}

interface user {
  username: string;
  email: string;
  role: string;
  createdAt: Date;
}

@Component({
  selector: 'app-admin-user',
  templateUrl: './admin-user.component.html',
  styleUrl: './admin-user.component.css',
  standalone: false,
})
export class AdminUserComponent implements OnInit {
  selectedFilter: string = '';
  kindInforUser = [
    { name: 'Thông tin chung' },
    { name: 'Quản lý học viên' },
    { name: 'Quản lý giảng viên' },
  ];
  tableReciveData = this.kindInforUser[0];
  @ViewChild('chartContainer') chartContainer!: ElementRef;

  constructor(private dataService: ApiService) {
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

  products0: user[] = [];
  products1: user[] = [];
  products2: user[] = [];

  products: user[] = this.products0;

  toggleDataTable(index: number) {
    switch (index) {
      case 1:
        this.products = this.products0;
        break;
      case 2:
        this.products = this.products1;
        break;
      case 3:
        this.products = this.products2;
        break;
      default:
        this.products = this.products0;
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

  nameChart = 'người dùng';
  dataChart = [10, 41, 35, 51, 405, 62, 69, 91, 148, 168, 248, 348];
  typeChartInput: ChartType = 'bar';
  typeChartList = [
    { name: 'line', title: 'Biểu đồ đường' },
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

  // kết nối backend

  data: any;

  ngOnInit(): void {
    // this.dataService.getUsers().subscribe((response) => {
    //   this.data = response;
    //   console.log(this.data);
    //   this.products = response;
    // });
  }
}
