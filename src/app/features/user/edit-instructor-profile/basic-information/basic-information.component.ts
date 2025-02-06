import { Component } from '@angular/core';
import { QuillModules } from 'ngx-quill';

@Component({
  selector: 'app-basic-information',
  templateUrl: './basic-information.component.html',
  styleUrl: './basic-information.component.css',
})
export class BasicInformationComponent {
  modules: QuillModules = {
    toolbar: [
      ['bold', 'italic', 'underline'], // Chỉ định các nút in đậm, in nghiêng và gạch chân
    ],
  };
}
