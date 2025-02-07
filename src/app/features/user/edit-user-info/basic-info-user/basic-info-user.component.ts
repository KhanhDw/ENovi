import { Component } from '@angular/core';
import { QuillModules } from 'ngx-quill';

@Component({
  selector: 'app-basic-info-user',
  templateUrl: './basic-info-user.component.html',
  styleUrl: './basic-info-user.component.css',
})
export class BasicInfoUserComponent {
  modules: QuillModules = {
    toolbar: [
      ['bold', 'italic', 'underline'], // Chỉ định các nút in đậm, in nghiêng và gạch chân
    ],
  };
}
