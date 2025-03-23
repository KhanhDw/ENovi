import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';


@Injectable({
  providedIn: 'root',
})
export class ReloadSystemService {
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  reloadSystem(): void {
    if (isPlatformBrowser(this.platformId)) {
      if (!sessionStorage.getItem('hasReloaded')) {
        sessionStorage.setItem('hasReloaded', 'true');
        console.log(":hello");
        window.location.reload();
      }
    }
  }
}
