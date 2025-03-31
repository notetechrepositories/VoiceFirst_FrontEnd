import { Injectable } from '@angular/core';
import { environment } from '../../../environment/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LocalstorageService } from '../localStorageService/localstorage.service';

@Injectable({
  providedIn: 'root'
})
export class IssueService {

    private apiUrl = environment.apiUrl;
  
    constructor(private http: HttpClient, private localStorageService: LocalstorageService) { }
  
    accessToken = this.localStorageService.getItem('token');
    headers = new HttpHeaders({
      'Authorization': `Bearer ${this.accessToken}`
    });

    submitIssue(formData: FormData) {
      return this.http.post(`${this.apiUrl}/issue`, formData,{headers:this.headers});
    }


    // ------Sys Issue Type--------------

    addSysIssueType(data:any){
      return this.http.post(`${this.apiUrl}/SysIssueType/add-sys-issue-type`, data,{headers:this.headers});
    }

    updateSysIssueType(data:any){
      return this.http.put(`${this.apiUrl}/SysIssueType/update-sys-issue-type`, data,{headers:this.headers});
    }

    getAllSysIssuetype(filter:any){
      return this.http.post(`${this.apiUrl}/SysIssueType/get-all-sys-issue-type`, filter,{headers:this.headers});
    }

    deleteSysIssueType(id:string){
      return this.http.delete(`${this.apiUrl}/SysIssueType/delete-sys-issue-type-values?id=${id}`,{headers:this.headers});
    }

    // ------Sys Issue Answer Type--------------

    addSysAnswerType(data:any){
      return this.http.post(`${this.apiUrl}/SysIssueType/add-sys-issue-answer-type`, data,{headers:this.headers});
    }

    updateSysAnswerType(data:any){
      return this.http.put(`${this.apiUrl}/SysIssueType/update-sys-issue-answer-type`, data,{headers:this.headers});
    }

    getAllSysAnswertype(filter:any){
      return this.http.post(`${this.apiUrl}/SysIssueType/get-all-sys-issue-answer-type`, filter,{headers:this.headers});
    }

    deleteSysAnswerType(id:string){
      return this.http.delete(`${this.apiUrl}/SysIssueType/delete-sys-issue-type-answer-values?id=${id}`,{headers:this.headers});
    }
}
