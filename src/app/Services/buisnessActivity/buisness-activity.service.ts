import { Injectable } from '@angular/core';
import { environment } from '../../../environment/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LocalstorageService } from '../localStorageService/localstorage.service';

@Injectable({
  providedIn: 'root'
})
export class BuisnessActivityService {

    private apiUrl = environment.apiUrl;
  
    constructor(private http: HttpClient, private localStorageService: LocalstorageService) { }
  
    accessToken = this.localStorageService.getItem('token');
    headers = new HttpHeaders({
      'Authorization': `Bearer ${this.accessToken}`
    });

    addSysBuisnessActivity(data: any) {
      return this.http.post<any>(`${this.apiUrl}/business-activity/add-sys-business-activity`, data, { headers: this.headers });
    }

    getSysBuisnessActivity(){
      return this.http.get<any>(`${this.apiUrl}/business-activity/get-all-sys-business-activity`, { headers: this.headers });
    }

    updateSysBuisnessActivity(data:any){
      return this.http.put<any>(`${this.apiUrl}/business-activity/update-sys-business-activity`, data,{ headers: this.headers });
    }

    deleteSysBuisnessActivity(id:string){
      return this.http.delete<any>(`${this.apiUrl}/business-activity/delete-sys-business-activity?id=${id}`,{ headers: this.headers });
    }

    saveCompanyActivity(data:any){
      return this.http.put<any>(`${this.apiUrl}/business-activity/update-company-business-activity`, data,{ headers: this.headers });
    }

    getCompanyActivity(){
      return this.http.get<any>(`${this.apiUrl}/business-activity/get-all-company`,{ headers: this.headers });
    }
}
