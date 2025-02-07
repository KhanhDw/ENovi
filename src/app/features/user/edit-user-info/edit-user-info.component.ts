import { Component } from '@angular/core';

@Component({
  selector: 'app-edit-user-info',
  templateUrl: './edit-user-info.component.html',
  styleUrl: './edit-user-info.component.css',
})
export class EditUserInfoComponent {
  urls = [
    { title: 'Thông tin', url: '/user/edit-information/basic-information' },
    { title: 'Ảnh đại diện', url: '/user/edit-information/photo' },
  ];

  activeButtonIndex: number = 0;

  setActiveButton(index: number): void {
    this.activeButtonIndex = index;
  }
}
