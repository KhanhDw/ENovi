import { Component } from '@angular/core';
import { ApiService } from '@app/services/api.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
  standalone: false,
})
export class RegisterComponent {
  // kết nối backend
  constructor(private apiService: ApiService) {}

  loginWithGoogle() {
    this.apiService.authGoogleServiceService.authGoogle(); // Thay thế bằng URL backend của bạn
  }
}
