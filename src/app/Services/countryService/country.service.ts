import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from '../../../environment/environment';
import { LocalstorageService } from '../localStorageService/localstorage.service';


@Injectable({
  providedIn: 'root'
})
export class CountryService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient,private localStorageService:LocalstorageService) { }

    accessToken = this.localStorageService.getItem('token'); 
    headers = new HttpHeaders({
      'Authorization': `Bearer ${this.accessToken}`
    });

    url=`${this.apiUrl}/country`;
          
    // Get all locations
    getCountry(filter:any){
      return this.http.post<any>(`${this.url}/get-all`,filter);  
    }

   //Insert Country
   insertCountry(data: any){
    return this.http.post<any>(this.url, data,{headers:this.headers}); 
  }

  //Update Country
  updateCountry(data:any){
    const response = this.http.put<any>(this.url, data,{headers:this.headers}); 
    return response;
  }

  //Delete Country
  deleteLocation(countryId:any){
    const url = `${this.url}/${countryId}`;
    return this.http.delete<any>(url);
  }
  //GetById Country
  getCountryById(countryId:number){
    const url = `${this.url}/${countryId}`;
    return this.http.get<any>(url);
   
  }
  uploadFile(file:any): Observable<any> {
    const url = `${this.url}/import`;
    return this.http.post(url, file);
  }

// -------------------------------DivisionOne-------------------------------------------------------------

  divOneUrl=`${this.apiUrl}/division-one`;

  getDivisionOneByCountryId(filter:any){
    return this.http.post<any>(`${this.divOneUrl}/get-all`,filter);
  }
  
  ///Insert Division One-----------------
  insertDivisionOne(data:any){
    return this.http.post<any>(this.divOneUrl, data,{headers:this.headers}); 
  }
// ---------Update Division One-----------------
updateDivisionOne(data:any){
  return this.http.put<any>(this.divOneUrl, data,{headers:this.headers}); 
}
// -----------Delete Division One-------------------
deleteDivisionOne(id:any){
  return this.http.delete<any>(`${this.divOneUrl}/${id}`);

}
getDivisionOneId(divisionOneId:any){
  const apiUrl=`${this.divOneUrl}/${divisionOneId}`
  return this.http.get<any>(apiUrl);
}
uploadFileDivisionOne(file:any): Observable<any> {
  const url = `${this.divOneUrl}/import`;
  return this.http.post(url, file);
}

// ----------------------DivisionTwo--------------------------------------------------------------------------------
  
   divTwourl=`${this.apiUrl}/division-two`;

   getDivisionTwoByDivisionOneId(filter:any){
      return this.http.post<any>(`${this.divTwourl}/get-all`,filter);
    }
    ///Insert Division Two-----------------
    insertDivisionTwo(data:any){
      return this.http.post<any>(this.divTwourl, data,{headers:this.headers}); 
    }
    // ---------Update Division Two-----------------
    updateDivisionTwo(data:any){
      return this.http.put<any>(this.divTwourl, data,{headers:this.headers}); 
    }
    // -----------Delete Division Two-------------------
    deleteDivisionTwo(id:any){
      return this.http.delete<any>(`${this.divTwourl}/${id}`); 
    }
    uploadFileDivisionTwo(file:any): Observable<any> {
      const url = `${this.divTwourl}/import`;
      return this.http.post(url, file);
    }
// ------------------------------------ DivisionThree -------------------------------------------
  divThreeurl=`${this.apiUrl}/division-three`;

  //Insert Division Two-----------------

    insertDivisionThree(data:any){
        return this.http.post<any>(this.divThreeurl, data,{headers:this.headers}); 
    }

  // ---------Update Division Three-----------------

  updateDivisionThree(data:any){
    return this.http.put<any>(this.divThreeurl, data,{headers:this.headers}); 
  }
    // -----------Delete Division Two-------------------

    deleteDivisionThree(id:any){
      return this.http.delete<any>(`${this.divThreeurl}/${id}`); 
    }
   //---------------------Get ---------------------------

   //Get Division3 By Division 2--------------------------
 
   getDivisionThree(filter:any){
    return this.http.post<any>(`${this.divThreeurl}/get-all`,filter);
  }

  
  // ---------------Import----------------------------------
  uploadFileDivisionThree(file:any): Observable<any> {
    const url = `${this.divThreeurl}/import`;
    console.log(url);
    console.log(file);
    
    
    return this.http.post(url, file);
  }
}
