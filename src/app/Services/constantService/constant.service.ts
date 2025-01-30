import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environment/environment';
import { LocalstorageService } from '../localStorageService/localstorage.service';

@Injectable({
  providedIn: 'root'
})
export class ConstantService {
  
   private apiUrl = environment.apiUrl;
    constructor(private http: HttpClient,private localStorageService:LocalstorageService) { }
  
        accessToken = this.localStorageService.getItem('token'); 
        headers = new HttpHeaders({
          'Authorization': `Bearer ${this.accessToken}`
        });
        url=`${this.apiUrl}/Selection`;
            
      // Get all selection
      getSelection(){
        return this.http.get<any>(this.url,{headers:this.headers});  
      }
  
     //Insert selection
     insertSelection(data: any){
      return this.http.post<any>(this.url, data);   
    }
  
    //Update selection
    updateSelection(data:any){
      const response = this.http.put<any>(this.url, data); 
      return response;
    }
  
    //Delete selection
    deleteSelection(countryId:any){
      const url = `${this.url}/${countryId}`;
      return this.http.delete<any>(url);
    }
    //GetById selection
    getSelectionById(countryId:number){
      const url = `${this.url}/${countryId}`;
      return this.http.get<any>(url);
     
    }
    // ------------------------Selection Values-----------------------------------------
      apiurl=`${this.apiUrl}/SelectionValues`;

          // Get all selection Values
          getSelectionValues(){
            return this.http.get<any>(this.apiurl);  
          }
      
         //Insert selection Values
         insertSelectionValues(data: any){
          return this.http.post<any>(this.apiurl, data,{headers:this.headers});   
        }
      
        //Update selection Values
        updateSelectionValues(data:any){
          const response = this.http.put<any>(this.apiurl, data,{headers:this.headers}); 
          return response;
        }
      
        //Delete selection Values
        deleteSelectionValues(countryId:any){
          const url = `${this.apiurl}/${countryId}`;
          return this.http.delete<any>(url);
        }
        //GetById selection Values
        getSelectionValuesById(countryId:number){
          const url = `${this.apiurl}/${countryId}`;
          return this.http.get<any>(url);
         
        }

        getSelectionValuesBySelectionId(selectionId:number){
          const url = `${this.apiurl}?id_t4_selection=${selectionId}`;
          return this.http.get<any>(url);
        }
   
}
