import { Injectable } from '@angular/core';
import { environment } from '../../../environment/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LocalstorageService } from '../localStorageService/localstorage.service';

@Injectable({
  providedIn: 'root'
})
export class SystemtypeService {
private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient, private localStorageService: LocalstorageService) { }

  accessToken = this.localStorageService.getItem('token');
  headers = new HttpHeaders({
    'Authorization': `Bearer ${this.accessToken}`
  });

  getAllSystemType(filter:any){
    return this.http.post<any>(`${this.apiUrl}/selection_values/get-all-sys-selection-values`,filter, { headers: this.headers });
  }

  deleteSysType(id:string){
    return this.http.delete<any>(`${this.apiUrl}/selection_values/sys-selection-values-delete?id=${id}`, { headers: this.headers });
  }
}
