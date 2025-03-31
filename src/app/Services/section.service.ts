import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environment/environment';
import { LocalstorageService } from './localStorageService/localstorage.service';

@Injectable({
  providedIn: 'root'
})
export class SectionService {

    private apiUrl = environment.apiUrl;
  
    constructor(private http: HttpClient,private localStorageService:LocalstorageService) { }
  
    accessToken = this.localStorageService.getItem('token'); 
    headers = new HttpHeaders({
      'Authorization': `Bearer ${this.accessToken}`
    });

    getSection(filter:any){
      return this.http.post<any>(`${this.apiUrl}/section/get-all`,filter, { headers: this.headers });
    }

    addSection(data:any){
      return this.http.post<any>(`${this.apiUrl}/section`,data, { headers: this.headers });
    }
      //GetById Branch
    getSectionById(body:any) {
      const url = `${this.apiUrl}/section/get-by-id`;
      return this.http.post<any>(url,body);

    }

    updateSection(data:any){
      return this.http.put<any>(`${this.apiUrl}/section`,data, { headers: this.headers });
    }
  //Delete Sub Section
  deleteSection(SectionId: any) {
    console.log(SectionId);

    const url = `${this.apiUrl}/section/${SectionId}`;
    return this.http.delete<any>(url);
  }
     
}
