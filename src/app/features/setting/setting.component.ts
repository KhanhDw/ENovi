import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
    selector: 'app-setting',
    templateUrl: './setting.component.html',
    styleUrl: './setting.component.css',
    standalone: false
})
export class SettingComponent {
  // ==========================
  // đánh dấu router điều hướng
  // ==========================
  routerDirection: number = 1;

  constructor(private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // Kiểm tra nếu route hiện tại là 'login' hoặc 'register'

        if (event.url === '/setting/courses-instructor') {
          this.routerDirection = 1;
        } else if (event.url === '/setting/courses-instructor/course-update') {
          this.routerDirection = 11;
        } else if (event.url === '/setting/revenue') {
          this.routerDirection = 2;
        } else if (event.url === '/setting/message') {
          this.routerDirection = 3;
        } else if (event.url === '') {
          this.routerDirection = 4;
        }
      }
    });
  }

  // ====================
  // item in sidebar
  // ====================
  sideBar = [
    {
      name: 'Khoá học',
      icon: 'M560-564v-68q33-14 67.5-21t72.5-7q26 0 51 4t49 10v64q-24-9-48.5-13.5T700-600q-38 0-73 9.5T560-564Zm0 220v-68q33-14 67.5-21t72.5-7q26 0 51 4t49 10v64q-24-9-48.5-13.5T700-380q-38 0-73 9t-67 27Zm0-110v-68q33-14 67.5-21t72.5-7q26 0 51 4t49 10v64q-24-9-48.5-13.5T700-490q-38 0-73 9.5T560-454ZM260-320q47 0 91.5 10.5T440-278v-394q-41-24-87-36t-93-12q-36 0-71.5 7T120-692v396q35-12 69.5-18t70.5-6Zm260 42q44-21 88.5-31.5T700-320q36 0 70.5 6t69.5 18v-396q-33-14-68.5-21t-71.5-7q-47 0-93 12t-87 36v394Zm-40 118q-48-38-104-59t-116-21q-42 0-82.5 11T100-198q-21 11-40.5-1T40-234v-482q0-11 5.5-21T62-752q46-24 96-36t102-12q58 0 113.5 15T480-740q51-30 106.5-45T700-800q52 0 102 12t96 36q11 5 16.5 15t5.5 21v482q0 23-19.5 35t-40.5 1q-37-20-77.5-31T700-240q-60 0-116 21t-104 59ZM280-494Z',
      url: '/setting/courses-instructor',
    },
    {
      name: 'Doanh thu',
      icon: 'M120-120v-80l80-80v160h-80Zm160 0v-240l80-80v320h-80Zm160 0v-320l80 81v239h-80Zm160 0v-239l80-80v319h-80Zm160 0v-400l80-80v480h-80ZM120-327v-113l280-280 160 160 280-280v113L560-447 400-607 120-327Z',
      url: '/setting/revenue',
    },
    {
      name: 'Tin nhắn',
      icon: 'M880-80 720-240H320q-33 0-56.5-23.5T240-320v-40h440q33 0 56.5-23.5T760-440v-280h40q33 0 56.5 23.5T880-640v560ZM160-473l47-47h393v-280H160v327ZM80-280v-520q0-33 23.5-56.5T160-880h440q33 0 56.5 23.5T680-800v280q0 33-23.5 56.5T600-440H240L80-280Zm80-240v-280 280Z',
      url: '/setting/message',
    },
    {
      name: 'Học sinh',
      icon: 'M40-160v-112q0-34 17.5-62.5T104-378q62-31 126-46.5T360-440q66 0 130 15.5T616-378q29 15 46.5 43.5T680-272v112H40Zm720 0v-120q0-44-24.5-84.5T666-434q51 6 96 20.5t84 35.5q36 20 55 44.5t19 53.5v120H760ZM360-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47Zm400-160q0 66-47 113t-113 47q-11 0-28-2.5t-28-5.5q27-32 41.5-71t14.5-81q0-42-14.5-81T544-792q14-5 28-6.5t28-1.5q66 0 113 47t47 113ZM120-240h480v-32q0-11-5.5-20T580-306q-54-27-109-40.5T360-360q-56 0-111 13.5T140-306q-9 5-14.5 14t-5.5 20v32Zm240-320q33 0 56.5-23.5T440-640q0-33-23.5-56.5T360-720q-33 0-56.5 23.5T280-640q0 33 23.5 56.5T360-560Zm0 320Zm0-400Z',
      url: '/notfound',
    },
    {
      name: 'Đánh giá',
      icon: 'm363-390 117-71 117 71-31-133 104-90-137-11-53-126-53 126-137 11 104 90-31 133ZM80-80v-720q0-33 23.5-56.5T160-880h640q33 0 56.5 23.5T880-800v480q0 33-23.5 56.5T800-240H240L80-80Zm126-240h594v-480H160v525l46-45Zm-46 0v-480 480Z',
      url: '/notfound',
    },
    {
      name: 'Bài tập',
      icon: 'M80 0v-160h800V0H80Zm160-320h56l312-311-29-29-28-28-311 312v56Zm-80 80v-170l448-447q11-11 25.5-17t30.5-6q16 0 31 6t27 18l55 56q12 11 17.5 26t5.5 31q0 15-5.5 29.5T777-687L330-240H160Zm560-504-56-56 56 56ZM608-631l-29-29-28-28 57 57Z',
      url: '/notfound',
    },
    {
      name: 'Phương thức nhận tiền',
      icon: 'M560-440q-50 0-85-35t-35-85q0-50 35-85t85-35q50 0 85 35t35 85q0 50-35 85t-85 35ZM280-320q-33 0-56.5-23.5T200-400v-320q0-33 23.5-56.5T280-800h560q33 0 56.5 23.5T920-720v320q0 33-23.5 56.5T840-320H280Zm80-80h400q0-33 23.5-56.5T840-480v-160q-33 0-56.5-23.5T760-720H360q0 33-23.5 56.5T280-640v160q33 0 56.5 23.5T360-400Zm440 240H120q-33 0-56.5-23.5T40-240v-440h80v440h680v80ZM280-400v-320 320Z',
      url: '/notfound',
    },
    { name: '' } /* dãy phân cách giữa instructor và student */,
    {
      name: 'Hồ sơ công khai',
      icon: 'M320-480v-80h320v80H320Zm0-160v-80h320v80H320Zm-80 240h300q29 0 54 12.5t42 35.5l84 110v-558H240v400Zm0 240h442L573-303q-6-8-14.5-12.5T540-320H240v160Zm480 80H240q-33 0-56.5-23.5T160-160v-640q0-33 23.5-56.5T240-880h480q33 0 56.5 23.5T800-800v640q0 33-23.5 56.5T720-80Zm-480-80v-640 640Zm0-160v-80 80Z',
      url: '/notfound',
    },
    {
      name: 'Điều chỉnh hồ sơ',
      icon: 'M480-240Zm-320 80v-112q0-34 17.5-62.5T224-378q62-31 126-46.5T480-440q37 0 73 4.5t72 14.5l-67 68q-20-3-39-5t-39-2q-56 0-111 13.5T260-306q-9 5-14.5 14t-5.5 20v32h240v80H160Zm400 40v-123l221-220q9-9 20-13t22-4q12 0 23 4.5t20 13.5l37 37q8 9 12.5 20t4.5 22q0 11-4 22.5T903-340L683-120H560Zm300-263-37-37 37 37ZM620-180h38l121-122-18-19-19-18-122 121v38Zm141-141-19-18 37 37-18-19ZM480-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47Zm0-80q33 0 56.5-23.5T560-640q0-33-23.5-56.5T480-720q-33 0-56.5 23.5T400-640q0 33 23.5 56.5T480-560Zm0-80Z',
      url: '/notfound',
    },
    {
      name: 'Bảo mật',
      icon: 'M480-80q-139-35-229.5-159.5T160-516v-244l320-120 320 120v244q0 152-90.5 276.5T480-80Zm0-84q97-30 162-118.5T718-480H480v-315l-240 90v207q0 7 2 18h238v316Z',
      url: '/notfound',
    },
    {
      name: 'Đóng tài khoản',
      icon: 'm760-183-85 84-56-56 84-85-84-85 56-56 85 84 85-84 56 56-84 85 84 85-56 56-85-84ZM240-80q-50 0-85-35t-35-85v-120h120v-560h600v415q-19-7-39-10.5t-41-3.5v-321H320v480h214q-7 19-10.5 39t-3.5 41H200v40q0 17 11.5 28.5T240-160h294q8 23 20 43t28 37H240Zm120-520v-80h360v80H360Zm0 120v-80h360v80H360Zm174 320H200h334Z',
      url: '/notfound',
    },
  ];

  // =============================
  // css đánh dấu router được chọn
  // =============================

  activeButtonIndex: number = 0;

  setActiveButton(index: number): void {
    this.activeButtonIndex = index;
  }

  // ========================
  // hiển thị và ẩn sidebar
  // ========================
  isShowSidebar = false;

  toggleShowSidebar() {
    this.isShowSidebar = !this.isShowSidebar;
  }
}
