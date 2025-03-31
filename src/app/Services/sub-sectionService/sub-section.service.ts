import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environment/environment';
import { LocalstorageService } from '../localStorageService/localstorage.service';

@Injectable({
  providedIn: 'root'
})
export class SubSectionService {
    private apiUrl = environment.apiUrl;
  
    constructor(private http: HttpClient,private localStorageService:LocalstorageService) { }
  
    accessToken = this.localStorageService.getItem('token'); 
    headers = new HttpHeaders({
      'Authorization': `Bearer ${this.accessToken}`
    });

    getSubSection(filter:any){
      return this.http.post<any>(`${this.apiUrl}/sub-section/get-all`,filter, { headers: this.headers });
    }

    addSubSection(data:any){
      return this.http.post<any>(`${this.apiUrl}/sub-section`,data, { headers: this.headers });
    }
      //GetById Branch
  getSubSectionById(body:any) {
    const url = `${this.apiUrl}/sub-section/get-by-id`;
    return this.http.post<any>(url,body);

  }

  updateSubsection(data:any){
    return this.http.put<any>(`${this.apiUrl}/sub-section`,data, { headers: this.headers });
  }
  
  //Delete Sub Section
  deleteSubSection(subSectionId: any) {
    console.log(subSectionId);

    const url = `${this.apiUrl}/sub-section/${subSectionId}`;
    return this.http.delete<any>(url);
  }
}
