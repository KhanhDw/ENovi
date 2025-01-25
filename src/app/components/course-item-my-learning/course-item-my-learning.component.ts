import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-course-item-my-learning',
  templateUrl: './course-item-my-learning.component.html',
  styleUrl: './course-item-my-learning.component.css',
})
export class CourseItemMyLearningComponent {
  @Input() itemCourse!: {
    id: string;
    img: string;
    title: string;
    description: string;
    author: string;
    duration: string;
    rate: string;
    price: string;
  };
}
