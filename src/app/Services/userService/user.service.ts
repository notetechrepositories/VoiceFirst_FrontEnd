import { Injectable } from '@angular/core';
import { environment } from '../../../environment/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LocalstorageService } from '../localStorageService/localstorage.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {


  private apiUrl = environment.apiUrl;
  
    constructor(private http: HttpClient,private localStorageService:LocalstorageService) { }
  
    accessToken = this.localStorageService.getItem('token'); 
    headers = new HttpHeaders({
      'Authorization': `Bearer ${this.accessToken}`
    });

    getUserDetails(filters:any){
        return this.http.post<any>(`${this.apiUrl}/user/get-all`, filters, { headers: this.headers });
    }
    getEmployeeDetails(){
      return this.http.get<any>(`${this.apiUrl}/user/get-all-employee`, { headers: this.headers });
  }
    postUserDetails(userData:any){
        return this.http.post<any>(`${this.apiUrl}/user/user-register`, userData, {headers:this.headers});
    }

    getEmployeeById(filters:any){
      return this.http.post<any>(`${this.apiUrl}/user/get-by-id`, filters , {headers:this.headers});
    }
    
    getAdminProfile(){
      return this.http.get<any>(`${this.apiUrl}/user/get-profile`,{headers: this.headers});
    }
    putAdminProfile(userData:any){
      console.log("put request body",userData);
      
      return this.http.put<any>(`${this.apiUrl}/user`, userData, {headers:this.headers});
    }
}
