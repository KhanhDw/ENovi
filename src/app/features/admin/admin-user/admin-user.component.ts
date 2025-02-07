import { Component, ElementRef, ViewChild } from '@angular/core';
import { NgModule } from '@angular/core';
@Component({
    selector: 'app-admin-user',
    templateUrl: './admin-user.component.html',
    styleUrl: './admin-user.component.css',
    standalone: false
})
export class AdminUserComponent {
  selectedFilter: string = '';

  @ViewChild('chartContainer') chartContainer!: ElementRef;

  toggleFullScreen() {
    const elem = this.chartContainer.nativeElement;
    if (!document.fullscreenElement) {
      elem.requestFullscreen().catch((err: Error) => {
        console.error(`Error enabling fullscreen: ${err.message}`);
      });
    } else {
      document.exitFullscreen();
    }
  }
}
