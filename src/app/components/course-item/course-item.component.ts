import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-course-item',
  templateUrl: './course-item.component.html',
  styleUrl: './course-item.component.css',
})
export class CourseItemComponent {
  // Nhận dữ liệu từ component cha
  @Input() listCourse!: {
    img: string;
    title: string;
    description: string;
    author: string;
    duration: string;
    rate: string;
    price: string;
  }[];
}
