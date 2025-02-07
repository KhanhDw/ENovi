import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';

import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';

@Component({
    selector: 'app-edit-instructor-profile',
    templateUrl: './edit-instructor-profile.component.html',
    styleUrl: './edit-instructor-profile.component.css',
    standalone: false
})
export class EditInstructorProfileComponent {
  urls = [
    { title: 'Thông tin', url: '/user/instructor/basic-information' },
    { title: 'Ảnh đại diện', url: '/user/instructor/photo' },
  ];

  activeButtonIndex: number = 0;

  setActiveButton(index: number): void {
    this.activeButtonIndex = index;
  }
}
