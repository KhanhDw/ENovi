import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-course-item-my-learning',
    templateUrl: './course-item-my-learning.component.html',
    styleUrl: './course-item-my-learning.component.css',
    standalone: false
})
export class CourseItemMyLearningComponent {
  @Input() itemCourse!: {
    id: string;
    img: string;
    title: string;
    description: string;
    author: string;
    duration: number;
    rate: string;
    price: string;
  };
}
