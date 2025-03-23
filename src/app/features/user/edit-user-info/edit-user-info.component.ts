import { Component, OnInit } from '@angular/core';
import { UserServiceService } from '@app/services/user/user-service.service';

@Component({
  selector: 'app-edit-user-info',
  templateUrl: './edit-user-info.component.html',
  styleUrl: './edit-user-info.component.css',
  standalone: false,
})
export class EditUserInfoComponent implements OnInit {
  urls = [
    { title: 'Thông tin', url: '/user/edit-information/basic-information' },
    { title: 'Ảnh đại diện', url: '/user/edit-information/photo' },
  ];

  activeButtonIndex: number = 0;

  constructor(private userServiceService: UserServiceService) {}

  ngOnInit(): void {
  }

  setActiveButton(index: number): void {
    this.activeButtonIndex = index;
  }

  getUserId(): { id: number; roleUser: string } {
    return this.userServiceService.getUserLogin();
  }
}
