import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SharedDataService {
  private headerComponentInstance: any;
  private idCourse: string | null = null;

  // =============================
  // Header Logout using anywhere
  // =============================
  setHeaderComponent(instance: any) {
    this.headerComponentInstance = instance;
  }

  callHeaderMethodLogout() {
    if (this.headerComponentInstance) {
      this.headerComponentInstance.logout();
    } else {
      console.log('HeaderComponent chưa được khởi tạo');
    }
  }

  // =========================================================
  // save id course to update course of instructor course
  // =========================================================
  setIdCourse(id: string) {
    this.idCourse = id;
  }

  getIdCourse(): string | null {
    return this.idCourse;
  }
}
