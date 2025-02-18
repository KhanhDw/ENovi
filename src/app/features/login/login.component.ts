import { Component } from '@angular/core';
import { ApiService } from '@app/services/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  standalone: false,
})
export class LoginComponent {
  constructor(private apiService: ApiService) {} //import và inject đúng service
  loginWithGoogle() {
    this.apiService.authGoogleServiceService.authGoogle();
  }
}
