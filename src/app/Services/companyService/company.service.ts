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

  getCompanyType(){
    return this.http.get<any>(`${this.apiUrl}/SelectionValues?id_t4_selection=43E256AF-AC0F-4A89-AE2C-B0EAB8860C61`,{headers:this.headers});
  }
  getBranchType(){
    return this.http.get<any>(`${this.apiUrl}/SelectionValues?id_t4_selection=dbb3999e-36ba-4d63-827f-61e19cd698f9`,{headers:this.headers});
  }
}

  
