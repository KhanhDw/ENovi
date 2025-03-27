import { Router } from '@angular/router';
import { CourseMyLearning } from './../../interface/course';
import { Component, Input, Output, EventEmitter } from '@angular/core';
@Component({
  selector: 'app-course-item-my-learning',
  templateUrl: './course-item-my-learning.component.html',
  styleUrl: './course-item-my-learning.component.css',
  standalone: false,
})
export class CourseItemMyLearningComponent {
  @Input() itemCourse!: CourseMyLearning;
  @Input() urlBackend_img_banner_course!: string;
  @Output() deleteCourse = new EventEmitter<number>();
  hovering: boolean = false;

  constructor(private router: Router) {}

  onDeleteCourse() {
    this.deleteCourse.emit(this.itemCourse.id);
  }

  goToCourseDetail(id: number, title: string) {
    this.router.navigate(['/course', id, encodeURIComponent(title)]);
  }

  goToCourseLecture(
    id: number = 0,
    title: string = '',
    idSection: number = 0,
    nameLecture: string = ''
  ) {
    this.router.navigate([
      '/course-lecture',
      id,
      encodeURIComponent(title),
      'section',
      idSection,
      'lecture',
      encodeURIComponent(nameLecture),
    ]);
  }
}
