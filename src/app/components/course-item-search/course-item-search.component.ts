import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-course-item-search',
  templateUrl: './course-item-search.component.html',
  styleUrl: './course-item-search.component.css',
})
export class CourseItemSearchComponent {
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
