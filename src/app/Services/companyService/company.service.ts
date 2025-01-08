import { Injectable } from '@angular/core';
import { environment } from '../../../environment/environment';
import { LocalstorageService } from '../localStorageService/localstorage.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient,private localStorageService:LocalstorageService) { }

  accessToken = this.localStorageService.getItem('token'); 
  headers = new HttpHeaders({
    'Authorization': `Bearer ${this.accessToken}`
  });

  getSelectionType(filter:any){
    return this.http.post<any>(`${this.apiUrl}/selection_values/get-all`,filter,{headers:this.headers});
  }

  
}

  
