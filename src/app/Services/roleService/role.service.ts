import { Injectable } from '@angular/core';
import { environment } from '../../../environment/environment';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class RoleService {
  private apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }

  insertRole(data:any){
    return this.http.post<any>(`${this.apiUrl}/Role/add-role-with-permission`, data); 
  }

  getRole(){
    return this.http.get<any>(`${this.apiUrl}/Role`);
  }

  getRoleandPermission(id:string){
    return this.http.get<any>(`${this.apiUrl}/Role/get-permission-by-role-id?id=${id}`);
  }

  updateRoleandPermission(data:any){
    return this.http.put<any>(`${this.apiUrl}/Role/update-role-with-permission`, data); 
  }

  getRoleType(){
    return this.http.get<any>(`${this.apiUrl}/SelectionValues/get-all-role-type`);
  }

  delete(id:string){
    return this.http.delete<any>(`${this.apiUrl}/Role/${id}`);
  }

}
