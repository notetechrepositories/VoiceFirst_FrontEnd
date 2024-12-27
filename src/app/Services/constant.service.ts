import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConstantService {

    constructor(private http: HttpClient) { }
  
    url="https://localhost:7027/api/Selection";
            
      // Get all selection
      getSelection(){
        return this.http.get<any>(this.url);  
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

    apiurl="https://localhost:7027/api/SelectionValues"

          // Get all selection Values
          getSelectionValues(){
            return this.http.get<any>(this.apiurl);  
          }
      
         //Insert selection Values
         insertSelectionValues(data: any){
          return this.http.post<any>(this.apiurl, data);   
        }
      
        //Update selection Values
        updateSelectionValues(data:any){
          const response = this.http.put<any>(this.apiurl, data); 
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
          const url = `https://localhost:7027/api/SelectionValues?id_t4_selection=${selectionId}`;
          return this.http.get<any>(url);
        }
   
}
