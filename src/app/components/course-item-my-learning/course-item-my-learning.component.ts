import { CourseMyLearning } from './../../interface/course';
import { Component, Input, Output, EventEmitter } from '@angular/core';
@Component({
    selector: 'app-course-item-my-learning',
    templateUrl: './course-item-my-learning.component.html',
    styleUrl: './course-item-my-learning.component.css',
    standalone: false
})
export class CourseItemMyLearningComponent {
  @Input() itemCourse!: CourseMyLearning;
  @Input() urlBackend_img_banner_course!: string;
  @Output() deleteCourse = new EventEmitter<number>();
  hovering: boolean = false;

  onDeleteCourse() {
    this.deleteCourse.emit(this.itemCourse.id);
  }
}
