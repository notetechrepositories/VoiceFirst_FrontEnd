import { Injectable } from '@angular/core';
import { environment } from '../../../environment/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LocalstorageService } from '../localStorageService/localstorage.service';

@Injectable({
  providedIn: 'root'
})
export class BrachService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient, private localStorageService: LocalstorageService) { }

  accessToken = this.localStorageService.getItem('token');


  headers = new HttpHeaders({
    'Authorization': `Bearer ${this.accessToken}`
  });

  url = `${this.apiUrl}/branch`;


  // Get all Branch
  getBranch(filter: any) {
    return this.http.post<any>(`${this.url}/get-all`, filter);
  }
  getCompanyBranch() {
    return this.http.get<any>(`${this.url}/get-all`, { headers: this.headers });
  }
  //Insert Branch
  insertBranch(data: any) {


    return this.http.post<any>(this.url, data, { headers: this.headers });
  }

  //Update Branch
  updateBranch(data: any) {
    const response = this.http.put<any>(this.url, data, { headers: this.headers });
    return response;
  }

  //Delete Branch
  deleteBranch(branchId: any) {
    console.log(branchId);

    const url = `${this.url}/${branchId}`;
    return this.http.delete<any>(url);
  }
  //GetById Branch
  getBranchById(id_t2_company_branch: number) {
    const url = `${this.url}/${id_t2_company_branch}`;
    return this.http.get<any>(url);

  }
}
