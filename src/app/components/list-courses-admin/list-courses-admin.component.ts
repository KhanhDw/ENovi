import {
  Component,
  ViewChild,
  ElementRef,
  EventEmitter,
  Output,
  Input,
  OnInit,
  OnChanges,
  SimpleChanges,
} from '@angular/core';

import { CourseAdmin } from './../../interface/course';
import { ApiService } from '@app/services/api.service';

@Component({
  selector: 'app-list-courses-admin',
  standalone: false,
  templateUrl: './list-courses-admin.component.html',
  styleUrl: './list-courses-admin.component.css',
})
export class ListCoursesAdminComponent implements OnInit, OnChanges {
  @Input() listORCard: boolean = false;

  @Output() itemClicked: EventEmitter<CourseAdmin> =
    new EventEmitter<CourseAdmin>();

  urlBackend_img_banner_course: string = '';

  sendDataToParent(item: CourseAdmin) {
    console.log('Clicked Item in Child:', item); // Log trong component con
    this.itemClicked.emit(item); // Gửi dữ liệu lên component cha
  }

  constructor(private apiService: ApiService) {
    this.urlBackend_img_banner_course =
      this.apiService.API_URL + '/uploads/img/bannerCourses/';
  }

  // ===========================
  // view with table list data
  // ===========================
  @Input() listCourseAdmin: CourseAdmin[] | null = null; // Nhận dữ liệu từ component cha

  ngOnInit(): void {}

  getStatusClass(status: number): string {
    return status === 1
      ? 'bg-green-200 text-green-900'
      : 'bg-red-200 text-red-900';
  }

  ngOnChanges(changes: SimpleChanges) {
    if (
      changes['listCourseAdmin'] &&
      changes['listCourseAdmin'].currentValue &&
      changes['listCourseAdmin'].currentValue.length > 0
    ) {
      console.log('Dữ liệu được cập nhật:', this.listCourseAdmin);
      // Xử lý dữ liệu ở đây
    }
  }
}
