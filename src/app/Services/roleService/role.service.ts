import { Injectable } from '@angular/core';
import { environment } from '../../../environment/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LocalstorageService } from '../localStorageService/localstorage.service';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class RoleService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient,private localStorageService:LocalstorageService) { }

  accessToken = this.localStorageService.getItem('token'); 
  headers = new HttpHeaders({
    'Authorization': `Bearer ${this.accessToken}`
  });
  

  insertRole(data:any){
    return this.http.post<any>(`${this.apiUrl}/Role/add-role-with-permission`, data,{headers:this.headers}); 
  }

  getRole(body:any) {
   
    return this.http.post<any>(`${this.apiUrl}/Role/get-all`, body, { headers: this.headers });
  }
  
  getRoleandPermission(id:string){
    return this.http.get<any>(`${this.apiUrl}/Role/get-permission-by-role-id?id=${id}`);
  }

  updateRoleandPermission(data:any){
    return this.http.put<any>(`${this.apiUrl}/Role/update-role-with-permission`, data, {headers:this.headers}); 
  }

  getRoleType(){
    return this.http.get<any>(`${this.apiUrl}/SelectionValues/get-all-role-type`, {headers:this.headers});
  }

  delete(id:string){
    return this.http.delete<any>(`${this.apiUrl}/Role/${id}`);
  }

  getProgramWithPermission(){
    return this.http.get<any>(`${this.apiUrl}/Role/get-all-program-with-action`, {headers:this.headers});
  }

}
