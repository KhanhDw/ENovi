import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class RegisterServiceService {

  private apiUrl!: string;

  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  setApiUrl(apiUrl: string) {
    this.apiUrl = apiUrl;
  }

  registerUserAPI(username:string ,email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/`, {username, email, password });
  }
}
