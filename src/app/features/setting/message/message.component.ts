import { Component } from '@angular/core';

@Component({
    selector: 'app-message',
    templateUrl: './message.component.html',
    styleUrl: './message.component.css',
    standalone: false
})
export class MessageComponent {
  listItem = [
    { name: 'course 1' },
    { name: 'course 1' },
    { name: 'course 1' },
    { name: 'course 1' },
    { name: 'course 1' },
    { name: 'course 1' },
    { name: 'course 1' },
    { name: 'course 1' },
    { name: 'course 1' },
    { name: 'course 1' },
    { name: 'course 1' },
    { name: 'course 1' },
    { name: 'course 1' },
    { name: 'course 1' },
    { name: 'course 1' },
    { name: 'course 1' },
  ];

  // ======================
  // chuyển đổi giữa list nhóm khóa học và giảng viên
  // ======================

  isCourseOrInstructor = true;

  toggleCourseAndInstructor(choose: boolean) {
    this.isCourseOrInstructor = choose;
  }

  // ====================
  // item sidebar right
  // ====================
  sidebarRight = [
    {
      name: 'Giảng viên',
    },
    {
      name: 'Thành viên',
    },
    {
      name: 'Quy tắc nhóm',
    },
    {
      name: 'Xóa dữ liệu chat (chỉ ở phía tôi)',
    },
  ];
}
