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
}
