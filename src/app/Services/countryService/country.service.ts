import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CountryService {

  constructor(private http: HttpClient) { }

  url="https://localhost:7027/api/Country";
          
    // Get all locations
    getLocations(){
      return this.http.get<any>(this.url);  
    }

   //Insert Country
   insertCountry(data: any){
    return this.http.post<any>(this.url, data); 
  }

  //Update Country
  updateCountry(data:any){
    const response = this.http.put<any>(this.url, data); 
    console.log(response); // Log the response
    return response;
  }

  //Delete Country
  deleteLocation(countryId:number){
    const url = `${this.url}/${countryId}`;
    console.log(url);
    
    return this.http.delete<any>(url);
  }
  //GetById Country
  getCountryById(countryId:number){
    const url = `${this.url}/${countryId}`;
    console.log(url);
    
    return this.http.get<any>(url);
   
  }
// -------------------------------DivisionOne-------------------------------------------------------------

   divOneUrl="https://localhost:7027/api/DivisionOne";

  getDivisionOneByCountryId(countryId:string){
    const apiUrl=`https://localhost:7027/api/DivisionOne?id_t2_1_country=${countryId}`
    console.log(apiUrl);
    
    return this.http.get<any>(apiUrl);
    
  }
  
  ///Insert Division One-----------------
  insertDivisionOne(data:any){
    return this.http.post<any>(this.divOneUrl, data); 
  }
// ---------Update Division One-----------------
updateDivisionOne(data:any){
  return this.http.put<any>(this.divOneUrl, data); 
}
// -----------Delete Division One-------------------
deleteDivisionOne(data:any){
  return this.http.delete<any>(this.divOneUrl, data); 
}
}
