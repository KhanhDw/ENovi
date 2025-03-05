import { Component, Input } from '@angular/core';
import {CourseSearch} from '@app/interface/course'

@Component({
    selector: 'app-course-item-search',
    templateUrl: './course-item-search.component.html',
    styleUrl: './course-item-search.component.css',
    standalone: false
})
export class CourseItemSearchComponent {
  @Input() listCourse: CourseSearch[] = [];

  

  

}
