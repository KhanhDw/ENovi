import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AdminCategoryService {
  private apiUrl!: string;

  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  setApiUrl(apiUrl: string) {
    this.apiUrl = apiUrl;
  }

  GetCategoryAPI(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/`);
  }
  GetCategoryAPIV1(id: number): Observable<any> {
    let params = new HttpParams();

    if (id) params = params.set('id', id);

    return this.http.get<any>(`${this.apiUrl}/v1`, { params });
  }
  GetCategoryAPIV2(id: number): Observable<any> {
    let params = new HttpParams();

    if (id) params = params.set('idv1', id);

    return this.http.get<any>(`${this.apiUrl}/v2`, { params });
  }

  createNewLinhVuc(name: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/v0/new`, { name });
  }

  createNewChuyenNganh(name:string, idLinhVuc:number): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/v1/new`, { name,idLinhVuc });
  }
  createNewPhanMuc(name:string, idChuyenNganh:number): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/v2/new`, { name, idChuyenNganh });
  }


  deleteLinhVuc(id:number): Observable<any> {
    let params = new HttpParams();
    if (id) params = params.set('id', id);

    return this.http.delete<any>(`${this.apiUrl}/v0/delete`, { params });
  }

  deleteChuyenNganh(id:number): Observable<any> {
    let params = new HttpParams();
    if(id) params = params.set('id', id)

    return this.http.delete<any>(`${this.apiUrl}/v1/delete`, {params });
  }
  deletePhanMuc(id:number): Observable<any> {
    let params = new HttpParams();
    if(id) params = params.set('id', id)

    return this.http.delete<any>(`${this.apiUrl}/v2/delete`, { params });
  }
}
