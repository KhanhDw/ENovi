import { Component, HostListener } from '@angular/core';
import { QuillModules } from 'ngx-quill';

@Component({
  selector: 'app-course-update',
  templateUrl: './course-update.component.html',
  styleUrl: './course-update.component.css',
})
export class CourseUpdateComponent {
  contentOfSection = [
    {
      name: 'Phần 1: Ánh sáng cuối con đường',
    },
    {
      name: 'Phần 2: Ánh sáng cuối con đường',
    },
    {
      name: 'Phần 2: Ánh sáng cuối con đường',
    },
    {
      name: 'Phần 2: Ánh sáng cuối con đường',
    },
    {
      name: 'Phần 2: Ánh sáng cuối con đường',
    },
    {
      name: 'Phần 2: Ánh sáng cuối con đường',
    },
    {
      name: 'Phần 2: Ánh sáng cuối con đường',
    },
    {
      name: 'Phần 2: Ánh sáng cuối con đường',
    },
    {
      name: 'Phần 2: Ánh sáng cuối con đường',
    },
    {
      name: 'Phần 2: Ánh sáng cuối con đường',
    },
    {
      name: 'Phần 2: Ánh sáng cuối con đường',
    },
    {
      name: 'Phần 2: Ánh sáng cuối con đường',
    },
    {
      name: 'Phần 2: Ánh sáng cuối con đường',
    },
    {
      name: 'Phần 2: Ánh sáng cuối con đường',
    },
    {
      name: 'Phần 2: Ánh sáng cuối con đường',
    },
    {
      name: 'Phần 2: Ánh sáng cuối con đường',
    },
    {
      name: 'Phần 2: Ánh sáng cuối con đường',
    },
    {
      name: 'Phần 2: Ánh sáng cuối con đường',
    },
    {
      name: 'Phần 2: Ánh sáng cuối con đường',
    },
    {
      name: 'Phần 2: Ánh sáng cuối con đường',
    },
    {
      name: 'Phần 2: Ánh sáng cuối con đường',
    },
    {
      name: 'Phần 2: Ánh sáng cuối con đường',
    },
    {
      name: 'Phần 2: Ánh sáng cuối con đường',
    },
    {
      name: 'Phần 2: Ánh sáng cuối con đường',
    },
    {
      name: 'Phần 2: Ánh sáng cuối con đường',
    },
    {
      name: 'Phần 2: Ánh sáng cuối con đường',
    },
    {
      name: 'Phần 2: Ánh sáng cuối con đường',
    },
    {
      name: 'Phần 2: Ánh sáng cuối con đường',
    },
    {
      name: 'Phần 2: Ánh sáng cuối con đường',
    },
  ];

  modules: QuillModules = {
    toolbar: [
      ['bold', 'italic', 'underline'], // Chỉ định các nút in đậm, in nghiêng và gạch chân
      [{ size: ['small', false, 'large', 'huge'] }],
      [{ list: 'ordered' }, { list: 'bullet' }],
      [{ align: [] }],
      ['clean'],
    ],
  };
}
